import React from "react";
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

const NoActivity = ({ id }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="outline">No Activity</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="overflow-y-scroll h-screen">
                <NodeForm id={id} start={"noActivity"} />
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

export default NoActivity;
