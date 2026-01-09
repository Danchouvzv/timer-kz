export interface TimeState {
  hours: string;
  minutes: string;
  seconds: string;
  date: string;
  period?: string; // For AM/PM if we ever switch, currently 24h
}

export interface ClockProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}