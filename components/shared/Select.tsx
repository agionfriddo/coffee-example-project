import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";
import { UseFormRegister } from "react-hook-form";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string;
}

export default forwardRef<HTMLSelectElement, Props>(function Select(
  { label, children, ...restOfProps },
  ref
) {
  return (
    <div className="mt-5">
      <label className="block text-xs mb-1" htmlFor={restOfProps.id}>
        {label}
      </label>
      <select
        ref={ref}
        className="border-b-2 border-gray-300 focus:outline-none focus:border-yellow-800 w-full transition-colors ease-in-out duration-200"
        {...restOfProps}
      >
        {children}
      </select>
    </div>
  );
});
