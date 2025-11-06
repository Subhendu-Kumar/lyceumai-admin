export interface TruncatedTextProps {
  text: string;
  limit?: number;
  expanded: boolean;
  onToggle: () => void;
}
