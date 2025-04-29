"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Actifity({ onClose }) {
  const [contributions, setContributions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from GitHub API
    const fetchGitHubActivity = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Hazko-stack/events/public");
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }
        const data = await response.json();
        setContributions(data);
        setIsLoaded(true);
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
        setError(err.message);
        setIsLoaded(true);
      }
    };

    fetchGitHubActivity();
  }, []);

  // Function to render event details based on event type
  const renderEventDetails = (event) => {
    switch (event.type) {
      case "PushEvent":
        return (
          <>
            <p className="text-green-400 font-semibold">Push Event</p>
            <p className="text-white">Repository: {event.repo.name}</p>
            {event.payload.commits && (
              <div className="mt-2">
                <p className="text-yellow-300">Commits: {event.payload.commits.length}</p>
                <ul className="ml-4 mt-1 space-y-1">
                  {event.payload.commits.map((commit, idx) => (
                    <li key={idx} className="text-gray-300 text-sm">
                      {commit.message.length > 60 
                        ? `${commit.message.substring(0, 60)}...` 
                        : commit.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        );
      case "CreateEvent":
        return (
          <>
            <p className="text-blue-400 font-semibold">
              Created {event.payload.ref_type} {event.payload.ref && `"${event.payload.ref}"`}
            </p>
            <p className="text-white">Repository: {event.repo.name}</p>
          </>
        );
      case "WatchEvent":
        return (
          <>
            <p className="text-purple-400 font-semibold">Starred Repository</p>
            <p className="text-white">Repository: {event.repo.name}</p>
          </>
        );
      case "ForkEvent":
        return (
          <>
            <p className="text-indigo-400 font-semibold">Forked Repository</p>
            <p className="text-white">From: {event.repo.name}</p>
          </>
        );
      case "PullRequestEvent":
        return (
          <>
            <p className="text-pink-400 font-semibold">
              Pull Request {event.payload.action}
            </p>
            <p className="text-white">Repository: {event.repo.name}</p>
            {event.payload.pull_request && (
              <p className="text-gray-300 text-sm mt-1">
                {event.payload.pull_request.title}
              </p>
            )}
          </>
        );
      case "IssuesEvent":
        return (
          <>
            <p className="text-orange-400 font-semibold">
              Issue {event.payload.action}
            </p>
            <p className="text-white">Repository: {event.repo.name}</p>
            {event.payload.issue && (
              <p className="text-gray-300 text-sm mt-1">
                {event.payload.issue.title}
              </p>
            )}
          </>
        );
      default:
        return (
          <>
            <p className="text-white font-semibold">{event.type}</p>
            <p className="text-white">Repository: {event.repo.name}</p>
          </>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="w-full h-full max-w-4xl flex flex-col mx-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="bg-black text-center p-5">
          <h2 className="text-4xl font-mono text-white tracking-wider">GitHub Activity</h2>
        </div>

        {/* GitHub Activity Container */}
        <div className="flex-1 bg-black bg-blend-color-burn overflow-y-auto py-6 px-4">
          {/* If data is loaded, display activity */}
          {isLoaded ? (
            <>
              {error ? (
                <p className="text-red-500 text-center">{error}</p>
              ) : (
                <div className="text-white font-mono space-y-4">
                  {contributions.length > 0 ? (
                    contributions.map((event, index) => (
                      <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
                        <div className="flex justify-between items-start">
                          <p className="text-yellow-500 text-sm">
                            {new Date(event.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="mt-2">
                          {renderEventDetails(event)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center">No recent activities found.</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-400 mt-4">
              <p>Loading GitHub activities...</p>
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
              </div>
            </div>
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
            <button className="bg-red-500 text-white py-3 rounded-lg font-bold text-xl w-full transition-all hover:bg-red-600" onClick={onClose}>
              KEMBALI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}