export function RoleItem({ role, action, handleRoleClick, selectedRole }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded hover-cursor-pointer"
      onClick={() => handleRoleClick(role)}
    >
      <label className="d-flex align-items-center m-0">
        <input
          type="radio"
          name="role"
          className="mr-2"
          checked={selectedRole?.roleKey === role.roleKey}
        />
        <span>{role.displayName}</span>
      </label>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={`switch-${role.roleKey}`}
          checked={role.group !== 'inactive'}
          readOnly
          onChange={() => action(role)}
        />
        <label className="custom-control-label" htmlFor={`switch-${role.roleKey}`}></label>
      </div>
    </div>
  );
}
