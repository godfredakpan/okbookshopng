import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ok Book Shop Nigeria',
  description: 'Buy and Swap Used/New Books here, Buy a wide range of books in Nigeria with us',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="Hi2PIJOqffPn99X-EyfcTCzbSf7ldaPLY17Dl7RGdMI" />
      <meta name="description" content="Buy, swap used or new Books with okbookshopng"/>
    
      <meta name="keywords" content="Buy cheap books, buy used books, buy used books in lagos, swap books in lagos, where to buy books in lagos, okbookshopng, where to buy books in lagos, bookstore in lagos, bookstore, online book store, okbookshop.ng, buy books online in nigeria, book sellers in nigeria, Buy a wide range of books in Nigeria, Buy Books online."/>
    
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
