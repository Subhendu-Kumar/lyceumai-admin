import { ReactNode } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  btnText?: string;
  handelClick?: () => void;
  children?: ReactNode;
  img?: string;
  btnIcon?: string;
  className?: string;
}

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
            {btnIcon && (
              <Image src={btnIcon} alt="btn Icon" height={13} width={13} />
            )}
            &nbsp;&nbsp;
            {btnText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingPopUpModal;
