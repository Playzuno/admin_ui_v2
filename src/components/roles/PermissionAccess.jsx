export function PermissionAccess({ permissions, setPermissions }) {
  if (!permissions || Object.keys(permissions).length === 0) return null;
  const perms = permissions;
  const handleChange = (e, key) => {
    const [mainKey, subKey] = key.split('.'); // Split the key to access nested properties
    const updatedPerms = {
      ...perms,
      [mainKey]: {
        ...perms[mainKey],
        [subKey]: e.target.checked, // Update the specific nested property
      },
    };
    setPermissions(updatedPerms);
  };
  return (
    <div>
      <h3 className="mb-4 text-purple">Permission Access</h3>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-3">Access Control</h4>
          <div className="permission-list">
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-accessControl"
                checked={permissions.roles.accessControl}
                onChange={e => handleChange(e, 'roles.accessControl')}
              />
              <label className="custom-control-label" htmlFor="permission-accessControl">
                Access Control
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-newRoleCreation"
                checked={permissions.roles.newRoleCreation}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-newRoleCreation">
                New Role Creation
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-editStatus"
                checked={permissions.roles.editStatus}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-editStatus">
                Edit Status
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-addBrandProduct"
                checked={permissions.brandProduct.add}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-addBrandProduct">
                Add Brand Product
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-editBrandProduct"
                checked={permissions.brandProduct.edit}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-editBrandProduct">
                Edit Brand Product
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-categoryChangeOption"
                checked={permissions.brandProduct.categoryChangeOption}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-categoryChangeOption">
                Category Change Option
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-priorityChange"
                checked={permissions.brandProduct.priorityChange}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-priorityChange">
                Priority Change
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-reUpload"
                checked={permissions.brandProduct.reUpload}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-reUpload">
                Re-upload
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-deleteBrandProduct"
                checked={permissions.brandProduct.delete}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-deleteBrandProduct">
                Delete Brand Product
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-planCreationNewRole"
                checked={permissions.planCreation.newRoleCreation}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-planCreationNewRole">
                Plan Creation New Role
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-planCreationEdit"
                checked={permissions.planCreation.edit}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-planCreationEdit">
                Plan Creation Edit
              </label>
            </div>
            <div className="custom-control custom-checkbox mb-2">
              <input
                type="checkbox"
                className="custom-control-input"
                id="permission-editUpdateRewards"
                checked={permissions.rewardsSetups.editUpdate}
                readOnly
              />
              <label className="custom-control-label" htmlFor="permission-editUpdateRewards">
                Edit Update Rewards
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
