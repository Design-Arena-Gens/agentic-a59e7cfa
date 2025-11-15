import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trend Video Agent',
  description: 'Automated video generation for trending topics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
