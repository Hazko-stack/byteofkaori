"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Github({ onClose }) {
  const [contributions, setContributions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Mengambil data aktivitas dari GitHub API
    const fetchGitHubActivity = async () => {
      const response = await fetch("https://api.github.com/users/Hazko-stack/events/public");
      const data = await response.json();
      setContributions(data);
      setIsLoaded(true);
    };

    fetchGitHubActivity();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full h-full max-w-4xl flex flex-col mx-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="bg-black text-center p-5">
          <h2 className="text-4xl font-mono text-white tracking-wider">GitHub Activity</h2>
        </div>

        {/* GitHub Activity Container */}
        <div className="flex-1 bg-black bg-blend-color-burn overflow-y-auto py-6 px-4">
          {/* Jika data sudah dimuat, tampilkan aktivitas */}
          {isLoaded ? (
            <div className="text-white font-mono space-y-4">
              {contributions.length > 0 ? (
                contributions.map((event, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <p className="text-yellow-500 text-sm">{new Date(event.created_at).toLocaleString()}</p>
                    <p className="text-white">{event.type}</p>
                    <p className="text-white">
                      {event.repo.name} - {event.payload.commits ? `${event.payload.commits.length} Commits` : "No Commits"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Tidak ada aktivitas terbaru ditemukan.</p>
              )}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-4">Memuat aktivitas dari GitHub...</p>
          )}

          {/* Bottom space */}
          <div className="h-20"></div>
        </div>

        {/* Bottom Buttons */}
        <div className="p-4 space-y-4">
          <a
            href="https://github.com/Hazko-stack"
            target="_blank"
            className="block"
            rel="noopener noreferrer"
          >
            <button className="bg-yellow-500 text-black py-3 rounded-lg font-bold text-xl w-full transition-all hover:bg-yellow-600">
              KUNJUNGI PROFIL
            </button>
          </a>

          <Link href="/" className="block">
            <button className="bg-red-500 text-white py-3 rounded-lg font-bold text-xl w-full transition-all hover:bg-red-600">
              KEMBALI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
