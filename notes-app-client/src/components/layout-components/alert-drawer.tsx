import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "../ui/button";
import { AlertDrawerProps } from "@/lib/types";

function AlertDrawer({
  open,
  setOpen,
  title = "Are you sure?",
  description = "",
  primaryButtonText = "Yes",
  isDestructive = false,
  onConfirmation = () => {},
  isLoading = false,
}: AlertDrawerProps) {
  const btnVariant = isDestructive ? "destructive" : "default";

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="outline-none max-w-3xl md:left-[calc((100vw-768px)/2)] md:top-2/3">
        <div className="mx-auto w-full max-w-sm md:m-auto">
          <DrawerHeader>
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <DrawerDescription className="text-center">
              {description}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="flex flex-row">
            <DrawerClose asChild className="flex-1">
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              className="flex-1"
              onClick={onConfirmation}
              variant={btnVariant}
              loading={isLoading}
            >
              {primaryButtonText}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default AlertDrawer;
