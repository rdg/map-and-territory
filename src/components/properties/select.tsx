import React from 'react';
import { cn } from '@/lib/utils';

export interface Option<T extends string | number = string> {
  value: T;
  label: string;
}

export interface SelectFieldProps<T extends string | number = string> {
  id?: string;
  label?: string;
  value: T;
  options: ReadonlyArray<Option<T>>;
  onChange?: (value: T) => void;
  placeholder?: string;
  readOnly?: boolean; // when true, disabled and no change callbacks
  className?: string;
}

export function SelectField<T extends string | number = string>({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
  readOnly,
  className,
}: SelectFieldProps<T>) {
  const selectId = id ?? React.useId();

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label ? (
        <label htmlFor={selectId} className="text-xs text-foreground">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={cn(
          'h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        value={String(value)}
        onChange={readOnly ? undefined : (e) => {
          const v = options.find(o => String(o.value) === e.target.value)?.value;
          if (v !== undefined && onChange) onChange(v as T);
        }}
        disabled={!!readOnly}
      >
        {placeholder ? <option value="" disabled hidden>{placeholder}</option> : null}
        {options.map((o) => (
          <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;

