import { useMemo, useRef, useState, useEffect } from "react";
import { conductors, type Conductor } from "../data/conductors";

interface Props {
  selected: Conductor;
  onSelect: (conductor: Conductor) => void;
}

export default function ConductorSelector({
  selected,
  onSelect,
}: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };

    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return conductors;

    const q = query.toLowerCase();

    return conductors.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.family.toLowerCase().includes(q) ||
        c.material.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* Search pill */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1C1C1E]/80 px-5 py-4 backdrop-blur-xl">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-60">
          <path
            d="M21 21L16.65 16.65M11 18C7.13 18 4 14.87 4 11S7.13 4 11 4s7 3.13 7 7-3.13 7-7 7Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>

        <input
          value={open ? query : ""}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={selected.name}
          className="w-full bg-transparent text-white outline-none placeholder:text-white/55"
        />
      </div>

      {/* Floating dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[74px] z-50 max-h-[380px] overflow-y-auto rounded-2xl border border-white/10 bg-[#171717]/95 shadow-2xl backdrop-blur-2xl">
          {filtered.map((conductor) => (
            <button
              key={conductor.id}
              onClick={() => {
                onSelect(conductor);
                setOpen(false);
                setQuery("");
              }}
              className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5"
            >
              <div>
                <p className="font-semibold text-white">{conductor.name}</p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70">
                    {conductor.family}
                  </span>

                  <span className="text-xs text-white/45">
                    {conductor.material}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="font-mono text-sm text-white">
                  Ø {conductor.diameter.toFixed(2)}
                </p>

                <p className="text-xs text-white/45">
                  {conductor.weightPerKm} kg/km
                </p>
              </div>
            </button>
          ))}

          {filtered.length === 0 && (
            <div className="px-5 py-8 text-center text-sm text-white/40">
              No conductors found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
