import React from 'react';

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  level?: number;
  isMainItem?: boolean;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({
  id,
  label,
  checked,
  onChange,
  level = 2,
  isMainItem = false,
}) => {
  const indentClass = `indent-level-${level}`;

  return (
    <div className={`custom-control custom-checkbox ${indentClass}`}>
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        className={`custom-control-label ${isMainItem ? 'main-checkbox' : ''}`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default CheckboxItem;