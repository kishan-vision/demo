import { UsersTable } from "@/components/users/UsersTable";
import { USERS } from "@/data/users";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-600 mt-2">Manage and view all users in the system.</p>
      </div>

      <UsersTable users={USERS} />
    </div>
  );
}
