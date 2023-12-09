import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from '@/components/NavigationBar'

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
      <body className='overflow-y-auto' >
      <NavigationBar />
          {children}
        </body>
    </html>
  )
}
