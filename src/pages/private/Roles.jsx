import { useEffect, useState } from 'react';
import { PageContainer } from '/src/components/PageContainer.jsx';
import { RolesList } from '/src/components/roles/RolesList';
import { PermissionAccess } from '/src/components/roles/PermissionAccess';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import { useBusinessInfo } from '/src/hooks/useBusinessContext';

export function Roles() {
  const businessInfo = useBusinessInfo();
  const [selectedRole, setSelectedRole] = useState(1);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    if (!businessInfo.orgId) return;
    axios
      .get(`/business/${businessInfo.orgId}/roles`)
      .then(res => {
        // console.log(res.data);
        setRoles(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [businessInfo]);
  const toggleStatus = role => {
    // console.log(role);
    axios
      .put(`/business/${businessInfo.orgId}/role/${role.roleKey}`, {
        roleKey: role.roleKey,
        displayName: role.displayName,
        group: role.group === 'inactive' ? 'active' : 'inactive',
      })
      .then(res => {
        // console.log(res);
        setRoles(roles.map(r => (r.roleKey === role.roleKey ? res.data : r)));
      })
      .catch(err => {
        console.log(err);
      });
    // const updatedRoles = roles.map((role) => {
    //   if (role.id === roleId) {
    //     role.active = !role.active;
    //   }
    //   return role;
    // });
    // setRoles(updatedRoles);
  };
  if (!businessInfo.orgId) return null;
  return (
    <PageContainer subtitle="Login person role" title="Role/Access">
      <div className="row">
        <div className="col-md-6">
          <RolesList roles={roles} />
        </div>
        <div className="col-md-6">
          <PermissionAccess />
        </div>
      </div>
    </PageContainer>
  );
}
