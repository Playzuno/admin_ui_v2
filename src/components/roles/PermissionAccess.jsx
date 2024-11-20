export function PermissionAccess() {
  const permissions = [
    { id: 1, name: 'View Users' },
    { id: 2, name: 'Manage Roles' },
    { id: 3, name: 'Edit Settings' }
  ];

  return (
    <div>
      <h3 className="mb-4 text-purple">Permission Access</h3>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Access Control</h4>
          <div className="permission-list">
            {permissions.map(permission => (
              <div key={permission.id} className="custom-control custom-checkbox mb-2">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id={`permission-${permission.id}`}
                />
                <label className="custom-control-label" htmlFor={`permission-${permission.id}`}>
                  {permission.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}