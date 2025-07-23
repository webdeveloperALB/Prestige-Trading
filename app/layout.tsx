import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Prestige Academy',
  description: 'Prestige Academy',
  generator: 'Prestige Academy',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
