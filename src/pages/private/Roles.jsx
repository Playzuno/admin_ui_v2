import { useEffect, useState } from 'react';
import { PageContainer } from '/src/components/PageContainer.jsx';
import { RolesList } from '/src/components/roles/RolesList';
import { PermissionAccess } from '/src/components/roles/PermissionAccess';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import { useBusinessInfo } from '/src/hooks/useBusinessContext';
import axios from '/src/utils/axios';

export function Roles() {
  const businessInfo = useBusinessInfo();
  const [selectedRole, setSelectedRole] = useState(1);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});
  useEffect(() => {
    if (!businessInfo.orgId) return;
    axios
      .get(`/api/v1/business/${businessInfo.orgId}/roles`)
      .then(res => {
        // console.log(res.data);
        setRoles(res.data);
        handleRoleClick(res.data.length > 0 ? res.data[0] : null);
      })
      .catch(err => {
        console.log(err);
      });
  }, [businessInfo]);
  const toggleStatus = role => {
    // console.log(role);
    axios
      .put(`/api/v1/business/${businessInfo.orgId}/role/${role.roleKey}`, {
        roleKey: role.roleKey,
        displayName: role.displayName,
        group: role.group === 'inactive' ? 'active' : 'inactive',
      })
      .then(res => {
        // console.log(res);
        setRoles(roles.map(r => (r.roleKey === role.roleKey ? res.data : r)));
        if (selectedRole?.roleKey === role.roleKey) {
          setSelectedRole(res.data);
        }
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
  const handleRoleClick = role => {
    setSelectedRole(role);
  };

  const handlePermissionChange = perm => {
    axios
      .put(`/api/v1/business/${businessInfo.orgId}/role/${selectedRole.roleKey}/permissions`, perm)
      .then(res => {
        // console.log(res);
        setPermissions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!businessInfo.orgId) return;
    axios
      .get(`/api/v1/business/${businessInfo.orgId}/role/${selectedRole.roleKey}/permissions`)
      .then(res => {
        console.log(res.data);
        setPermissions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [selectedRole]);

  if (!businessInfo.orgId) return null;

  return (
    <PageContainer subtitle="Login person role" title="Role/Access">
      <div className="row">
        <div className="col-md-6">
          <RolesList
            roles={roles}
            action={toggleStatus}
            handleRoleClick={handleRoleClick}
            selectedRole={selectedRole}
          />
        </div>
        <div
          className={`col-md-6 ${selectedRole?.group === 'inactive' ? 'text-muted' : ''}`}
          style={{ pointerEvents: selectedRole?.group === 'inactive' ? 'none' : 'auto' }}
        >
          <PermissionAccess permissions={permissions} setPermissions={handlePermissionChange} />
        </div>
      </div>
    </PageContainer>
  );
}
