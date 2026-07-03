"use client";

type CherengaWalkProps = {
  active: boolean;
};

export function CherengaWalk({ active }: CherengaWalkProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-3 z-20 h-[3.9rem] w-36 transition duration-300 ${
        active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      }`}
    >
      <span className="cherenga-walk-sprite" />
    </div>
  );
}
