import { RoleItem } from './RoleItem';

export function RolesList({ roles }) {
  return (
    <div>
      <h3 className="mb-4 text-purple">Roles List</h3>
      <div className="role-list">
        {roles.map((role) => (
          <RoleItem key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}