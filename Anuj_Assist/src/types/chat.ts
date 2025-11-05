export interface ChatBubbleProps {
  role: string;
  content: string;
  profileIcon: string;
  time: string;
  animate?: boolean;
}

export interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  loading: boolean;
}

export interface Message {
  role: string;
  content: string;
  time?: string;
}
