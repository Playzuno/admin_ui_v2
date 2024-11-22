import React from 'react';

const PermissionCheckbox = ({ permission, onChange }) => {
  if (!permission) return null;
  const indentClass = `indent-level-${permission.level}`;

  return (
    <div className={`${indentClass} d-flex align-items-center my-2`}>
      <input
        type="checkbox"
        id={permission.title}
        checked={permission.active}
        onChange={e => onChange(e.target.checked)}
      />
      <label className="mb-0 pl-2" htmlFor={permission.title}>
        {permission.title}
      </label>
    </div>
  );
};

export default PermissionCheckbox;
