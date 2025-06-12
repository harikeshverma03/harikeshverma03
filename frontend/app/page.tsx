// frontend/app/page.tsx

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <Image
        src="/profile.jpg"
        alt="Harikesh Verma"
        width={200}
        height={200}
        className="rounded-full shadow-lg"
      />
      <h1 className="text-4xl font-bold">Harikesh Verma</h1>
      <p className="text-lg text-gray-300">Engineer | Researcher | Raspberry Pi Enthusiast</p>

      <div className="flex space-x-6">
        <Link href="https://www.linkedin.com/in/harikeshverma03" target="_blank">
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">LinkedIn</button>
        </Link>
        <Link href="mailto:harikeshverma03@gmail.com">
          <button className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">Email</button>
        </Link>
        <Link href="https://nas.harikeshverma03.com" target="_blank">
          <button className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 transition">NAS Login</button>
        </Link>
      </div>
    </div>
  )
}
