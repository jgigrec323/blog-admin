import React from "react";
import { IoIosAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { CustomDialogCategories } from "@/components/CustomDialogCategories";

function MainPagesLayout({ children }) {
  return (
    <div className="">
      <div className="flex justify-end">
        <CustomDialogCategories>
          <Button variant="outline">
            <IoIosAdd size={22} className="mr-1"></IoIosAdd> New
          </Button>
        </CustomDialogCategories>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default MainPagesLayout;
