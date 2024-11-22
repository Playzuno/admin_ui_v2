import PermissionCheckbox from './PermissionCheckbox';

function PermissionSection({ title, permissions, setPermissions }) {
  if (!permissions) return null;
  const keys = Object.keys(permissions);
  return (
    <div>
      <h3 className="zuno-h3">{title}</h3>
      {keys.map(key1 => {
        const nextLevel = !permissions[key1].level;
        const nextKeys = nextLevel ? Object.keys(permissions[key1]) : null;
        // console.log(key1, nextKeys, permissions[key1]);
        if (nextLevel) {
          return nextKeys.map(key2 => (
            <PermissionCheckbox
              key={key2}
              permission={permissions[key1][key2]}
              onChange={active => setPermissions(`${key1}.${key2}`, active)}
            />
          ));
        } else {
          return (
            <PermissionCheckbox
              key={key1}
              permission={permissions[key1]}
              onChange={active => setPermissions(key1, active)}
            />
          );
        }
      })}

      {/* <PermissionCheckbox
        permission={permissions.roles.accessControl.editStatus}
        onChange={active => handlePermissionChange('accessControl', active)}
      />
      <PermissionCheckbox
        permission={permissions.roles.accessControl.newRoleCreation}
        onChange={active => handlePermissionChange('accessControl', active)}
      /> */}
    </div>
  );
}
export default PermissionSection;
