import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css"; 
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CanvasBoard() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center p-4 rounded-lg min-w-[120px] h-[120px] flex-shrink-0"
        >
          <img
            src="/path/to/canvas-icon.svg"
            alt="Canvas"
            className="w-10 h-10 mb-2"
          />
          <span className="font-medium">Canvas</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh]">
      </DialogContent>
    </Dialog>
  );
}
