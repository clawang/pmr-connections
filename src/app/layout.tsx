import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import PlausibleProvider from 'next-plausible'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Holiday Connections | Payne Mitchell Ramsey',
  description: 'A law and holiday themed connections to raise money for the Legal Aid of NorthWest Texas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>Holiday Connections</title>
        <link rel="shortcut icon" href="/gift.png" />
        <PlausibleProvider domain="pmr-connections.vercel.app" />
        <meta property="og:title" content="Holiday Connections | Payne Mitchell Ramsey" />
        <meta property="og:description" content="For every connection game successfully completed, Payne Mitchell Ramsey will donate to Legal Aid of NorthWest Texas." />
      </Head>
        <body className={inter.className}>
          {children}
        </body>
    </html>
  )
}
