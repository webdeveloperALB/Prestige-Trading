"use client";

import { useState, useEffect } from "react";
import NewsletterModal from "./newsletter-modal";
import { X, Mail } from "lucide-react";

export default function NewsletterWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAutoPopup, setShowAutoPopup] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("newsletter-popup-shown");

    if (!hasSeenPopup) {
      // Show popup after 1 minute (60000ms)
      const timer = setTimeout(() => {
        setShowAutoPopup(true);
        setIsModalOpen(true);
        sessionStorage.setItem("newsletter-popup-shown", "true");
      }, 60000); // 1 minute

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowAutoPopup(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Fixed bottom-right newsletter button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isMinimized ? (
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-gray-900 text-sm">
                  Newsletter
                </h3>
              </div>
              <button
                onClick={handleMinimize}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Minimize newsletter widget"
                title="Minimize"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Stay updated with our latest news and insights
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Subscribe Now
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsMinimized(false)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105"
            title="Open newsletter subscription"
            aria-label="Open newsletter subscription widget"
          >
            <Mail className="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isAutoPopup={showAutoPopup}
      />
    </>
  );
}
