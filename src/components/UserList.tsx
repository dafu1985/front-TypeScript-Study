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
    <div>
      <h2>ユーザー一覧</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}（{user.email}）
          </li>
        ))}
      </ul>
      <button onClick={onLogout}>ログアウト</button>
    </div>
  );
};
