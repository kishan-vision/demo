import type { User } from "@/types";

export const USERS: User[] = [
  { id: "u1",  name: "Alice Johnson",   email: "alice@example.com",   role: "Admin",     status: "Active",   joinDate: "2023-01-15" },
  { id: "u2",  name: "Bob Smith",       email: "bob@example.com",     role: "Editor",    status: "Active",   joinDate: "2023-03-22" },
  { id: "u3",  name: "Carol Williams",  email: "carol@example.com",   role: "Viewer",    status: "Inactive", joinDate: "2023-02-10" },
  { id: "u4",  name: "David Brown",     email: "david@example.com",   role: "Moderator", status: "Active",   joinDate: "2023-05-01" },
  { id: "u5",  name: "Eva Martinez",    email: "eva@example.com",     role: "Editor",    status: "Pending",  joinDate: "2023-06-18" },
  { id: "u6",  name: "Frank Lee",       email: "frank@example.com",   role: "Viewer",    status: "Active",   joinDate: "2023-07-30" },
  { id: "u7",  name: "Grace Kim",       email: "grace@example.com",   role: "Editor",    status: "Active",   joinDate: "2023-08-14" },
  { id: "u8",  name: "Henry Wilson",    email: "henry@example.com",   role: "Viewer",    status: "Inactive", joinDate: "2023-09-05" },
  { id: "u9",  name: "Irene Taylor",    email: "irene@example.com",   role: "Moderator", status: "Active",   joinDate: "2023-10-20" },
  { id: "u10", name: "James Anderson",  email: "james@example.com",   role: "Admin",     status: "Active",   joinDate: "2023-11-11" },
];
