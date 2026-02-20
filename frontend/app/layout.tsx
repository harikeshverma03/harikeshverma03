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
            <Link href="/services">Services</Link>
            <a href="https://github.com/harikeshverma03/" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/harikeshverma03/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  )
}
