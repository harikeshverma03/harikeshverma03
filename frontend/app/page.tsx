export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-400 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">Harikesh Verma</h1>
      <p className="text-xl mb-8">Welcome to my personal website</p>
      <div className="flex gap-4">
        <a href="/metrics" className="bg-white text-black px-4 py-2 rounded">Metrics</a>
        <a href="/publications" className="bg-white text-black px-4 py-2 rounded">Publications</a>
        <a href="/projects" className="bg-white text-black px-4 py-2 rounded">Projects</a>
      </div>
    </main>
  );
}
