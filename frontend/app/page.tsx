"use client";
import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/profile.jpg"
          alt="Harikesh Verma"
          className="mx-auto rounded-full w-48 h-48 shadow-lg mb-6"
        />
        <h1 className="text-5xl font-extrabold mb-2 text-gray-800">
          Harikesh Verma
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Engineer, researcher, student, AI enthusiast
        </p>

        <p className="text-lg text-gray-700 mb-8">
          I am passionate about building scalable systems, AI research, distributed systems, and modern cloud-native infrastructure. Always exploring the intersection of software engineering and machine learning to solve real-world problems.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <ContactButton href="mailto:harikeshverma03@gmail.com" label="Email" />
          <ContactButton href="https://www.linkedin.com/in/harikesh-verma-308505156/" label="LinkedIn" />
        </div>
      </div>
    </main>
  );
}

function ContactButton({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">
        {label}
      </button>
    </a>
  );
}
