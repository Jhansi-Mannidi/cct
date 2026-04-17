import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display, Noto_Sans_Telugu, Noto_Serif_Telugu, Bricolage_Grotesque, Instrument_Serif } from 'next/font/google'
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

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const notoSansTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  variable: '--font-noto-sans-telugu',
  display: 'swap',
})

const notoSerifTelugu = Noto_Serif_Telugu({
  subsets: ['telugu'],
  variable: '--font-noto-serif-telugu',
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
  themeColor: '#C81924',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={`${dmSans.variable} ${playfair.variable} ${notoSansTelugu.variable} ${notoSerifTelugu.variable} ${bricolage.variable} ${instrumentSerif.variable} bg-background`}>
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen bg-background">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
