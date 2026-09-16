"use client";

import { useId } from "react";
import { useSimulation } from "@/hooks/useSimulation";

export function DatePicker() {
  const { date, setDate } = useSimulation();
  const id = useId();

  return (
    <div className="date-picker">
      <label className="field-label" htmlFor={id}>
        日付を指定
      </label>
      <input
        id={id}
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={(event) => {
          const nextDate = new Date(`${event.target.value}T12:00:00Z`);
          if (!Number.isNaN(nextDate.getTime())) setDate(nextDate);
        }}
      />
    </div>
  );
}
