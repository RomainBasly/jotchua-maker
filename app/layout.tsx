import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import MouseMoveComponent from '@/src/components/materials/MouseMoveComponent'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'Jotchua on sol'
const APP_DEFAULT_TITLE = 'Jotchua'
const APP_TITLE_TEMPLATE = 'Jotch'
const APP_DESCRIPTION = 'Website of fans of Jotchua'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logos/jotch-48x48.png" />
      </head>
      <body className={inter.className}>
        {children}
        {/* <MouseMoveComponent /> */}
      </body>
    </html>
  )
}
