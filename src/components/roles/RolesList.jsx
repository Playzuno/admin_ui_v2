import { RoleItem } from './RoleItem';

export function RolesList({ roles, action, handleRoleClick, selectedRole }) {
  return (
    <div>
      <h3 className="mb-4 zuno-h2">Roles List</h3>
      <div className="role-list">
        {roles.map(role => (
          <RoleItem
            key={role.roleKey}
            role={role}
            action={action}
            handleRoleClick={handleRoleClick}
            selectedRole={selectedRole}
          />
        ))}
      </div>
    </div>
  );
}
