"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { subscribeToNewsletterSimple } from "@/app/actions/newsletter-simple";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, Mail } from "lucide-react";

export default function NewsletterForm() {
  const [state, action, isPending] = useActionState(
    subscribeToNewsletterSimple,
    null
  );
  const [email, setEmail] = useState("");

  // Clear form on successful submission
  useEffect(() => {
    if (state?.success) {
      setEmail("");
    }
  }, [state?.success]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <Mail className="mx-auto h-12 w-12 text-blue-600 mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Subscribe to our Newsletter
        </h3>
        <p className="text-gray-600">
          Get the latest updates and exclusive content delivered to your inbox.
        </p>
      </div>

      <form action={action} className="space-y-4">
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            disabled={isPending}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending || !email}>
          {isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Subscribing...
            </>
          ) : (
            "Subscribe Now"
          )}
        </Button>
      </form>

      {state && (
        <Alert
          className={`mt-4 ${state.success ? "border-green-500" : "border-red-500"}`}
        >
          {state.success ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-600" />
          )}
          <AlertDescription
            className={state.success ? "text-green-700" : "text-red-700"}
          >
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
