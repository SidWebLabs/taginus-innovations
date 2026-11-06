"use client";
import { useState } from "react";

export default function EnquiryForm({ email, topics }: { email: string; topics: string[] }) {
  const [f, setF] = useState({ name: "", from: "", topic: topics[0] ?? "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const field = "mt-1 min-h-11 w-full rounded-lg border border-field/25 bg-white px-3 py-2 text-ink focus:border-leaf";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const body = `Name: ${f.name}\nEmail: ${f.from}\nTopic: ${f.topic}\n\n${f.message}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(`Enquiry: ${f.topic}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <label className="font-medium">Your name<input required value={f.name} onChange={set("name")} autoComplete="name" className={field} /></label>
      <label className="font-medium">Your email<input required type="email" value={f.from} onChange={set("from")} autoComplete="email" className={field} /></label>
      <label className="font-medium">Topic
        <select value={f.topic} onChange={set("topic")} className={field}>{topics.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="font-medium">Message<textarea required rows={5} value={f.message} onChange={set("message")} className={field} /></label>
      <button type="submit" className="min-h-11 rounded-lg bg-field px-5 font-semibold text-white hover:bg-leaf">Send enquiry by email</button>
      <p className="text-sm text-ink/60">This opens your email app with the enquiry filled in.</p>
    </form>
  );
}
