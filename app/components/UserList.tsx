import { Joke } from "../types/user.types";
import UserCard from "./UserCard";

type JokeListProps = {
  data: Joke[];
};

export default function UserList({ data }: JokeListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {data.map((joke, index) => (
        <UserCard key={joke.id} data={joke} index={index} />
      ))}
    </div>
  );
}
