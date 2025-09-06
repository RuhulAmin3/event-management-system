/**
 * External Imports
*/
import Link from "next/link";
import { Ghost } from "lucide-react";
/**
 * Internal Imports
*/
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-background text-center p-6">
      {/* Icon */}
      <div className="rounded-full bg-primary/20 p-6 shadow-lg mb-6">
        <Ghost className="h-16 w-16 text-primary" />
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        404 - Page Not Found
      </h1>

      {/* Subtext */}
      <p className="mt-4 max-w-lg text-muted-foreground text-lg">
        Oops! The page you’re looking for doesn’t exist or has been moved.  
        Don’t worry—you can always head back to the homepage.
      </p>

      {/* Action button */}
      <div className="mt-8">
        <Link href="/">
          <Button size="lg" className="rounded-full shadow-md">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
