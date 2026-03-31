import { User } from "../types/user.types";

type UserCardProps = {
  data: User;
};

export default function UserCard({ data }: UserCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {data.name.charAt(0)}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{data.name}</h2>
      </div>
      <div className="space-y-2 text-gray-600">
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-700">📧 Email:</span>
          <span>{data.email}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-700">📞 Phone:</span>
          <span>{data.phone}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-medium text-gray-700">🏢 Company:</span>
          <span>{data.company.name}</span>
        </p>
      </div>
    </div>
  );
}
