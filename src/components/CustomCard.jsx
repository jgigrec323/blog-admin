import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CustomCard({ number, title, analytic }) {
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
        <div>{analytic}</div>
      </div>
    </Card>
  );
}

export default CustomCard;
