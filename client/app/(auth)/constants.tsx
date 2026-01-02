import { feature } from "./types";
import { Shield, DollarSign, MessageSquare, Users, Briefcase } from "lucide-react";

export const features: feature[] = [
  {
    icon: <Shield className="h-10 w-10 mb-4 text-primary" />,
    title: "Verified Students Only",
    description:
      "All users verify with their .edu email—ensuring you work with real students from your campus.",
  },
  {
    icon: <DollarSign className="h-10 w-10 mb-4 text-primary" />,
    title: "Secure Payments",
    description:
      "Escrow-based payment system protects both clients and freelancers until work is complete.",
  },
  {
    icon: <MessageSquare className="h-10 w-10 mb-4 text-primary" />,
    title: "Built-in Messaging",
    description:
      "Communicate, share files, and manage projects all in one place without leaving the platform.",
  },
  {
    icon: <Users className="h-10 w-10 mb-4 text-primary" />,
    title: "Campus Community",
    description:
      "Build your reputation within your college network and get discovered by peers.",
  },
  {
    icon: <Briefcase className="h-10 w-10 mb-4 text-primary" />,
    title: "Dual Roles",
    description:
      "Seamlessly switch between hiring and freelancing—be both a client and service provider.",
  },
  {
    icon: <Shield className="h-10 w-10 mb-4 text-primary" />,
    title: "Dispute Resolution",
    description:
      "Fair dispute system with admin moderation ensures conflicts are resolved professionally.",
  },
];
