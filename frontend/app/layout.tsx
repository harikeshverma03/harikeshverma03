// frontend/app/layout.tsx

import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Harikesh Verma',
  description: 'Personal Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white font-sans">
        <nav className="p-4 bg-gray-800 shadow-md text-white">
          <div className="text-xl font-bold mb-2 md:mb-0">Harikesh Verma</div>
          <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <Link href="/">Home</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/metrics">Metrics</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/services">Services</Link>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
