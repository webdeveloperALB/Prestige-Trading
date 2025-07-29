"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";
import { subscribeToNewsletter } from "../actions/newsletter";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await subscribeToNewsletter(formData);
      setResult(response);

      if (response.success) {
        // Close modal after 3 seconds on success
        setTimeout(() => {
          onClose();
          setResult(null);
          setEmail("");
        }, 3000);
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setResult(null);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Subscribe to Our Newsletter
          </DialogTitle>
          <DialogDescription>
            Join Prestige Trading Academy's newsletter for exclusive trading
            insights, market analysis, and educational content delivered to your
            inbox.
          </DialogDescription>
        </DialogHeader>

        {!result?.success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
                disabled={isSubmitting}
              />
            </div>

            {result && !result.success && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-700">{result.message}</p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              We respect your privacy. Unsubscribe at any time. Emails sent to
              news@prestigetradingacademy.uk
            </p>
          </form>
        ) : (
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Successfully Subscribed!
            </h3>
            <p className="text-muted-foreground mb-2">{result.message}</p>
            <p className="text-xs text-muted-foreground">
              Welcome to Prestige Trading Academy's newsletter community!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
