"use client";
import { useState } from "react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={async () => {
        try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1800); } catch { /* clipboard unavailable */ }
      }}
      className="min-h-9 rounded-md border border-field/25 px-3 text-sm font-semibold text-field hover:bg-sage"
    >
      {done ? "Copied" : "Copy"}
    </button>
  );
}
