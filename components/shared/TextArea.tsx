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
        className="border-b-2 border-gray-300 focus:outline-none focus:border-yellow-800 w-full"
        ref={ref}
        {...restOfProps}
      />
    </div>
  );
});
