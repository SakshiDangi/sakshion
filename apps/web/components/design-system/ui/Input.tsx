'use client';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  onRightIconClick,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-500 text-foreground mb-1.5"
        >
          {label}
          {props.required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full bg-input border rounded-[10px] px-3 py-2.5 text-sm text-foreground
            placeholder:text-muted-foreground
            outline-none transition-all duration-150
            ${error
              ? 'border-danger/50 focus:border-danger focus:shadow-glow-danger'
              : 'border-border focus:border-primary/50 focus:shadow-glow-primary'
            }
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {rightIcon}
          </button>
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && (
        <p className="mt-1.5 text-xs text-danger" role="alert">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;