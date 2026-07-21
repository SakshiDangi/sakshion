'use client';
import React from 'react';
import { Toaster } from 'sonner';

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      theme="dark"
      toastOptions={{
        style: {
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        },
        classNames: {
          success: 'border-success/30',
          error: 'border-danger/30',
          warning: 'border-warning/30',
          info: 'border-primary/30',
        },
      }}
      closeButton
      richColors
    />
  );
}