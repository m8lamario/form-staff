import { legalReviewDone } from "@/lib/legal";
import type { ReactNode } from "react";

export function LegalReviewNote({
  children,
  block = false,
}: {
  children: ReactNode;
  block?: boolean;
}) {
  if (legalReviewDone()) return null;
  return <PolicyTodo block={block}>{children}</PolicyTodo>;
}

export function PolicyTodo({
  children,
  block = false,
}: {
  children: ReactNode;
  block?: boolean;
}) {
  if (block) {
    return (
      <span className="mt-2 block rounded-md bg-mint/20 px-2 py-1 font-medium text-mint">
        {children}
      </span>
    );
  }
  return (
    <mark className="rounded-sm bg-mint/20 px-1 font-medium text-mint not-italic">
      {children}
    </mark>
  );
}
