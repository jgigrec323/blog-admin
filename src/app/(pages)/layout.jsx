"use client";
import React from "react";
import { IoIosAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { CustomDialogCategories } from "@/components/CustomDialogCategories";
import { usePathname } from "next/navigation";
import { CustomDialogTags } from "@/components/CustomDialogTags";

function MainPagesLayout({ children }) {
  const currentPath = usePathname();

  return (
    <div className="">
      <div className="flex justify-end">
        {currentPath === "/categories" ? (
          <CustomDialogCategories>
            <Button variant="outline">
              <IoIosAdd size={22} className="mr-1"></IoIosAdd> New
            </Button>
          </CustomDialogCategories>
        ) : currentPath === "/tags" ? (
          <CustomDialogTags>
            <Button variant="outline">
              <IoIosAdd size={22} className="mr-1"></IoIosAdd> New
            </Button>
          </CustomDialogTags>
        ) : (
          ""
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MainPagesLayout;
