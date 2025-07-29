"use client"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface NewsletterButtonProps {
  onOpenModal: () => void
}

export function NewsletterButton({ onOpenModal }: NewsletterButtonProps) {
  return (
    <Button
      onClick={onOpenModal}
      className="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-all duration-300 bg-white text-black hover:bg-primary/90 hover:text-primary-foreground px-4 py-3 rounded-full"
      size="lg"
    >
      <Mail className="w-4 h-4 mr-2" />
      Subscribe to our newsletter
    </Button>
  )
}
