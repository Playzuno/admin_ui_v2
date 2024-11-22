export function RoleItem({ role, action, handleRoleClick, selectedRole }) {
  return (
    <div
      className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded hover-cursor-pointer"
      onClick={() => handleRoleClick(role)}
    >
      <label className="custom-radio m-0">
        {role.displayName}
        <input
          type="radio"
          name="role"
          className=""
          checked={selectedRole?.roleKey === role.roleKey}
        />
        <span className="checkmark"></span>
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
