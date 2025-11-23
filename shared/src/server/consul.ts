import Consul from "consul";
import { config } from "./config.js";

interface RegisterServiceOptions {
  name: string;
  id?: string;
  host: string;
  port: number;
}

// Create Consul client 
const consulClient = new Consul({
  host: config.CONSUL_HOST,
  port: config.CONSUL_PORT, 
  promisify: true,
}as any);

//Register service
const registerWithConsul = async ({
  port,
  host,
  name,
  id = `${name}-${host}:${port}`,
}: RegisterServiceOptions) => {
  try {
    await consulClient.agent.service.register({
      id,
      name,
      address: host,
      port,
      check: {
        name: `${name} Health Check`,
        http: `http://${host}:${port}/health`,
        interval: "10s",
        timeout: "5s",
      },
    });
    console.log(`${name} registered with Consul at ${host}:${port}`);
  } catch (err) {
    console.error(`Error registering ${name} with Consul:`, err);
  }
};

// Deregister service
const cleanup = async ({
  name,
  host,
  port,
}: {
  name: string;
  host: string;
  port: number;
}) => {
  const id = `${name}-${host}:${port}`; // ensure matches registration ID
  try {
    await consulClient.agent.service.deregister(id);
    console.log(` ${name} deregistered from Consul`);
    process.exit(0);
  } catch (err) {
    console.error(`Error deregistering ${name}:`, err);
    process.exit(1);
  }
};

//  Get address For service discovery
const getServiceAddress = async (
  serviceName: string
): Promise<{ host: string; port: number }> => {
  try {
    const services = await consulClient.catalog.service.nodes(serviceName);

    if (!services || services.length === 0) {
      throw new Error(`No healthy instances found for service: ${serviceName}`);
    }

    const { Address, ServicePort } = services[0];
    console.log(`Found ${serviceName} at ${Address}:${ServicePort}`);

    return { host: Address, port: ServicePort };
  } catch (err) {
    console.error("Error fetching service from Consul:", err);
    throw err;
  }
};

export { cleanup, registerWithConsul, getServiceAddress };
