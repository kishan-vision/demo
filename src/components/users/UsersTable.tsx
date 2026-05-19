"use client";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import type { User, SortState } from "@/types";

interface UsersTableProps {
  users: User[];
}

type UserSortKey = "name" | "email" | "role" | "status" | "joinDate";

const ROLE_CLASSES: Record<string, string> = {
  Admin:     "bg-purple-100 text-purple-700",
  Editor:    "bg-blue-100 text-blue-700",
  Moderator: "bg-orange-100 text-orange-700",
  Viewer:    "bg-slate-100 text-slate-600",
};

const STATUS_CLASSES: Record<string, string> = {
  Active:   "bg-green-100 text-green-700",
  Inactive: "bg-slate-100 text-slate-600",
  Pending:  "bg-yellow-100 text-yellow-700",
};

export function UsersTable({ users }: UsersTableProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortState<UserSortKey>>({ column: "name", direction: null });

  const filtered = useMemo(() => {
    return users.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const sorted = useMemo(() => {
    if (!sort.direction) return filtered;

    return [...filtered].sort((a, b) => {
      const aVal = a[sort.column];
      const bVal = b[sort.column];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sort.direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return 0;
    });
  }, [filtered, sort]);

  const handleSort = (column: UserSortKey) => {
    setSort(prev => {
      if (prev.column !== column) return { column, direction: "asc" };
      if (prev.direction === "asc") return { column, direction: "desc" };
      return { column, direction: null };
    });
  };

  const renderSortIcon = (column: UserSortKey) => {
    if (sort.column !== column) return <ArrowUpDown className="h-4 w-4 opacity-50" />;
    if (sort.direction === "asc") return <ArrowUp className="h-4 w-4" />;
    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="max-w-xs"
      />

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-2">
                  Name
                  {renderSortIcon("name")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("email")}>
                <div className="flex items-center gap-2">
                  Email
                  {renderSortIcon("email")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("role")}>
                <div className="flex items-center gap-2">
                  Role
                  {renderSortIcon("role")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("status")}>
                <div className="flex items-center gap-2">
                  Status
                  {renderSortIcon("status")}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("joinDate")}>
                <div className="flex items-center gap-2">
                  Joined
                  {renderSortIcon("joinDate")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium text-slate-900">{user.name}</TableCell>
                <TableCell className="text-slate-600">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={ROLE_CLASSES[user.role]}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CLASSES[user.status]}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600">{user.joinDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
