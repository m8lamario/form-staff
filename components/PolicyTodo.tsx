import type { ReactNode } from "react";

export function PolicyTodo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-sm bg-mint/20 px-1 font-medium text-mint not-italic">
      {children}
    </mark>
  );
}
