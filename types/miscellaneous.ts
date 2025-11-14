import { type LucideIcon } from "lucide-react";

export interface TruncatedTextProps {
  text: string;
  limit?: number;
  expanded: boolean;
  onToggle: () => void;
}

export interface ClassNavLinks {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface BeforeInstallPromptEvent extends Event {
  platforms?: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform?: string }>;
}
