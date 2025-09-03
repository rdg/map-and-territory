"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type DialogKind = 'alert' | 'confirm' | 'prompt';

interface BaseOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
}

interface PromptOptions extends BaseOptions {
  placeholder?: string;
  defaultValue?: string;
  validate?: (value: string) => string | null; // return error message or null
}

export interface DialogAPI {
  alert(opts: BaseOptions): Promise<void>;
  confirm(opts: BaseOptions): Promise<boolean>;
  prompt(opts: PromptOptions): Promise<string | null>;
}

const DialogContext = createContext<DialogAPI | null>(null);

export const useDialog = (): DialogAPI => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used within DialogProvider');
  return ctx;
};

type PendingState =
  | { kind: 'idle' }
  | { kind: 'alert' | 'confirm'; opts: BaseOptions; resolve: (v: unknown) => void }
  | { kind: 'prompt'; opts: PromptOptions; resolve: (v: unknown) => void };

export const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PendingState>({ kind: 'idle' });
  const [promptValue, setPromptValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const open = useCallback(<K extends DialogKind, T extends unknown>(kind: K, opts: any): Promise<T> => {
    return new Promise<T>((resolve) => {
      setError(null);
      if (kind === 'prompt') setPromptValue(opts?.defaultValue ?? '');
      setState({ kind: kind as any, opts, resolve });
    });
  }, []);

  const api: DialogAPI = useMemo(() => ({
    alert: (opts) => open('alert', opts) as Promise<void>,
    confirm: (opts) => open('confirm', opts) as Promise<boolean>,
    prompt: (opts) => open('prompt', opts) as Promise<string | null>,
  }), [open]);

  const onClose = () => setState({ kind: 'idle' });

  const onConfirm = () => {
    if (state.kind === 'prompt') {
      const v = promptValue;
      const msg = state.opts.validate?.(v) ?? null;
      if (msg) { setError(msg); return; }
      // resolve value (string), close
      state.resolve(v);
    } else if (state.kind === 'confirm') {
      state.resolve(true);
    } else if (state.kind === 'alert') {
      state.resolve(undefined);
    }
    onClose();
  };

  const onCancel = () => {
    if (state.kind === 'confirm') state.resolve(false);
    if (state.kind === 'prompt') state.resolve(null);
    onClose();
  };

  const openBool = state.kind !== 'idle';
  const title = (state as any).opts?.title ?? (state.kind === 'alert' ? 'Notice' : state.kind === 'confirm' ? 'Confirm' : 'Input');
  const desc = (state as any).opts?.description as string | undefined;
  const confirmText = (state as any).opts?.confirmText ?? (state.kind === 'alert' ? 'OK' : 'Confirm');
  const cancelText = (state as any).opts?.cancelText ?? 'Cancel';

  return (
    <DialogContext.Provider value={api}>
      {children}
      <Dialog open={openBool} onOpenChange={(o) => { if (!o) onCancel(); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {desc ? <DialogDescription>{desc}</DialogDescription> : null}
          </DialogHeader>
          {state.kind === 'prompt' ? (
            <div className="mt-2">
              <Input
                placeholder={(state.opts as PromptOptions).placeholder}
                value={promptValue}
                autoFocus
                onChange={(e) => setPromptValue(e.target.value)}
              />
              {error ? <div className="mt-1 text-xs text-destructive">{error}</div> : null}
            </div>
          ) : null}
          <DialogFooter>
            {state.kind !== 'alert' ? (
              <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>
            ) : null}
            <Button onClick={onConfirm}>{confirmText}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

export default DialogProvider;

