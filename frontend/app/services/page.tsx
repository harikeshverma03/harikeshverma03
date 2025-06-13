"use client";
import React from "react";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-slate-100 to-slate-200 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard title="NAS Login" url="https://nas.harikeshverma03.com" />
          <ServiceCard title="Media Server" url="https://media.harikeshverma03.com" />
          <ServiceCard title="Radarr" url="https://radarr.harikeshverma03.com" />
          <ServiceCard title="Jackett" url="https://jackett.harikeshverma03.com" />
          <ServiceCard title="Torrent Client" url="https://torrent.harikeshverma03.com" />
        </div>
      </div>
    </main>
  );
}

function ServiceCard({ title, url }: { title: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <div className="bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform text-left">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 break-all">{url}</p>
      </div>
    </a>
  );
}
