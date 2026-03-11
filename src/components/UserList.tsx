// src/components/UserList.tsx
import { useEffect, useState } from "react";
import { getUsers } from "../api/auth";

type User = {
  id: number;
  name: string;
  email: string;
};

type Props = {
  token: string;
  onLogout: () => void;
};

export const UserList = ({ token, onLogout }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(token);
        setUsers(data);
      } catch (e: any) {
        setError(e.response?.data?.message || "取得に失敗しました");
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">ユーザー一覧</h2>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            ログアウト
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="bg-white rounded shadow-md divide-y">
          {users.map((user) => (
            <div key={user.id} className="px-6 py-4">
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
