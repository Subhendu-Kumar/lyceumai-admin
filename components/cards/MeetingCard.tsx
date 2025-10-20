"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface MeetingCardProps {
  date: string;
  icon: string;
  link: string;
  title: string;
  buttonText?: string;
  buttonIcon1?: string;
  onCardClick?: () => void;
  handleClick: () => void;
  isPreviousMeeting?: boolean;
}

const MeetingCard = ({
  link,
  icon,
  date,
  title,
  buttonText,
  buttonIcon1,
  handleClick,
  onCardClick,
  isPreviousMeeting,
}: MeetingCardProps) => {
  return (
    <section
      onClick={onCardClick}
      className="flex w-full flex-col justify-between rounded-[14px] bg-zinc-200 px-5 py-8 xl:max-w-[568px]"
    >
      <article className="flex flex-col gap-5">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Image src={icon} alt="upcoming" width={24} height={24} />
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-end mt-4", {})}>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="rounded bg-blue-500 hover:bg-blue-600 px-6"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(link);
                toast("Link Copied");
              }}
              className="bg-green-500 hover:bg-green-600 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
