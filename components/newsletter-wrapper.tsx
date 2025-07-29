"use client"

import { useState, useEffect } from "react"
import { NewsletterButton } from "./newsletter-button"
import { NewsletterModal } from "./newsletter-modal"

export function NewsletterWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasShownAutoPopup, setHasShownAutoPopup] = useState(false)

  useEffect(() => {
    // Check if auto popup has been shown in this session
    const autoPopupShown = sessionStorage.getItem("newsletter-auto-popup-shown")

    if (!autoPopupShown) {
      // Show popup after 1 minute (60000ms)
      const timer = setTimeout(() => {
        setIsModalOpen(true)
        setHasShownAutoPopup(true)
        sessionStorage.setItem("newsletter-auto-popup-shown", "true")
      }, 60000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <NewsletterButton onOpenModal={handleOpenModal} />
      <NewsletterModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}
