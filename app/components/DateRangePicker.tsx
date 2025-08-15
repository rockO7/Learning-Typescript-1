"use client";
import { useState } from "react";
import { format, subMonths } from "date-fns";
import { CalendarIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";

type Props = {
  onChange: (range: { start: Date; end: Date }) => void;
};

export default function DateRangePicker({ onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState({
    start: subMonths(new Date(), 6),
    end: new Date(),
  });

  const apply = () => {
    onChange(range);
    setOpen(false);
  };

  const quickOptions = [
    { label: "Last 30 days", months: 1 },
    { label: "Last 90 days", months: 3 },
    { label: "Last 6 months", months: 6 },
    { label: "Last 12 months", months: 12 },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        className="inline-flex items-center gap-2 rounded-md bg-surface px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="h-5 w-5 text-gray-500" />
        <span>{`${format(range.start, "MMM d, yyyy")} - ${format(
          range.end,
          "MMM d, yyyy"
        )}`}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
          <div className="p-4">
            <p className="font-medium mb-2">Quick ranges</p>
            <div className="grid gap-1">
              {quickOptions.map((opt) => (
                <button
                  key={opt.label}
                  className="text-left w-full rounded px-2 py-1 text-sm hover:bg-gray-100"
                  onClick={() => {
                    const newStart = subMonths(new Date(), opt.months);
                    setRange({ start: newStart, end: new Date() });
                    onChange({ start: newStart, end: new Date() });
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <hr className="my-3" />
            <div className="flex justify-end gap-2">
              <button
                className="rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-primary px-3 py-1 text-sm text-white hover:bg-primary/90"
                onClick={apply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
