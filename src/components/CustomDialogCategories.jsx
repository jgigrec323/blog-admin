"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function CustomDialogCategories({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState("");

  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);

  const handleOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!categories) {
      notify("Enter at least one category", false);
      return;
    }
    const response = await axios.post("/api/category", { categories });
    if (response.statusText !== "OK") {
      notify(response.data.message, false);
    }
    notify(response.data.message, true);
    setIsLoading(false);
    setOpen(false);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add categories</DialogTitle>
          <DialogDescription>
            In order to add multiple categories, separate them by commmas
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name">Categories</Label>
            <Input
              id="name"
              placeholder="Science, Sports, ..."
              className="col-span-3"
              value={categories}
              onChange={(e) => {
                setCategories(e.target.value);
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={(e) => {
              handleOnClick(e);
            }}
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
