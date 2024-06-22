import React from "react";
import { Card, CardContent, CardTitle } from "./ui/card";
import { IoCopy } from "react-icons/io5";
import { toast } from "sonner";

function ApiViewer({ apiTitle, description }) {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API ROUTE copied successfully");
  };
  return (
    <Card className="py-5 px-3 flex-grow">
      <CardTitle className=" mb-2 text-xl">{apiTitle}</CardTitle>
      <CardContent className="flex items-center justify-between">
        <code variant="muted" className="rounded ">
          {description}
        </code>
        <IoCopy className="cursor-pointer" onClick={onCopy} />
      </CardContent>
    </Card>
  );
}

export default ApiViewer;
