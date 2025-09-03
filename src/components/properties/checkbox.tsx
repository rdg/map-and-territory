import React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxFieldProps {
  id?: string;
  label?: string;
  value: boolean;
  onChange?: (checked: boolean) => void;
  readOnly?: boolean;
  className?: string;
  description?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  id,
  label,
  value,
  onChange,
  readOnly,
  className,
  description,
}) => {
  const inputId = id ?? React.useId();
  const disabled = !!readOnly;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label htmlFor={inputId} className={cn('flex items-center gap-2 cursor-pointer', disabled && 'opacity-60 cursor-not-allowed')}>
        <input
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          checked={!!value}
          onChange={disabled ? undefined : (e) => onChange?.(e.target.checked)}
          disabled={disabled}
        />
        <span
          aria-hidden
          className={cn(
            'h-4 w-4 rounded-sm border border-input bg-background shadow-xs transition-colors',
            'grid place-items-center',
            'peer-focus-visible:outline-none peer-focus-visible:ring-[3px] peer-focus-visible:ring-ring/50',
            'peer-checked:bg-primary peer-checked:border-primary'
          )}
        >
          {/* checkmark */}
          <svg
            className={cn('h-3 w-3 text-primary-foreground opacity-0 transition-opacity', value && 'opacity-100')}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
        {label ? <span className="text-sm text-foreground select-none">{label}</span> : null}
      </label>
      {description ? <div className="text-[11px] text-muted-foreground ml-6">{description}</div> : null}
    </div>
  );
};

export default CheckboxField;

