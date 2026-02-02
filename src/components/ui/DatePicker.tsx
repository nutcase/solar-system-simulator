"use client";

import { useSimulation } from "@/hooks/useSimulation";

export function DatePicker() {
  const { date, setDate } = useSimulation();

  const dateStr = date.toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value + "T12:00:00Z");
    if (!isNaN(newDate.getTime())) {
      setDate(newDate);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] uppercase tracking-wider text-gray-400">日付</label>
      <input
        type="date"
        value={dateStr}
        onChange={handleChange}
        className="rounded bg-white/10 px-2 py-1 text-sm text-white outline-none ring-1 ring-white/20 focus:ring-white/50"
      />
    </div>
  );
}
