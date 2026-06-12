"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }
        router.push("/");
      }}
      className="mb-7 inline-flex min-h-10 items-center gap-2 rounded-full bg-white/8 px-3 py-2 text-xs font-bold text-sand ring-1 ring-white/10 transition hover:bg-white/14 hover:text-white"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      Volver
    </button>
  );
}
