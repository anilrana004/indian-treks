import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ALL_TREKS, type TrekOption, getTrekBySlug } from "@/data/trekData";
import {
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  Minus,
  Mountain,
  Plus,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navigation from "../components/Navigation";

// ─── Types ───────────────────────────────────────────────────────────────────
interface BatchRow {
  id: string;
  label: string;
  duration: string;
  seats: number;
  price: number;
  status: "Available" | "Limited" | "Full";
}

interface CoTrekker {
  id: number;
  name: string;
  age: string;
  email: string;
  phone: string;
  tshirtSize: string;
  experience: string;
  medical: string;
}

interface Step1State {
  trekSlug: string;
  selectedBatchId: string;
  groupSize: number;
  accommodation: "camping" | "guesthouse" | "mixed";
}

interface Step2State {
  name: string;
  age: string;
  email: string;
  phone: string;
  emergencyName: string;
  emergencyPhone: string;
  tshirtSize: string;
  medical: string;
  experience: string;
  coTrekkers: CoTrekker[];
}

type Step2Errors = Partial<
  Record<keyof Omit<Step2State, "coTrekkers" | "medical">, string>
>;

// ─── Constants ───────────────────────────────────────────────────────────────
const HARDCODED_BATCHES: BatchRow[] = [
  {
    id: "b1",
    label: "Jun 15 – Jun 22, 2025",
    duration: "8 days",
    seats: 14,
    price: 15999,
    status: "Available",
  },
  {
    id: "b2",
    label: "Jul 1 – Jul 8, 2025",
    duration: "8 days",
    seats: 6,
    price: 15999,
    status: "Limited",
  },
  {
    id: "b3",
    label: "Jul 20 – Jul 27, 2025",
    duration: "8 days",
    seats: 2,
    price: 15999,
    status: "Limited",
  },
  {
    id: "b4",
    label: "Aug 5 – Aug 12, 2025",
    duration: "8 days",
    seats: 0,
    price: 15999,
    status: "Full",
  },
  {
    id: "b5",
    label: "Sep 10 – Sep 17, 2025",
    duration: "8 days",
    seats: 16,
    price: 15999,
    status: "Available",
  },
  {
    id: "b6",
    label: "Sep 25 – Oct 2, 2025",
    duration: "8 days",
    seats: 12,
    price: 15999,
    status: "Available",
  },
  {
    id: "b7",
    label: "Oct 8 – Oct 15, 2025",
    duration: "8 days",
    seats: 4,
    price: 16499,
    status: "Limited",
  },
  {
    id: "b8",
    label: "Oct 22 – Oct 29, 2025",
    duration: "8 days",
    seats: 0,
    price: 16499,
    status: "Full",
  },
];

const EXPERIENCE_OPTIONS = [
  "First timer",
  "1-2 treks",
  "3-5 treks",
  "5+ treks",
  "Regular trekker",
];
const TSHIRT_SIZES = ["S", "M", "L", "XL", "XXL"];
const ACCOMMODATION_OPTIONS = [
  { value: "camping", label: "🏕️ Camping" },
  { value: "guesthouse", label: "🏠 Guesthouse" },
  { value: "mixed", label: "🔄 Mixed" },
] as const;

const PAYMENT_METHODS = [
  { id: "upi", label: "📱 UPI" },
  { id: "card", label: "💳 Credit/Debit Card" },
  { id: "neft", label: "🏦 Net Banking" },
  { id: "emi", label: "📅 EMI" },
];

const STEP_LABELS = ["Choose Date & Group", "Your Details", "Review & Confirm"];

function formatINR(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

function genRef() {
  return `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-0" data-ocid="booking.progress_bar">
      {STEP_LABELS.map((label, i) => {
        const n = i + 1;
        const done = step > n;
        const active = step === n;
        const linePos = i < STEP_LABELS.length - 1;
        return (
          <div
            key={n}
            className="flex items-center"
            style={{ flex: linePos ? "1 1 0" : "0 0 auto" }}
          >
            <div className="flex flex-col items-center gap-1.5 min-w-0">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300"
                style={{
                  background: done
                    ? "var(--color-glacier)"
                    : active
                      ? "var(--color-summit)"
                      : "var(--color-ash)",
                  color: done || active ? "var(--color-midnight)" : "#666",
                }}
                data-ocid={`booking.step_${n}`}
              >
                {done ? <CheckCircle2 size={16} /> : n}
              </div>
              <span
                className="text-xs font-ui text-center leading-tight hidden sm:block px-1"
                style={{
                  color: done
                    ? "var(--color-glacier)"
                    : active
                      ? "var(--color-summit)"
                      : "var(--color-ash)",
                  fontWeight: active ? 700 : 400,
                }}
              >
                {label}
              </span>
            </div>
            {linePos && (
              <div
                className="flex-1 h-0.5 mx-2 rounded transition-all duration-500"
                style={{
                  background: done
                    ? "var(--color-glacier)"
                    : "var(--color-ash)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Trek Selector Dropdown ───────────────────────────────────────────────────
function TrekSelector({
  value,
  onChange,
}: { value: string; onChange: (slug: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trek = getTrekBySlug(value);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative" data-ocid="booking.trek_selector">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border-2 font-ui text-sm transition-all"
        style={{
          background: "var(--color-snow)",
          borderColor: open ? "var(--color-glacier)" : "var(--color-ash)",
          color: "var(--color-midnight)",
        }}
        onClick={() => setOpen((o) => !o)}
        data-ocid="booking.trek_dropdown"
      >
        <span className="flex items-center gap-2 min-w-0">
          <Mountain size={16} style={{ color: "var(--color-glacier)" }} />
          {trek ? (
            <span className="font-semibold truncate">{trek.name}</span>
          ) : (
            <span style={{ color: "var(--color-ash)" }}>
              Select Trek or Yatra
            </span>
          )}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "var(--color-ash)",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
          }}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 rounded-2xl shadow-2xl overflow-hidden mt-1"
          style={{
            background: "var(--color-snow)",
            border: "2px solid var(--color-ash)",
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {ALL_TREKS.map((t) => (
            <button
              key={t.slug}
              type="button"
              className="w-full text-left px-4 py-3 flex items-center justify-between gap-3 transition-colors"
              style={{
                background:
                  value === t.slug ? "rgba(77,168,199,0.12)" : "transparent",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(77,168,199,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background =
                  value === t.slug ? "rgba(77,168,199,0.12)" : "transparent";
              }}
              onClick={() => {
                onChange(t.slug);
                setOpen(false);
              }}
            >
              <div className="min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: "var(--color-midnight)" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "#666", fontFamily: "var(--font-mono)" }}
                >
                  {t.difficulty} · {t.duration} · {t.altitude}
                </p>
              </div>
              <span
                className="text-sm font-bold flex-shrink-0"
                style={{ color: "var(--color-glacier)" }}
              >
                from {formatINR(t.basePrice)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Group Size Stepper ───────────────────────────────────────────────────────
function GroupStepper({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all"
        style={{
          borderColor: value <= 1 ? "var(--color-ash)" : "var(--color-glacier)",
          color: value <= 1 ? "var(--color-ash)" : "var(--color-glacier)",
          background: "var(--color-snow)",
          opacity: value <= 1 ? 0.5 : 1,
        }}
        aria-label="Decrease group size"
        data-ocid="booking.group_minus"
      >
        <Minus size={18} />
      </button>
      <span
        className="text-3xl font-bold w-12 text-center tabular-nums"
        style={{
          color: "var(--color-midnight)",
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </span>
      <button
        type="button"
        disabled={value >= 15}
        onClick={() => onChange(Math.min(15, value + 1))}
        className="w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all"
        style={{
          borderColor:
            value >= 15 ? "var(--color-ash)" : "var(--color-glacier)",
          color: value >= 15 ? "var(--color-ash)" : "var(--color-glacier)",
          background: "var(--color-snow)",
          opacity: value >= 15 ? 0.5 : 1,
        }}
        aria-label="Increase group size"
        data-ocid="booking.group_plus"
      >
        <Plus size={18} />
      </button>
    </div>
  );
}

// ─── Batch Table ──────────────────────────────────────────────────────────────
function BatchTable({
  batches,
  selectedId,
  onSelect,
}: {
  batches: BatchRow[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div
      className="overflow-x-auto rounded-2xl border-2"
      style={{ borderColor: "var(--color-ash)" }}
    >
      <table className="w-full min-w-[560px]">
        <thead>
          <tr style={{ background: "var(--color-midnight)" }}>
            {["Date", "Duration", "Seats", "Price", "Status", "Action"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-xs font-bold tracking-widest uppercase font-mono"
                  style={{ color: "var(--color-ash)" }}
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {batches.map((b, i) => {
            const isSelected = selectedId === b.id;
            const isFull = b.status === "Full";
            const rowBg = isSelected
              ? "rgba(232,197,71,0.12)"
              : i % 2 === 0
                ? "rgba(245,242,236,0.97)"
                : "rgba(245,242,236,0.85)";
            return (
              <tr
                key={b.id}
                style={{
                  background: rowBg,
                  border: isSelected
                    ? "2px solid var(--color-summit)"
                    : undefined,
                  cursor: isFull ? "not-allowed" : "pointer",
                  opacity: isFull ? 0.5 : 1,
                }}
                onClick={() => !isFull && onSelect(b.id)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  !isFull &&
                  onSelect(b.id)
                }
                data-ocid={`booking.batch_row.${i + 1}`}
              >
                <td
                  className="px-4 py-3 font-semibold text-sm"
                  style={{
                    color: "var(--color-midnight)",
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {b.label}
                </td>
                <td
                  className="px-4 py-3 text-sm"
                  style={{ color: "var(--color-midnight)" }}
                >
                  {b.duration}
                </td>
                <td
                  className="px-4 py-3 text-sm font-mono"
                  style={{
                    color:
                      b.seats === 0
                        ? "#c94f2a"
                        : b.seats <= 5
                          ? "#c97c2a"
                          : "var(--color-pine)",
                  }}
                >
                  {b.seats > 0 ? `${b.seats} seats` : "Full"}
                </td>
                <td
                  className="px-4 py-3 text-sm font-bold font-mono"
                  style={{ color: "var(--color-midnight)" }}
                >
                  {formatINR(b.price)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{
                      background:
                        b.status === "Available"
                          ? "rgba(46,94,62,0.15)"
                          : b.status === "Limited"
                            ? "rgba(201,79,42,0.12)"
                            : "rgba(201,79,42,0.12)",
                      color:
                        b.status === "Available"
                          ? "var(--color-pine)"
                          : "var(--color-ember)",
                    }}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {!isFull && (
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded text-xs font-bold transition-all"
                      style={{
                        background: isSelected
                          ? "var(--color-summit)"
                          : "var(--color-glacier)",
                        color: "var(--color-midnight)",
                        borderRadius: 4,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(b.id);
                      }}
                      data-ocid={`booking.batch_select.${i + 1}`}
                    >
                      {isSelected ? "✓ Selected" : "Select"}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Price Summary Card ────────────────────────────────────────────────────────
function PriceSummaryCard({
  trek,
  batch,
  groupSize,
  accommodation,
}: {
  trek: TrekOption | undefined;
  batch: BatchRow | undefined;
  groupSize: number;
  accommodation: string;
}) {
  if (!trek || !batch) return null;
  const base = batch.price * groupSize;
  const advance = Math.round(base * 0.1);
  const balance = base - advance;
  return (
    <div
      className="rounded-2xl border-2 p-6 mt-6"
      style={{ background: "#fff", borderColor: "var(--color-summit)" }}
      data-ocid="booking.price_summary"
    >
      <h3
        className="font-display text-xl font-bold mb-4"
        style={{ color: "var(--color-midnight)" }}
      >
        Booking Summary
      </h3>
      <div className="space-y-2 text-sm font-ui" style={{ color: "#444" }}>
        <div className="flex justify-between">
          <span
            className="font-semibold"
            style={{ color: "var(--color-midnight)" }}
          >
            Trek
          </span>
          <span>{trek.name}</span>
        </div>
        <div className="flex justify-between">
          <span
            className="font-semibold"
            style={{ color: "var(--color-midnight)" }}
          >
            Dates
          </span>
          <span>{batch.label}</span>
        </div>
        <div className="flex justify-between">
          <span
            className="font-semibold"
            style={{ color: "var(--color-midnight)" }}
          >
            Group
          </span>
          <span>
            {groupSize} trekker{groupSize > 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between">
          <span
            className="font-semibold"
            style={{ color: "var(--color-midnight)" }}
          >
            Accommodation
          </span>
          <span className="capitalize">{accommodation}</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between">
          <span>
            Base price: {formatINR(batch.price)} × {groupSize}
          </span>
          <span className="font-semibold">{formatINR(base)}</span>
        </div>
        <div
          className="flex justify-between text-xs"
          style={{ color: "var(--color-pine)" }}
        >
          <span>Advance (10%)</span>
          <span>{formatINR(advance)} due now</span>
        </div>
        <div className="flex justify-between text-xs" style={{ color: "#666" }}>
          <span>Balance</span>
          <span>{formatINR(balance)} due 30 days before</span>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between items-center">
          <span
            className="font-bold text-base"
            style={{ color: "var(--color-midnight)" }}
          >
            Total
          </span>
          <span
            className="font-display font-bold"
            style={{
              fontSize: 32,
              color: "var(--color-summit)",
              lineHeight: 1,
            }}
          >
            {formatINR(base)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 ───────────────────────────────────────────────────────────────────
function Step1({
  state,
  onChange,
  preselectedTrek,
}: {
  state: Step1State;
  onChange: (p: Partial<Step1State>) => void;
  preselectedTrek: TrekOption | undefined;
}) {
  const trek = preselectedTrek ?? getTrekBySlug(state.trekSlug);
  const batches = useMemo(() => {
    if (!trek) return HARDCODED_BATCHES;
    return trek.batches.map(
      (b, _i): BatchRow => ({
        id: b.id,
        label: `${b.startDate} – ${b.endDate}`,
        duration: trek.duration,
        seats: b.seatsAvailable,
        price: b.price,
        status:
          b.seatsAvailable === 0
            ? "Full"
            : b.seatsAvailable <= 5
              ? "Limited"
              : "Available",
      }),
    );
  }, [trek]);

  const selectedBatch = batches.find((b) => b.id === state.selectedBatchId);

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="font-display font-bold text-3xl mb-1"
          style={{ color: "var(--color-midnight)" }}
        >
          Choose Your Trek & Dates
        </h2>
        <p className="font-ui text-sm" style={{ color: "#666" }}>
          Select your trek, pick a batch date, and set your group size.
        </p>
      </div>

      {/* Trek Selector */}
      {!preselectedTrek && (
        <div className="space-y-2">
          <p
            className="text-sm font-bold font-ui"
            style={{ color: "var(--color-midnight)" }}
          >
            Select Trek or Yatra
          </p>
          <TrekSelector
            value={state.trekSlug}
            onChange={(slug) =>
              onChange({ trekSlug: slug, selectedBatchId: "" })
            }
          />
          {trek && (
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge
                className="font-mono text-xs"
                style={{
                  background: "rgba(77,168,199,0.15)",
                  color: "var(--color-glacier)",
                }}
              >
                {trek.difficulty}
              </Badge>
              <Badge
                className="font-mono text-xs"
                style={{
                  background: "rgba(46,94,62,0.12)",
                  color: "var(--color-pine)",
                }}
              >
                {trek.altitude}
              </Badge>
              <Badge
                className="font-mono text-xs"
                style={{
                  background: "rgba(232,197,71,0.15)",
                  color: "#9e7c00",
                }}
              >
                from {formatINR(trek.basePrice)}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Preselected trek display */}
      {preselectedTrek && (
        <div
          className="rounded-2xl p-4 flex items-center gap-4"
          style={{
            background: "rgba(77,168,199,0.1)",
            border: "2px solid var(--color-glacier)",
          }}
        >
          <Mountain
            size={24}
            style={{ color: "var(--color-glacier)", flexShrink: 0 }}
          />
          <div className="min-w-0">
            <p
              className="font-display font-bold text-lg"
              style={{ color: "var(--color-midnight)" }}
            >
              {preselectedTrek.name}
            </p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(201,79,42,0.12)",
                  color: "var(--color-ember)",
                }}
              >
                {preselectedTrek.difficulty}
              </span>
              <span
                className="font-mono text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(46,94,62,0.1)",
                  color: "var(--color-pine)",
                }}
              >
                {preselectedTrek.altitude}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Batch Calendar */}
      <div className="space-y-3">
        <p
          className="text-sm font-bold font-ui"
          style={{ color: "var(--color-midnight)" }}
        >
          Select Batch Date
        </p>
        <BatchTable
          batches={batches}
          selectedId={state.selectedBatchId}
          onSelect={(id) => onChange({ selectedBatchId: id })}
        />
      </div>

      {/* Group Size */}
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{ background: "#fff", border: "2px solid var(--color-ash)" }}
      >
        <p
          className="text-sm font-bold font-ui"
          style={{ color: "var(--color-midnight)" }}
        >
          Number of Trekkers
        </p>
        <div className="flex items-center justify-between">
          <GroupStepper
            value={state.groupSize}
            onChange={(v) => onChange({ groupSize: v })}
          />
          <span
            className="font-mono text-sm"
            style={{ color: "var(--color-ash)" }}
          >
            max 15
          </span>
        </div>
      </div>

      {/* Accommodation */}
      <div className="space-y-3">
        <p
          className="text-sm font-bold font-ui"
          style={{ color: "var(--color-midnight)" }}
        >
          Accommodation Preference
        </p>
        <div className="flex flex-wrap gap-3" data-ocid="booking.accommodation">
          {ACCOMMODATION_OPTIONS.map((o) => (
            <button
              key={o.value}
              type="button"
              className="px-5 py-2.5 rounded-full font-ui font-semibold text-sm transition-all"
              style={{
                background:
                  state.accommodation === o.value
                    ? "var(--color-summit)"
                    : "#fff",
                color:
                  state.accommodation === o.value
                    ? "var(--color-midnight)"
                    : "#555",
                border: `2px solid ${state.accommodation === o.value ? "var(--color-summit)" : "var(--color-ash)"}`,
              }}
              onClick={() => onChange({ accommodation: o.value })}
              data-ocid={`booking.accommodation_${o.value}`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <PriceSummaryCard
        trek={trek}
        batch={selectedBatch}
        groupSize={state.groupSize}
        accommodation={state.accommodation}
      />
    </div>
  );
}

// ─── Trekker Form ─────────────────────────────────────────────────────────────
function TrekkerForm({
  data,
  onChange,
  index,
  onRemove,
  errors,
}: {
  data: CoTrekker | (Omit<CoTrekker, "id"> & { id?: undefined });
  onChange: (d: Partial<CoTrekker>) => void;
  index: number;
  onRemove?: () => void;
  errors?: Step2Errors;
}) {
  const fieldStyle = {
    base: "w-full border-0 border-b-2 bg-transparent pb-1 pt-0 font-ui text-sm outline-none transition-colors placeholder:text-gray-300",
    normal: "border-b-[var(--color-ash)]",
    error: "border-b-[var(--color-ember)]",
    label: "block text-xs font-bold mb-1 font-ui",
  };

  const F = ({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onVal,
    required,
    err,
  }: {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onVal: (v: string) => void;
    required?: boolean;
    err?: string;
  }) => (
    <div className="space-y-0.5">
      <label
        htmlFor={id}
        className={fieldStyle.label}
        style={{ color: "var(--color-midnight)" }}
      >
        {label}
        {required && <span style={{ color: "var(--color-ember)" }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onVal(e.target.value)}
        className={`${fieldStyle.base} ${err ? fieldStyle.error : fieldStyle.normal}`}
        style={{ color: "var(--color-midnight)" }}
        data-ocid={`booking.${id}`}
      />
      {err && (
        <p
          className="text-xs font-body italic"
          style={{ color: "var(--color-ember)" }}
        >
          {err}
        </p>
      )}
    </div>
  );

  return (
    <div
      className="rounded-2xl p-6 space-y-5 relative"
      style={{ background: "#fff", border: "2px solid var(--color-ash)" }}
    >
      {index > 0 && (
        <div className="flex items-center justify-between mb-1">
          <span
            className="font-bold font-ui text-sm"
            style={{ color: "var(--color-glacier)" }}
          >
            Co-trekker {index}
          </span>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{
                background: "rgba(201,79,42,0.1)",
                color: "var(--color-ember)",
              }}
              data-ocid={`booking.remove_cotrekker_${index}`}
              aria-label="Remove co-trekker"
            >
              <X size={14} />
            </button>
          )}
        </div>
      )}
      {index === 0 && (
        <p
          className="font-bold font-ui text-sm mb-2"
          style={{ color: "var(--color-midnight)" }}
        >
          Lead Trekker
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <F
            id={index === 0 ? "name" : `co_name_${index}`}
            label="Full Name"
            placeholder="Arjun Sharma"
            value={data.name}
            onVal={(v) => onChange({ name: v })}
            required
            err={index === 0 ? errors?.name : undefined}
          />
        </div>
        <F
          id={index === 0 ? "age" : `co_age_${index}`}
          label="Age"
          type="number"
          placeholder="28"
          value={data.age}
          onVal={(v) => onChange({ age: v })}
          required
          err={index === 0 ? errors?.age : undefined}
        />
        <F
          id={index === 0 ? "email" : `co_email_${index}`}
          label="Email Address"
          type="email"
          placeholder="arjun@gmail.com"
          value={data.email}
          onVal={(v) => onChange({ email: v })}
          required
          err={index === 0 ? errors?.email : undefined}
        />
        <F
          id={index === 0 ? "phone" : `co_phone_${index}`}
          label="Mobile / WhatsApp"
          type="tel"
          placeholder="98765 43210"
          value={data.phone}
          onVal={(v) => onChange({ phone: v.replace(/\D/g, "").slice(0, 10) })}
          required
          err={index === 0 ? errors?.phone : undefined}
        />
        {/* T-shirt size */}
        <div className="space-y-1.5">
          <p
            className={fieldStyle.label}
            style={{ color: "var(--color-midnight)" }}
          >
            T-Shirt Size
          </p>
          <div className="flex gap-2 flex-wrap">
            {TSHIRT_SIZES.map((s) => (
              <button
                key={s}
                type="button"
                className="w-10 h-9 rounded text-xs font-bold font-mono transition-all"
                style={{
                  background:
                    data.tshirtSize === s
                      ? "var(--color-glacier)"
                      : "transparent",
                  color:
                    data.tshirtSize === s ? "#fff" : "var(--color-midnight)",
                  border: `2px solid ${data.tshirtSize === s ? "var(--color-glacier)" : "var(--color-ash)"}`,
                }}
                onClick={() => onChange({ tshirtSize: s })}
                data-ocid={`booking.tshirt_${s.toLowerCase()}_${index}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        {/* Experience */}
        <div className="space-y-1.5">
          <label
            htmlFor="experience-select"
            className={fieldStyle.label}
            style={{ color: "var(--color-midnight)" }}
          >
            Trekking Experience
          </label>
          <div className="relative">
            <select
              id="experience-select"
              value={data.experience}
              onChange={(e) => onChange({ experience: e.target.value })}
              className="w-full border-0 border-b-2 bg-transparent py-1 font-ui text-sm appearance-none outline-none pr-6"
              style={{
                borderBottomColor: "var(--color-ash)",
                color: "var(--color-midnight)",
              }}
              data-ocid={`booking.experience_${index}`}
            >
              <option value="">Select level</option>
              {EXPERIENCE_OPTIONS.map((e) => (
                <option key={e} value={e}>
                  {e}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="absolute right-0 top-1.5 pointer-events-none"
              style={{ color: "var(--color-ash)" }}
            />
          </div>
        </div>
      </div>

      {/* Medical */}
      <div className="space-y-1.5">
        <label
          htmlFor="medical-textarea"
          className={fieldStyle.label}
          style={{ color: "var(--color-midnight)" }}
        >
          Medical Conditions (optional)
        </label>
        <textarea
          id="medical-textarea"
          rows={2}
          placeholder="Any allergies, medications, heart conditions, asthma..."
          value={data.medical}
          onChange={(e) => onChange({ medical: e.target.value })}
          className="w-full border-0 border-b-2 bg-transparent resize-none font-ui text-sm outline-none pt-0 pb-1 placeholder:text-gray-300"
          style={{
            borderBottomColor: "var(--color-ash)",
            color: "var(--color-midnight)",
          }}
          data-ocid={`booking.medical_${index}`}
        />
      </div>

      {/* Emergency (lead only) */}
      {index === 0 && (
        <div
          className="rounded-xl p-4 space-y-4"
          style={{
            background: "rgba(77,168,199,0.06)",
            border: "1px solid var(--color-glacier)",
          }}
        >
          <p
            className="text-xs font-bold font-ui"
            style={{ color: "var(--color-glacier)" }}
          >
            EMERGENCY CONTACT
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <F
              id="emergencyName"
              label="Contact Name"
              placeholder="Parent / Spouse"
              value={(data as Step2State).emergencyName ?? ""}
              onVal={(v) =>
                onChange({ emergencyName: v } as Partial<CoTrekker>)
              }
              required
              err={errors?.emergencyName}
            />
            <F
              id="emergencyPhone"
              label="Contact Phone"
              type="tel"
              placeholder="98765 43210"
              value={(data as Step2State).emergencyPhone ?? ""}
              onVal={(v) =>
                onChange({ emergencyPhone: v } as Partial<CoTrekker>)
              }
              required
              err={errors?.emergencyPhone}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 2 ───────────────────────────────────────────────────────────────────
function Step2({
  state,
  onChange,
  groupSize,
  errors,
}: {
  state: Step2State;
  onChange: (p: Partial<Step2State>) => void;
  groupSize: number;
  errors: Step2Errors;
}) {
  const addCoTrekker = () => {
    if (state.coTrekkers.length >= groupSize - 1) return;
    const newId = Date.now();
    onChange({
      coTrekkers: [
        ...state.coTrekkers,
        {
          id: newId,
          name: "",
          age: "",
          email: "",
          phone: "",
          tshirtSize: "M",
          experience: "",
          medical: "",
        },
      ],
    });
  };

  const removeCoTrekker = (id: number) => {
    onChange({ coTrekkers: state.coTrekkers.filter((c) => c.id !== id) });
  };

  const updateCoTrekker = (id: number, data: Partial<CoTrekker>) => {
    onChange({
      coTrekkers: state.coTrekkers.map((c) =>
        c.id === id ? { ...c, ...data } : c,
      ),
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="font-display font-bold text-3xl mb-1"
          style={{ color: "var(--color-midnight)" }}
        >
          Traveler Details
        </h2>
        <p className="font-ui text-sm" style={{ color: "#666" }}>
          Please fill in details for all trekkers in your group.
        </p>
      </div>

      {/* Lead trekker */}
      <TrekkerForm
        data={state}
        index={0}
        errors={errors}
        onChange={(d) => onChange(d as Partial<Step2State>)}
      />

      {/* Co-trekkers */}
      {state.coTrekkers.map((co, i) => (
        <TrekkerForm
          key={co.id}
          data={co}
          index={i + 1}
          onChange={(d) => updateCoTrekker(co.id, d as Partial<CoTrekker>)}
          onRemove={() => removeCoTrekker(co.id)}
        />
      ))}

      {state.coTrekkers.length < groupSize - 1 && (
        <button
          type="button"
          onClick={addCoTrekker}
          className="w-full py-3 rounded-2xl text-sm font-bold font-ui transition-all"
          style={{
            border: "2px dashed var(--color-ash)",
            background: "transparent",
            color: "var(--color-midnight)",
          }}
          data-ocid="booking.add_cotrekker"
        >
          + Add Co-trekker ({state.coTrekkers.length + 1} of {groupSize - 1}{" "}
          possible)
        </button>
      )}
    </div>
  );
}

// ─── Step 3 ───────────────────────────────────────────────────────────────────
function Step3({
  step1,
  step2,
  trek,
  batch,
  agreed,
  onAgree,
  promoCode,
  onPromoCode,
  promoApplied,
  onApplyPromo,
  payMethod,
  onPayMethod,
  discountPct,
}: {
  step1: Step1State;
  step2: Step2State;
  trek: TrekOption | undefined;
  batch: BatchRow | undefined;
  agreed: boolean;
  onAgree: (v: boolean) => void;
  promoCode: string;
  onPromoCode: (v: string) => void;
  promoApplied: "idle" | "valid" | "invalid";
  onApplyPromo: () => void;
  payMethod: string;
  onPayMethod: (m: string) => void;
  discountPct: number;
}) {
  const base = (batch?.price ?? 0) * step1.groupSize;
  const discount = Math.round(base * discountPct);
  const subtotal = base - discount;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const advance = Math.round(total * 0.1);
  const balance = total - advance;

  const trekkerNames = [
    step2.name,
    ...step2.coTrekkers.map((c) => c.name),
  ].filter(Boolean);

  return (
    <div className="space-y-8">
      <div>
        <h2
          className="font-display font-bold text-3xl mb-1"
          style={{ color: "var(--color-midnight)" }}
        >
          Review & Confirm
        </h2>
        <p className="font-ui text-sm" style={{ color: "#666" }}>
          Please review all details before confirming your booking.
        </p>
      </div>

      {/* Order Summary */}
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{ background: "#fff", border: "2px solid var(--color-ash)" }}
        data-ocid="booking.order_summary"
      >
        <h3
          className="font-bold font-ui"
          style={{ color: "var(--color-midnight)" }}
        >
          Trek Details
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm font-ui">
          {[
            ["Trek", trek?.name ?? step1.trekSlug],
            ["Dates", batch?.label ?? "—"],
            ["Duration", trek?.duration ?? batch?.duration ?? "—"],
            [
              "Group Size",
              `${step1.groupSize} trekker${step1.groupSize > 1 ? "s" : ""}`,
            ],
            ["Accommodation", step1.accommodation],
          ].map(([k, v]) => (
            <>
              <span key={`${k}-l`} style={{ color: "#888" }}>
                {k}
              </span>
              <span
                key={`${k}-v`}
                className="font-semibold"
                style={{ color: "var(--color-midnight)" }}
              >
                {v}
              </span>
            </>
          ))}
        </div>
        {trekkerNames.length > 0 && (
          <div
            className="pt-2 border-t"
            style={{ borderColor: "var(--color-ash)" }}
          >
            <p
              className="text-xs font-bold font-ui mb-1"
              style={{ color: "#888" }}
            >
              TREKKERS
            </p>
            <div className="flex flex-wrap gap-2">
              {trekkerNames.map((name) => (
                <span
                  key={name}
                  className="px-3 py-1 rounded-full text-xs font-ui"
                  style={{
                    background: "rgba(77,168,199,0.12)",
                    color: "var(--color-glacier)",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "#fff", border: "2px solid var(--color-ash)" }}
        data-ocid="booking.price_breakdown"
      >
        <h3
          className="font-bold font-ui mb-4"
          style={{ color: "var(--color-midnight)" }}
        >
          Price Breakdown
        </h3>
        <div className="space-y-2 text-sm font-ui">
          <div className="flex justify-between">
            <span style={{ color: "#888" }}>
              Base cost ({step1.groupSize} × {formatINR(batch?.price ?? 0)})
            </span>
            <span>{formatINR(base)}</span>
          </div>
          {discount > 0 && (
            <div
              className="flex justify-between"
              style={{ color: "var(--color-pine)" }}
            >
              <span>Promo discount (10%)</span>
              <span>− {formatINR(discount)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span style={{ color: "#888" }}>Sub-total</span>
            <span>{formatINR(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#888" }}>GST (5% adventure activities)</span>
            <span>{formatINR(gst)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-base">
            <span style={{ color: "var(--color-midnight)" }}>Total</span>
            <span
              className="font-display"
              style={{ color: "var(--color-summit)", fontSize: 24 }}
            >
              {formatINR(total)}
            </span>
          </div>
          <div
            className="text-xs rounded-xl p-3 mt-2"
            style={{ background: "rgba(232,197,71,0.1)", color: "#7a6000" }}
          >
            Only <strong>{formatINR(advance)}</strong> advance required now ·
            Balance <strong>{formatINR(balance)}</strong> due 30 days before
            trek
          </div>
        </div>
      </div>

      {/* Promo Code */}
      <div className="space-y-2" data-ocid="booking.promo_section">
        <label
          htmlFor="promo-code-input"
          className="text-sm font-bold font-ui"
          style={{ color: "var(--color-midnight)" }}
        >
          Promo Code
        </label>
        <div className="flex gap-2">
          <input
            id="promo-code-input"
            type="text"
            placeholder="Enter promo code"
            value={promoCode}
            onChange={(e) => onPromoCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 font-mono text-sm outline-none transition-colors"
            style={{
              borderColor:
                promoApplied === "valid"
                  ? "var(--color-pine)"
                  : promoApplied === "invalid"
                    ? "var(--color-ember)"
                    : "var(--color-ash)",
              background: "#fff",
              color: "var(--color-midnight)",
            }}
            data-ocid="booking.promo_input"
          />
          <button
            type="button"
            onClick={onApplyPromo}
            className="px-5 py-2.5 rounded-xl text-sm font-bold font-ui transition-all"
            style={{
              background: "var(--color-glacier)",
              color: "#fff",
              borderRadius: 4,
            }}
            data-ocid="booking.promo_apply"
          >
            Apply
          </button>
        </div>
        {promoApplied === "invalid" && (
          <p
            className="text-xs font-body italic"
            style={{ color: "var(--color-ember)" }}
          >
            Invalid promo code. Try HIMALAYA10 for 10% off.
          </p>
        )}
        {promoApplied === "valid" && (
          <p
            className="text-xs font-body italic"
            style={{ color: "var(--color-pine)" }}
          >
            ✓ HIMALAYA10 applied — 10% discount!
          </p>
        )}
      </div>

      {/* Payment Methods */}
      <div className="space-y-3" data-ocid="booking.payment_methods">
        <h3
          className="font-bold font-ui"
          style={{ color: "var(--color-midnight)" }}
        >
          Payment Options
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              className="p-4 rounded-2xl text-sm font-semibold font-ui transition-all text-left"
              style={{
                background:
                  payMethod === m.id ? "rgba(77,168,199,0.15)" : "#fff",
                border: `2px solid ${payMethod === m.id ? "var(--color-glacier)" : "var(--color-ash)"}`,
                color: "var(--color-midnight)",
              }}
              onClick={() => onPayMethod(m.id)}
              data-ocid={`booking.payment_${m.id}`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div
          className="rounded-xl p-4 text-sm font-ui"
          style={{ background: "rgba(10,14,26,0.06)", color: "#444" }}
        >
          <p
            className="font-bold mb-1"
            style={{ color: "var(--color-midnight)" }}
          >
            Payment gateway integration coming soon.
          </p>
          <p>
            Click <strong>Confirm</strong> to reserve your spot with ₹0 deposit
            — our team will call you within 24 hours to finalize payment.
          </p>
        </div>
      </div>

      {/* Terms */}
      <div
        className="flex items-start gap-3 p-4 rounded-2xl"
        style={{ background: "#fff", border: "2px solid var(--color-ash)" }}
        data-ocid="booking.terms_checkbox"
      >
        <Checkbox
          id="terms"
          checked={agreed}
          onCheckedChange={(v) => onAgree(v === true)}
          className="mt-0.5 flex-shrink-0"
        />
        <Label
          htmlFor="terms"
          className="text-sm font-normal cursor-pointer leading-relaxed font-ui"
          style={{ color: "#444" }}
        >
          I agree to TrekRoot's{" "}
          <a
            href="/terms"
            className="underline"
            style={{ color: "var(--color-glacier)" }}
          >
            Terms & Conditions
          </a>
          ,{" "}
          <a
            href="/cancellation"
            className="underline"
            style={{ color: "var(--color-glacier)" }}
          >
            Cancellation Policy
          </a>
          , and understand the risks of high-altitude trekking.
        </Label>
      </div>
    </div>
  );
}

// ─── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({
  bookingRef,
  trekName,
  batchLabel,
  total,
  startDate,
}: {
  bookingRef: string;
  trekName: string;
  batchLabel: string;
  total: number;
  startDate: string;
}) {
  const downloadICS = () => {
    const dt = startDate.replace(/-/g, "");
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//TrekRoot//EN",
      "BEGIN:VEVENT",
      `UID:${bookingRef}@trekroot.in`,
      `DTSTART:${dt}`,
      `SUMMARY:${trekName} — TrekRoot`,
      `DESCRIPTION:Booking Reference: ${bookingRef}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${trekName.replace(/\s+/g, "-")}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const waMessage = encodeURIComponent(
    `Hi TrekRoot! My booking ref is ${bookingRef} for ${trekName}. Please help me.`,
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ background: "var(--color-snow)" }}
      data-ocid="booking.success_screen"
    >
      <div className="w-full max-w-lg text-center">
        {/* Animated checkmark */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{
            background: "var(--color-summit)",
            animation: "scaleIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          <CheckCircle2 size={40} style={{ color: "var(--color-midnight)" }} />
        </div>

        <h1
          className="font-display font-bold mb-3"
          style={{
            fontSize: 40,
            color: "var(--color-midnight)",
            lineHeight: 1.15,
          }}
        >
          Booking Request Submitted!
        </h1>

        <p
          className="font-mono text-lg mb-6"
          style={{ color: "var(--color-summit)", letterSpacing: "0.05em" }}
          data-ocid="booking.reference_code"
        >
          {bookingRef}
        </p>

        <p className="font-ui text-base mb-8" style={{ color: "#555" }}>
          Our trek coordinator will call you <strong>within 24 hours</strong> to
          confirm your spot and share payment details.
        </p>

        {/* Details recap */}
        <div
          className="rounded-2xl p-5 mb-8 text-left space-y-2"
          style={{ background: "#fff", border: "2px solid var(--color-ash)" }}
        >
          <div className="flex justify-between text-sm font-ui">
            <span style={{ color: "#888" }}>Trek</span>
            <span
              className="font-semibold"
              style={{ color: "var(--color-midnight)" }}
            >
              {trekName}
            </span>
          </div>
          <div className="flex justify-between text-sm font-ui">
            <span style={{ color: "#888" }}>Dates</span>
            <span
              className="font-semibold"
              style={{ color: "var(--color-midnight)" }}
            >
              {batchLabel}
            </span>
          </div>
          <div className="flex justify-between text-sm font-ui">
            <span style={{ color: "#888" }}>Estimated Total</span>
            <span
              className="font-bold font-display"
              style={{ color: "var(--color-summit)", fontSize: 20 }}
            >
              {formatINR(total)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            type="button"
            onClick={downloadICS}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded font-bold font-ui text-sm transition-all"
            style={{
              background: "var(--color-summit)",
              color: "var(--color-midnight)",
              borderRadius: 4,
            }}
            data-ocid="booking.add_calendar_button"
          >
            <CalendarPlus size={18} /> Add to Calendar
          </button>
          <a
            href={`https://wa.me/919876543210?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 rounded font-bold font-ui text-sm transition-all"
            style={{ background: "#25D366", color: "#fff", borderRadius: 4 }}
            data-ocid="booking.whatsapp_button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp Us
          </a>
        </div>

        <a
          href="/"
          className="font-ui text-sm underline"
          style={{ color: "var(--color-glacier)" }}
          data-ocid="booking.back_to_home"
        >
          ← Back to Home
        </a>
      </div>

      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function BookingWizardPage() {
  // Read trek from URL query param
  const urlParams = new URLSearchParams(window.location.search);
  const trekParam = urlParams.get("trek") ?? "";
  const preselectedTrek = trekParam ? getTrekBySlug(trekParam) : undefined;

  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingRef] = useState(() => genRef());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Step 1 state
  const [step1, setStep1] = useState<Step1State>({
    trekSlug: trekParam,
    selectedBatchId: "",
    groupSize: 1,
    accommodation: "camping",
  });

  // Step 2 state
  const [step2, setStep2] = useState<Step2State>({
    name: "",
    age: "",
    email: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    tshirtSize: "M",
    medical: "",
    experience: "",
    coTrekkers: [],
  });
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});

  // Step 3 state
  const [agreed, setAgreed] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState<
    "idle" | "valid" | "invalid"
  >("idle");
  const [discountPct, setDiscountPct] = useState(0);
  const [payMethod, setPayMethod] = useState("upi");

  const trek = preselectedTrek ?? getTrekBySlug(step1.trekSlug);
  const batches: BatchRow[] = useMemo(() => {
    if (!trek) return HARDCODED_BATCHES;
    return trek.batches.map((b) => ({
      id: b.id,
      label: `${b.startDate} – ${b.endDate}`,
      duration: trek.duration,
      seats: b.seatsAvailable,
      price: b.price,
      status: (b.seatsAvailable === 0
        ? "Full"
        : b.seatsAvailable <= 5
          ? "Limited"
          : "Available") as "Available" | "Limited" | "Full",
    }));
  }, [trek]);
  const selectedBatch = batches.find((b) => b.id === step1.selectedBatchId);
  const base = (selectedBatch?.price ?? 0) * step1.groupSize;
  const discount = Math.round(base * discountPct);
  const gst = Math.round((base - discount) * 0.05);
  const total = base - discount + gst;

  const scrollTop = useCallback(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goNext = useCallback(() => {
    if (step === 1) {
      if (!step1.trekSlug && !preselectedTrek) {
        alert("Please select a trek.");
        return;
      }
      if (!step1.selectedBatchId) {
        alert("Please select a batch date.");
        return;
      }
    }
    if (step === 2) {
      const errs: Step2Errors = {};
      if (!step2.name.trim()) errs.name = "Full name is required";
      const ageNum = Number.parseInt(step2.age);
      if (!step2.age || ageNum < 12 || ageNum > 75)
        errs.age = "Age must be between 12 and 75";
      if (
        !step2.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(step2.email)
      )
        errs.email = "Valid email required";
      if (!step2.phone || step2.phone.length !== 10)
        errs.phone = "Enter a valid 10-digit mobile number";
      if (!step2.emergencyName.trim())
        errs.emergencyName = "Emergency contact name required";
      if (!step2.emergencyPhone.trim())
        errs.emergencyPhone = "Emergency contact phone required";
      setStep2Errors(errs);
      if (Object.keys(errs).length > 0) return;
    }
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((s) => Math.min(s + 1, 3));
      setIsTransitioning(false);
      scrollTop();
    }, 150);
  }, [step, step1, step2, preselectedTrek, scrollTop]);

  const goBack = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setStep((s) => Math.max(s - 1, 1));
      setIsTransitioning(false);
      scrollTop();
    }, 150);
  }, [scrollTop]);

  const handleApplyPromo = () => {
    if (promoCode === "HIMALAYA10") {
      setPromoApplied("valid");
      setDiscountPct(0.1);
    } else {
      setPromoApplied("invalid");
      setDiscountPct(0);
    }
  };

  const handleSubmit = () => {
    if (!agreed) return;
    setConfirmed(true);
    scrollTop();
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  };

  if (confirmed) {
    return (
      <SuccessScreen
        bookingRef={bookingRef}
        trekName={trek?.name ?? step1.trekSlug ?? "Himalayan Trek"}
        batchLabel={selectedBatch?.label ?? ""}
        total={total}
        startDate={selectedBatch?.label.split(" – ")[0] ?? "2025-06-15"}
      />
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-snow)" }}
      ref={topRef}
    >
      <Navigation />

      {/* Sticky header with progress */}
      <div
        className="sticky top-0 z-40 shadow-sm"
        style={{
          background: "var(--color-snow)",
          borderBottom: "2px solid var(--color-ash)",
        }}
      >
        <div className="container-max py-5">
          <div className="flex items-center gap-4 mb-5">
            <a
              href="/"
              className="text-sm font-ui"
              style={{ color: "var(--color-glacier)" }}
            >
              ← Home
            </a>
            <h1
              className="font-display font-bold text-xl"
              style={{ color: "var(--color-midnight)" }}
            >
              Book Your Trek
            </h1>
            {trek && (
              <span
                className="ml-auto text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background: "rgba(77,168,199,0.15)",
                  color: "var(--color-glacier)",
                }}
              >
                {trek.name}
              </span>
            )}
          </div>
          <ProgressBar step={step} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div
          className="container-max py-10"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          <div className="max-w-3xl mx-auto">
            {step === 1 && (
              <Step1
                state={step1}
                onChange={(p) => setStep1((s) => ({ ...s, ...p }))}
                preselectedTrek={preselectedTrek}
              />
            )}
            {step === 2 && (
              <Step2
                state={step2}
                onChange={(p) => setStep2((s) => ({ ...s, ...p }))}
                groupSize={step1.groupSize}
                errors={step2Errors}
              />
            )}
            {step === 3 && (
              <Step3
                step1={step1}
                step2={step2}
                trek={trek}
                batch={selectedBatch}
                agreed={agreed}
                onAgree={setAgreed}
                promoCode={promoCode}
                onPromoCode={setPromoCode}
                promoApplied={promoApplied}
                onApplyPromo={handleApplyPromo}
                payMethod={payMethod}
                onPayMethod={setPayMethod}
                discountPct={discountPct}
              />
            )}

            {/* Navigation buttons */}
            <div className="flex gap-4 mt-10 pb-10">
              {step > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="px-6 py-4 rounded font-bold font-ui text-sm transition-all"
                  style={{
                    background: "transparent",
                    border: "2px solid var(--color-ash)",
                    color: "var(--color-midnight)",
                    borderRadius: 4,
                  }}
                  data-ocid="booking.back_button"
                >
                  ← Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex-1 py-4 rounded font-bold font-ui text-base transition-all shimmer-btn"
                  style={{
                    background: "var(--color-summit)",
                    color: "var(--color-midnight)",
                    borderRadius: 4,
                  }}
                  data-ocid="booking.continue_button"
                >
                  {step === 1
                    ? "Continue to Traveler Details →"
                    : "Continue to Review →"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!agreed}
                  className="flex-1 py-5 rounded font-bold font-ui text-lg transition-all"
                  style={{
                    background: agreed
                      ? "var(--color-summit)"
                      : "var(--color-ash)",
                    color: agreed ? "var(--color-midnight)" : "#999",
                    borderRadius: 4,
                    cursor: agreed ? "pointer" : "not-allowed",
                  }}
                  data-ocid="booking.confirm_button"
                >
                  Confirm My Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Simple footer */}
      <footer
        className="py-8 text-center"
        style={{
          background: "var(--color-midnight)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <p className="font-ui text-sm" style={{ color: "var(--color-ash)" }}>
          © {new Date().getFullYear()} TrekRoot — Raturi Brothers Enterprise,
          Dehradun.{" "}
          <a
            href="https://caffeine.ai"
            className="underline"
            style={{ color: "var(--color-glacier)" }}
          >
            Built with caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
