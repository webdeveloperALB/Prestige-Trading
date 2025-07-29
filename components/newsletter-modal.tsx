"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/actions/newsletter";
import { X, Mail, Clock } from "lucide-react";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAutoPopup?: boolean;
}

export default function NewsletterModal({
  isOpen,
  onClose,
  isAutoPopup = false,
}: NewsletterModalProps) {
  const [state, action, isPending] = useActionState(
    subscribeToNewsletter,
    null
  );
  const [email, setEmail] = useState("");

  // Clear form on successful submission
  useEffect(() => {
    if (state?.success) {
      setEmail("");
      // Close modal after success
      setTimeout(() => onClose(), 2000);
    }
  }, [state?.success, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 relative animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Stay Updated!</h2>
              {isAutoPopup && (
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>You've been browsing for a while</span>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            aria-label="Close newsletter modal"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">
            {isAutoPopup
              ? "Don't miss out on our latest updates! Subscribe to our newsletter and get exclusive content delivered to your inbox."
              : "Get the latest updates and exclusive content delivered to your inbox."}
          </p>

          <form action={action} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isPending}
              />
            </div>

            <button
              type="submit"
              disabled={isPending || !email}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                "Subscribe to Newsletter"
              )}
            </button>
          </form>

          {state && (
            <div
              className={`mt-4 p-4 rounded-lg border ${
                state.success
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              <div className="flex items-center">
                {state.success ? (
                  <div className="flex-shrink-0 w-5 h-5 text-green-400 mr-2">
                    ✓
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-5 h-5 text-red-400 mr-2">
                    ⚠
                  </div>
                )}
                <span className="text-sm font-medium">{state.message}</span>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>

        {/* Special message for auto-popup */}
        {isAutoPopup && (
          <div className="bg-blue-50 px-6 py-3 rounded-b-lg border-t border-blue-100">
            <p className="text-xs text-blue-600 text-center">
              💡 This popup appeared because you've been exploring our site. We
              thought you might be interested!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
