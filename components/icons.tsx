import { LucideProps } from "lucide-react";
import { Github } from "lucide-react"; // ícone do Lucide para GitHub

export const Icons = {
  logo: (props: LucideProps) => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  ),
  gitHub: (props: LucideProps) => <Github {...props} />,
};
