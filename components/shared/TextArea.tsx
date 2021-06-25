import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label?: string;
}

export default forwardRef<HTMLTextAreaElement, Props>(function TextArea(
  { label, ...restOfProps },
  ref
) {
  return (
    <div className="mt-5">
      <label className="block text-xs mb-1" htmlFor={restOfProps.id}>
        {label}
      </label>
      <textarea
        className="border-2 p-2 rounded border-gray-300 focus:outline-none focus:border-yellow-800 w-full transition-colors ease-in-out duration-200"
        ref={ref}
        {...restOfProps}
      />
    </div>
  );
});
