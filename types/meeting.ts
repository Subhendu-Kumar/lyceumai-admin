import { type LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type MeetingStatus = "ONGOING" | "CANCELED" | "SCHEDULED" | "COMPLETED";

export interface Call {
  id: string;
  meetId: string;
  description: string;
  MeetingTime: string;
  meetStatus: MeetingStatus;
}

export interface Recording {
  url: string;
  meet_date: string;
  session_id: string;
  summary: string | null;
  transcript: string | null;
}

export interface MeetingDetails {
  meetId: string;
  classroomId: string;
  MeetingTime: string;
  description: string;
  recordings: Recording[];
  meetStatus: MeetingStatus;
}

export interface MeetingCardProps {
  date: string;
  icon: LucideIcon;
  title: string;
  buttonText?: string;
  buttonIcon1?: string;
  handleClick: () => void;
  onCardClick?: () => void;
  isPreviousMeeting?: boolean;
}

export interface MeetingModalProps {
  img?: string;
  title: string;
  isOpen: boolean;
  btnIcon?: string;
  loading: boolean;
  btnText?: string;
  className?: string;
  onClose: () => void;
  children?: ReactNode;
  handelClick?: () => void;
}
