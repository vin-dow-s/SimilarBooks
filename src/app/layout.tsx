import { cn } from '@/lib/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { inter, lobster } from '../../public/fonts/fonts'
import './globals.css'

export const metadata: Metadata = {
    title: 'Similar Books – Smart AI Book Recommendations',
    description:
        'Instant book recommendations powered by AI. No sign-up. No bullshit. No ads. Just enter a title and get 3 recommendations in seconds.',
    keywords: [
        'book recommendations',
        'AI books',
        'book recs',
        'find similar books',
        'next read',
        'similar novels',
    ],
    openGraph: {
        title: 'Similar Books – Smart AI Book Recommendations',
        description:
            'Find your next read in seconds. Enter any book title and get 3 similar recommendations powered by AI.',
        url: 'https://similar-books.vercel.app/',
        siteName: 'Similar Books',
        images: [
            {
                url: 'https://similar-books.vercel.app/assets/og-image.webp',
                width: 1200,
                height: 630,
                alt: 'Similar Books',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Similar Books',
        description:
            'Discover 3 similar books to any title – instantly. Powered by AI.',
        creator: '@rayzark',
        images: ['https://similar-books.vercel.app/assets/og-image.webp'],
    },
    metadataBase: new URL('https://similar-books.vercel.app/'),
    icons: {
        icon: '/icons/favicon.ico',
    },
}

export const viewport: Viewport = {
    themeColor: '#1c1b22',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html
            lang="en"
            className={cn(inter.variable, lobster.variable, 'h-dvh')}
        >
            <body className="antialiased">
                {children}
                <Analytics />
            </body>
        </html>
    )
}
