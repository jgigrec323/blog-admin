"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "next-themes";

function CustomCard({ number, title, analytic }) {
  const { theme } = useTheme();
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <Card className="py-5 px-3 flex-grow">
      <CardTitle className=" mb-2">{formatNumber(number)}</CardTitle>
      <div className="flex justify-between">
        <p>{title}</p>
        {analytic && (
          <div
            className={`${
              theme === "light" ? "bg-[#dbf2f2]" : "text-[#4ad3d3]"
            } p-1`}
          >
            {analytic}
          </div>
        )}
      </div>
    </Card>
  );
}

export default CustomCard;
