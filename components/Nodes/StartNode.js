"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import NodeForm from "../Forms/NodeForm";

const StartNode = ({ id }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(true);

  return (
    <div className="flex justify-center">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <Button
            variant="gradient"
            className="w-[120px] h-[45px] flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-md shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer"
          >
            Add Activity
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="overflow-y-scroll h-screen">
                <NodeForm
                  id={id}
                  start={"start"}
                  setIsSheetOpen={setIsSheetOpen}
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default StartNode;
