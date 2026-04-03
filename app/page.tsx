"use client";
import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import { Joke } from "./types/user.types";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<Joke[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(
          "https://official-joke-api.appspot.com/jokes/ten",
          { signal: controller.signal },
        );
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Failed to fetch jokes");
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredData = data.filter(
    (joke) =>
      joke.setup.toLowerCase().includes(search.toLowerCase()) ||
      joke.punchline.toLowerCase().includes(search.toLowerCase()) ||
      joke.type.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-purple-600 font-medium">Loading jokes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-md">
          <p className="text-red-600 text-lg font-semibold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto bg-linear-to-br from-purple-100 via-pink-100 to-yellow-100">
      <h1 className="text-4xl font-extrabold text-center mb-2 bg-linear-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
        😂 Joke Corner
      </h1>
      <p className="text-center text-gray-500 mb-8">Hover on a card to reveal the punchline!</p>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search jokes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-purple-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all bg-white/70 backdrop-blur-sm"
        />
      </div>
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No jokes found.</p>
      ) : (
        <UserList data={filteredData} />
      )}
    </div>
  );
}
