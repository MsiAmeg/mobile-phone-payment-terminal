import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import StyledComponentsRegistry from '@/lib/registry';
import Footer from '@/components/Footer';

import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='main'>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </main>
        <Footer />
      </body>
    </html>
  )
}
