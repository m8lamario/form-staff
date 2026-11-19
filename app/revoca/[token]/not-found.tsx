import { TokenState } from "@/components/TokenState";

export default function RevokeNotFound() {
  return (
    <TokenState
      title="Link non utilizzabile"
      message="Questo link non è valido, è già stato usato oppure è scaduto."
    />
  );
}