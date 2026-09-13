import type { ReactNode } from "react";
import { Check, Pencil, X } from "lucide-react";

interface EditableFieldProps {
  label: string;
  icon?: ReactNode;
  displayValue: string;
  draft: string;
  onDraftChange: (value: string) => void;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  inputType?: string;

  options?: { value: string; label: string }[];
  uppercase?: boolean;

  large?: boolean;
}

export function EditableField({
  label,
  icon,
  displayValue,
  draft,
  onDraftChange,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  inputType = "text",
  options,
  uppercase,
  large,
}: EditableFieldProps) {
  const valueClass = large
    ? "mt-2 truncate text-lg font-black uppercase text-text-950"
    : "mt-1 truncate text-sm font-bold text-text-950";
  const controlClass = large
    ? "mt-2 h-8 w-full border-2 border-black bg-background px-2 text-lg font-black uppercase text-text-950 outline-none"
    : "mt-1 h-8 w-full border-2 border-black bg-background px-2 text-sm font-bold text-text-950 outline-none";
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-between gap-2 text-primary">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-xs font-black uppercase">{label}</span>
        </div>
        {isEditing ? (
          <div className="flex gap-1">
            <Check
              size={16}
              strokeWidth={3}
              className="cursor-pointer text-success"
              onClick={onSave}
            />
            <X
              size={16}
              strokeWidth={3}
              className="cursor-pointer text-error"
              onClick={onCancel}
            />
          </div>
        ) : (
          <Pencil
            size={14}
            strokeWidth={3}
            className="shrink-0 cursor-pointer"
            onClick={onEdit}
          />
        )}
      </div>
      {isEditing ? (
        options ? (
          <select
            autoFocus
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            className={controlClass}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            autoFocus
            type={inputType}
            value={draft}
            onChange={(e) =>
              onDraftChange(
                uppercase ? e.target.value.toUpperCase() : e.target.value,
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
              if (e.key === "Escape") onCancel();
            }}
            className={controlClass}
          />
        )
      ) : (
        <p className={valueClass}>{displayValue}</p>
      )}
    </div>
  );
}
