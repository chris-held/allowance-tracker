"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      aria-disabled={pending}
      className="bg-teal-700 rounded-md px-4 py-2 text-foreground mb-2 text-white disabled:bg-gray-400"
    >
      Create
    </button>
  );
}
