import Image from "next/image";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingModalProps } from "@/types/meeting";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const MeetingPopUpModal = ({
  isOpen,
  onClose,
  title,
  btnText,
  handelClick,
  children,
  img,
  btnIcon,
  className,
  loading,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-4 border-none bg-gray-200 px-6 py-6">
        <div className="flex flex-col gap-4">
          {img && (
            <div className="flex justify-center">
              <Image src={img} alt="image" width={72} height={72} />
            </div>
          )}
          <h1 className={cn("text-2xl font-bold", className)}>{title}</h1>
          {children}
          <Button
            className="bg-blue-500 hover:bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-base font-semibold"
            onClick={handelClick}
          >
            {!loading && btnIcon && (
              <Image src={btnIcon} alt="btn Icon" height={13} width={13} />
            )}
            &nbsp;&nbsp;
            {!loading && (btnText || "Schedule Meeting")}
            {loading && <Loader className="animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingPopUpModal;
