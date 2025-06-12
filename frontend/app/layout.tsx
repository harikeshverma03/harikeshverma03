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
        <nav className="flex justify-between items-center p-4 bg-gray-800 shadow-md">
          <div className="text-xl font-bold">Harikesh Verma</div>
          <div className="space-x-4">
            <Link href="/">Home</Link>
            <Link href="/publications">Publications</Link>
            <Link href="/metrics">Metrics</Link>
            <Link href="/projects">Projects</Link>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
