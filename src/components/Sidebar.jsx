"use client";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

function Sidebar() {
  const currentPath = usePathname();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/posts", label: "Posts" },
    { path: "/categories", label: "Categories" },
    { path: "/tags", label: "Tags" },
  ];
  return (
    <div className="px-4 py-10 border-r-2 w-52 flex flex-col justify-between min-h-screen">
      <div className="flex flex-col gap-10">
        <Logo></Logo>
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                className={`${
                  currentPath === link.path && "bg-gray-200"
                } block p-2 hover:bg-gray-200 rounded mb-1`}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}

export default Sidebar;
