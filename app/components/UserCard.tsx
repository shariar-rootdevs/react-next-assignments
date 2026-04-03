import { Joke } from "../types/user.types";

const cardColors = [
  "from-purple-500 to-indigo-600",
  "from-pink-500 to-rose-600",
  "from-orange-400 to-red-500",
  "from-teal-400 to-cyan-600",
  "from-green-400 to-emerald-600",
  "from-yellow-400 to-orange-500",
  "from-blue-500 to-violet-600",
  "from-fuchsia-500 to-pink-600",
  "from-amber-400 to-yellow-600",
  "from-sky-400 to-blue-600",
];

const emojis = ["😂", "🤣", "😆", "😹", "🤡", "🎉", "💀", "😜", "🤪", "🙃"];

type JokeCardProps = {
  data: Joke;
  index: number;
};

export default function UserCard({ data, index }: JokeCardProps) {
  const colorClass = cardColors[index % cardColors.length];
  const emoji = emojis[index % emojis.length];

  return (
    <div className="flip-card h-64">
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className={`flip-card-front bg-linear-to-br ${colorClass} rounded-2xl p-6 flex flex-col justify-center items-center text-white shadow-lg`}
        >
          <span className="text-4xl mb-4">{emoji}</span>
          <p className="text-center text-lg font-semibold leading-relaxed">
            {data.setup}
          </p>
          <span className="mt-4 text-xs uppercase tracking-widest opacity-70 bg-white/20 px-3 py-1 rounded-full">
            {data.type}
          </span>
        </div>

        {/* Back */}
        <div className="flip-card-back bg-white rounded-2xl p-6 flex flex-col justify-center items-center shadow-lg border-2 border-dashed border-purple-300">
          <span className="text-4xl mb-4">🥁</span>
          <p className="text-center text-xl font-bold text-gray-800 leading-relaxed">
            {data.punchline}
          </p>
          <span className="mt-4 text-sm text-purple-500 font-medium">
            😆 Got it?
          </span>
        </div>
      </div>
    </div>
  );
}
