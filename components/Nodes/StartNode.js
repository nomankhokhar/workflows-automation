"use client";
import React from "react";
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
  return (
    <div className="flex justify-center">
      <Sheet>
        <SheetTrigger>
          <Button
            variant="outline"
            className="w-[100px] h-[40px] cursor-pointer p-3 border-2 border-dashed border-gray-300 rounded-md"
          >
            Add Activity +
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="overflow-y-scroll h-screen">
                <NodeForm id={id} start={"start"} />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default StartNode;
