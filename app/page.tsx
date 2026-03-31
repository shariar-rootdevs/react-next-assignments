"use client";
import { useEffect, useState } from "react";
import UserList from "./components/UserList";
import { User } from "./types/user.types";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [data, setData] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal },
        );
        clearTimeout(timeoutId);
        if (!response.ok) {
          throw new Error("Failed to fetch users");
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
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.company.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
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
    <div className="min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        User Directory
      </h1>
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
        />
      </div>
      {filteredData.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <UserList data={filteredData} />
      )}
    </div>
  );
}
