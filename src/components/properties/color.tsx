import React from 'react';
import { cn } from '@/lib/utils';

export interface ColorFieldProps {
  id?: string;
  label?: string;
  value: string; // e.g. #RRGGBB or #RRGGBBAA
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
}

export const ColorField: React.FC<ColorFieldProps> = ({ id, label, value, onChange, readOnly, className }) => {
  const inputId = id ?? React.useId();
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label ? (
        <label htmlFor={inputId} className="text-xs text-foreground">{label}</label>
      ) : null}
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="color"
          value={value}
          onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
          disabled={!!readOnly}
          className={cn('h-9 w-9 p-0 border border-input rounded-md bg-transparent disabled:opacity-50 disabled:cursor-not-allowed')}
          aria-label={label}
        />
        <input
          type="text"
          value={value}
          onChange={readOnly ? undefined : (e) => onChange?.(e.target.value)}
          disabled={!!readOnly}
          className={cn('h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none disabled:opacity-50 disabled:cursor-not-allowed')}
          aria-label={label ? `${label} hex` : 'Color hex'}
        />
      </div>
    </div>
  );
};

export default ColorField;

