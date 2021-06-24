import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError;
  label?: string;
}

export default function FormError({ error, label = "This input" }: Props) {
  if (!error) return null;
  return (
    <>
      {error.type === "required" && (
        <p className="text-xs text-red-500">{label} is required.</p>
      )}
      {error.type === "pattern" && (
        <p className="text-xs text-red-500">
          Please check the pattern of {label}
        </p>
      )}
      {error.message && <p className="text-xs text-red-500">{error.message}</p>}
    </>
  );
}
