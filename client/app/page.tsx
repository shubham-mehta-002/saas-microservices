'use client';

import { Header } from "@/src/components";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { features } from "./(auth)/constants";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
              The freelancing platform built for your campus
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
              Connect with talented students at your university. Hire for projects or earn money with your skills—all
              within a trusted college community.
            </p>

            <div className="flex flex-row sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <Link href="/signup">
                  Start Freelancing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button size="lg" variant="outline" className="hover:bg-muted/10" asChild>
                <Link href="/browse">Browse Gigs</Link>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for graphic design, web development..."
                  className="pl-12 h-10 text-base"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Why UniLance?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
              A safer, smarter way to freelance within your college community
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="space-y-2">
                  {feature.icon}
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">How It Works</h2>
            <p className="text-muted-foreground text-lg text-balance">Get started in minutes</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* For Clients */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">For Clients</CardTitle>
                <CardDescription>Hire talented students for your projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: 1, title: "Browse or Post", desc: "Search existing gigs or post your own project requirements" },
                  { step: 2, title: "Review & Hire", desc: "Check portfolios, reviews, and send proposals to freelancers" },
                  { step: 3, title: "Collaborate & Pay", desc: "Work together via messaging, then release payment when satisfied" },
                ].map((item) => (
                  <div className="flex gap-4" key={item.step}>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* For Freelancers */}
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">For Freelancers</CardTitle>
                <CardDescription>Earn money with your skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { step: 1, title: "Create Your Gig", desc: "Set up your services with pricing, portfolio, and descriptions" },
                  { step: 2, title: "Get Discovered", desc: "Receive inquiries from students looking for your expertise" },
                  { step: 3, title: "Deliver & Earn", desc: "Complete projects and get paid securely through the platform" },
                ].map((item) => (
                  <div className="flex gap-4" key={item.step}>
                    <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Ready to join your campus freelancing community?
          </h2>
          <p className="text-lg mb-8 opacity-90 text-balance">
            Sign up with your email and start connecting with talented students today
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/regsiter">Create Free Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/browse">Explore Gigs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
