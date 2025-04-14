"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "./ui/button";
import StartingWorkFlowForm from "./Forms/StartingWorkFlowForm";

export function StartWorkFlow() {
  return (
    <>
      <Sheet>
        <SheetTrigger>
          <Button className="cursor-pointer">Start Workflow</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <StartingWorkFlowForm />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
}
