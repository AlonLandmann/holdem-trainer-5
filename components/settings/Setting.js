export default function Setting({ label, condition = true, children }) {
  return !condition ? null : (
    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 min-h-[43px]">
      <label className="sm:min-w-56 text-neutral-400">
        {label}
      </label>
      {children}
    </div>
  );
};