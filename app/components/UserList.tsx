import { User } from "../types/user.types";
import UserCard from "./UserCard";

type UserListProps = {
  data: User[];
};

export default function UserList({ data }: UserListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {data.map((user) => (
        <UserCard key={user.id} data={user} />
      ))}
    </div>
  );
}
