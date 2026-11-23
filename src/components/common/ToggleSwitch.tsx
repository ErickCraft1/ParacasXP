import { useState } from "react";

interface ToggleSwitchProps {
  defaultChecked?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

function ToggleSwitch({
  defaultChecked = false,
  label,
  onChange,
}: ToggleSwitchProps) {
  const [checked, setChecked] = useState(defaultChecked);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={toggle}
      className={`relative h-6 w-11 shrink-0 rounded-full border border-[#111] transition-colors ${
        checked ? "bg-[#4b8eb7]" : "bg-white"
      }`}
    >
      <span
        className={`absolute top-[2px] h-[18px] w-[18px] rounded-full transition-all ${
          checked ? "left-[22px] bg-white" : "left-[2px] bg-[#555]"
        }`}
      />
    </button>
  );
}

export default ToggleSwitch;
