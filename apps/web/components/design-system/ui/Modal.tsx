'use client';
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
};

export default function Modal({ open, onClose, title, description, children, size = 'md', footer }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`
          relative w-full ${sizeStyles[size]}
          surface-glass-elevated rounded-[18px] shadow-modal
          scale-in border border-border
        `}
      >
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-primary opacity-50 rounded-t-[18px]" />

        {/* Header */}
        {(title || description) && (
          <div className="px-6 pt-6 pb-4 border-b border-border">
            {title && (
              <h2 id="modal-title" className="text-lg font-700 text-foreground">{title}</h2>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-[8px] text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition-all"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Body */}
        <div className="px-6 py-5">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-0 flex items-center justify-end gap-3 border-t border-border">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}