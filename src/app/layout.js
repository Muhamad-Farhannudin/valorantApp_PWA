import { Navbar } from '@/components/Navbar'
import './globals.css'

export const metadata = {
  title: 'Valorant App',
  description: 'Generated by create next app',
  manifest:'/manifest.webmanifest'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='app'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
