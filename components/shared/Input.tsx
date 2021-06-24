import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}

export default forwardRef<HTMLInputElement, Props>(function Input(
  { label, ...restOfProps },
  ref
) {
  return (
    <div className="mt-5">
      <label className="block text-xs mb-1" htmlFor={restOfProps.id}>
        {label}
      </label>
      <input
        ref={ref}
        className="border-b-2 border-gray-300 focus:outline-none focus:border-yellow-800 w-full"
        {...restOfProps}
      />
    </div>
  );
});
