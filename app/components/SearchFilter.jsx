"use client";
export default function FilterInput({ label, placeholder, value, onChange }) {
  return (
    <div className="mb-6 text-center">
      <label className="block text-black dark:text-white mb-2 font-bold">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="px-4 py-2 rounded-xl border w-full text-black dark:text-black"
      />
    </div>
  );
}
