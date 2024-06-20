"use client";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IoIosAdd } from "react-icons/io";

function Sidebar() {
  const currentPath = usePathname();
  const router = useRouter();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/posts", label: "Posts" },
    { path: "/categories", label: "Categories" },
    { path: "/tags", label: "Tags" },
  ];
  return (
    <div className="fixed bg-white px-4 py-10 border-r-2  flex flex-col justify-between min-w-56 min-h-screen">
      <div className="flex flex-col gap-12">
        <Logo></Logo>
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                variant="outline"
                className={`${
                  currentPath === link.path && "bg-black text-white"
                } block py-2 px-4 rounded mb-1 text-lg`}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between">
        <UserButton afterSignOutUrl="/sign-in" />
        <Button
          onClick={() => {
            router.push("/write");
          }}
          className="bg-black text-white"
        >
          <IoIosAdd size={22} className="mr-1" />
          New Post
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
