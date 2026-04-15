import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Chiranjeevi Charitable Trust | Blood Donation & Community Service',
  description: 'Join CCT in saving lives through blood donation, financial giving, and community events across Andhra Pradesh and Telangana.',
  keywords: ['blood donation', 'charity', 'Andhra Pradesh', 'Telangana', 'community service', 'CCT'],
  authors: [{ name: 'Chiranjeevi Charitable Trust' }],
  openGraph: {
    title: 'Chiranjeevi Charitable Trust',
    description: 'Saving lives through blood donation and community service',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#CC0033',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
