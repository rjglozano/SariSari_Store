import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sari-Sari Store',
  description: 'Sari-Sari Sa Puso, Sa Bawat Kanto',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='h-screen w-full' >
      <NavigationBar />
          {children}
        <Footer />
        </body>
    </html>
  )
}
