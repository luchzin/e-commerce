"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

export default function TrustedUsers() {
  const [trustedUsers, setTrustedUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetch trusted users (first 4 with images)
        const response = await fetch("/api/users/trusted?limit=4");
        const users = await response.json();
        setTrustedUsers(users);

        // Fetch total count
        const totalResponse = await fetch("/api/users/count");
        const { count } = await totalResponse.json();
        setTotalUsers(count);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Fallback to static data
        setTrustedUsers([
          { id: "1", name: "User 1", image: "/img/1.jpg" },
          { id: "2", name: "User 2", image: "/img/2.jpg" },
          { id: "3", name: "User 3", image: "/img/3.jpg" },
          { id: "4", name: "User 4", image: "/img/4.jpg" },
        ]);
        setTotalUsers(60000);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white flex items-center rounded-full border px-4 py-2 shadow-sm animate-pulse">
        <div className="flex -space-x-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-5 h-5 bg-gray-300 rounded-full"></div>
          ))}
        </div>
        <div className="px-2 text-xs text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-1 flex items-center rounded-full border shadow-sm">
      <div className="flex -space-x-1.5">
        {trustedUsers.map((user, index) => (
          <div key={user.id} className="relative">
            <Image
              className="rounded-full ring-1"
              src={user.image || `/img/default-avatar-${(index % 4) + 1}.jpg`}
              width={28}
              height={28}
              alt={`${user.name || "User"}'s avatar`}
            />
          </div>
        ))}
      </div>
      <p className="text-black px-2 text-xs">
        Trusted by{" "}
        <strong className="bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent font-medium">
          {totalUsers}+
        </strong>{" "}
        users.
      </p>
    </div>
  );
}
