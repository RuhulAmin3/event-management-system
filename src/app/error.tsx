"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "~/components/ui/button";


export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error captured:", error);
  }, [error]);

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-neutral-900 px-4">
        <div className="max-w-md w-full rounded-2xl bg-white dark:bg-neutral-800 shadow-lg p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/40">
              <AlertCircle className="h-10 w-10 text-red-600 dark:text-red-400" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Oops! Something went wrong.
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            An unexpected error occurred. Please try again or return to the
            homepage.
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              variant="default"
              onClick={() => reset()}
              className="flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <pre className="mt-4 p-3 text-left text-xs bg-gray-100 dark:bg-neutral-900 rounded-lg overflow-x-auto text-red-500">
              {error.message}
            </pre>
          )}
        </div>
      </body>
    </html>
  );
}
