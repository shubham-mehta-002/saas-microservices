'use client';

import { Button } from "@/components/ui/button";
import { useUserQuery } from "@/src/hooks/queries";
import Link from "next/link";

export const Header = () => {
  const { data: user, isLoading } = useUserQuery();

  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold hover:text-primary transition-colors">
              UniLance
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/browse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Browse Gigs
              </Link>
              <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Actions / Auth Buttons */}
          <div className="flex items-center gap-3">
            {!user?._id ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link href="/freelancer/signup">Become a Freelancer</Link>
                </Button>
                <Button asChild variant="destructive">
                  <Link href="/logout">Logout</Link>
                </Button>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};
