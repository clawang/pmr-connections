import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import Script from 'next/script'
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
      </Head>
        <body className={inter.className}>
          {children}
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7330339350575374"
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        </body>
    </html>
  )
}
