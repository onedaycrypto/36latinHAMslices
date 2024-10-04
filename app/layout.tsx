import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from '@/components/ModeToggle'
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { LoginHandler } from '@/components/LoginHandler'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'latinHAM',
  description: 'A challenging puzzle game based on Latin squares inspired by HAMMING codes.',
  keywords: ['puzzle game', 'Latin square', 'HAM problem', 'logic game'],
  openGraph: {
    title: 'latinHAM',
    description: 'Challenge yourself with this unique puzzle game!',
    type: 'website',
    url: 'https://latinham.willtajer.com',
    images: [
      {
        url: 'http://willtajer.com/wp-content/uploads/2024/10/latinHAM.png',
        width: 1200,
        height: 630,
        alt: '36latinHAM Game Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '36latinHAM',
    description: 'A challenging puzzle game based on Latin squares and the HAM problem',
    images: ['http://willtajer.com/wp-content/uploads/2024/10/latinHAMtwitter-e1727909000790.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`bg-background text-foreground ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header className="sticky top-0 right-0 z-50 w-full">
              <div className="flex justify-end items-center p-4">
                <Analytics />
                <SpeedInsights />
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <SignInButton>
                      <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10"
                        }
                      }}
                    />
                  </SignedIn>
                  <ModeToggle />
                </div>
              </div>
            </header>
            <main>
              <LoginHandler />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}