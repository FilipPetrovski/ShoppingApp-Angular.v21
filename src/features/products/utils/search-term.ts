import { Signal, signal, effect } from '@angular/core';

export function debouncedSignal<T>(source: Signal<T>, delay = 300): Signal<T> {
  const debounced = signal(source());
  effect((onCleanup) => {
    const value = source();
    const timeout = setTimeout(() => debounced.set(value), delay);
    onCleanup(() => clearTimeout(timeout));
  });
  return debounced;
}
