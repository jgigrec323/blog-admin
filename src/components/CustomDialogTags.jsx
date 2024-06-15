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
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function CustomDialogTags({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState("");
  const { onAdd, setOnAdd } = useAppContext();

  const notify = (msg, isSuccess) =>
    isSuccess === true ? toast.success(msg) : toast.error(msg);

  const handleOnClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!tags) {
      notify("Enter at least one tag", false);
      return;
    }
    const response = await axios.post("/api/tag", { tags });
    if (response.statusText !== "OK") {
      notify(response.data.message, false);
    }
    notify(response.data.message, true);
    setIsLoading(false);
    setOpen(false);
    setOnAdd(!onAdd);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Tags</DialogTitle>
          <DialogDescription>
            In order to add multiple tags, separate them by commmas
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="name">Tags</Label>
            <Input
              id="name"
              placeholder="Nouveau, actu, ..."
              className="col-span-3"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
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
