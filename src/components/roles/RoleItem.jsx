export function RoleItem({ role }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
      <label className="d-flex align-items-center m-0">
        <input type="radio" name="role" className="mr-2" />
        <span>{role.name}</span>
      </label>
      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id={`switch-${role.id}`}
          checked={role.active}
          readOnly
        />
        <label className="custom-control-label" htmlFor={`switch-${role.id}`}></label>
      </div>
    </div>
  );
}