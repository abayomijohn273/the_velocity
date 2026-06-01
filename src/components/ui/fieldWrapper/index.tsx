interface FieldWrapperProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

/** Consistent label + control + error layout shared by all form fields. */
const FieldWrapper = ({ label, htmlFor, error, hint, children }: FieldWrapperProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="text-sm font-semibold text-black">
          {label}
        </label>
      )}
      {children}
      {error ? (
        <span className="text-xs font-medium text-red-500">{error}</span>
      ) : hint ? (
        <span className="text-xs text-gray-400">{hint}</span>
      ) : null}
    </div>
  );
};

export default FieldWrapper;
