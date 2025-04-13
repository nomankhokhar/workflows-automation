import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import NodeForm from "../Forms/NodeForm";

const YesActivity = ({ id }) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger>
          <Button variant="outline">Yes Activity</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="overflow-y-scroll h-screen">
                <NodeForm
                  id={id}
                  start={"yesActivity"}
                  setIsSheetOpen={setIsSheetOpen}
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default YesActivity;
