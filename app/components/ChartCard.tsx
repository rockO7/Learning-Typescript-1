"use client";
import { ReactNode } from "react";
import { Card } from "@/app/components/ui/Card";

type Props = {
  title: string;
  children: ReactNode;
};

export default function ChartCard({ title, children }: Props) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-200">
      <h3 className="mb-3 text-lg font-semibold text-gray-800">{title}</h3>
      <div className="w-full h-64">{children}</div>
    </div>
  );
}
