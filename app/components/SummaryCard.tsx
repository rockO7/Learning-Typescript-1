import { ReactNode } from "react";
import classNames from "classnames";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
  bgColor?: string; // Tailwind color class, e.g., 'bg-accent'
};

export default function SummaryCard({
  title,
  value,
  icon,
  bgColor = "bg-primary",
}: Props) {
  return (
    <div
      className={classNames(
        "rounded-xl p-5 text-white shadow-lg flex items-center gap-4",
        bgColor,
        "transform hover:scale-[1.02] transition-transform"
      )}
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-sm font-medium opacity-90">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
