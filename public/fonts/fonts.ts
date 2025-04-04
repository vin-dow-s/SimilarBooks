import { Inter, Lobster_Two } from 'next/font/google'

export const lobster = Lobster_Two({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-lobster',
    display: 'swap',
})

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
})
