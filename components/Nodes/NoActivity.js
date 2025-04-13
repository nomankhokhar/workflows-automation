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
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);
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
                <NodeForm
                  id={id}
                  start={"noActivity"}
                  setIsSheetOpen={setIsSheetOpen}
                />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

export default NoActivity;
