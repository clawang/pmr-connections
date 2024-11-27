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
        <link rel="shortcut icon" href="/favicon.ico" />
        <PlausibleProvider domain="pmr-connections.vercel.app/" />
      </Head>
        <body className={inter.className}>
          {children}
        </body>
    </html>
  )
}
