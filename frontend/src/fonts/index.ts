import { Anton, Inter } from 'next/font/google'

export const anton = Anton({
    weight: "400",
    subsets: ["latin"],
    variable:'--font-anton'
})

export const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: '--font-inter'
})