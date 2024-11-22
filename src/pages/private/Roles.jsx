import { Suspense, useEffect, useState } from 'react';
import { PageContainer } from '/src/components/PageContainer.jsx';
import { RolesList } from '/src/components/roles/RolesList';
import PermissionAccess from '/src/components/roles/PermissionAccess';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line
import { useBusinessInfo } from '/src/hooks/useBusinessContext';
import axios from '/src/utils/axios';
import PermissionSkeleton from '/src/components/Skeleton';
import Loader from '/src/components/Loader';
import Dialog from '/src/components/roles/RoleDialog';
export function Roles() {
  const businessInfo = useBusinessInfo();
  const [selectedRole, setSelectedRole] = useState(1);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!businessInfo.orgId) return;
    setLoading(true);
    axios
      .get(`/api/v1/business/${businessInfo.orgId}/roles`)
      .then(res => {
        // console.log(res.data);
        setRoles(res.data);
        handleRoleClick(res.data.length > 0 ? res.data[0] : null);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [businessInfo]);

  const toggleStatus = role => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
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
    if (selectedRole != role) {
      setPermissions(null);
    }
  };

  const handlePermissionChange = (key, active) => {
    // console.log(key, active);
    const keys = key.split('.');
    const perms = permissions;
    const len = keys.length;
    if (len === 1) {
      perms[keys[0]].active = active;
    } else if (len === 2) {
      perms[keys[0]][keys[1]].active = active;
    } else if (len === 3) {
      perms[keys[0]][keys[1]][keys[2]].active = active;
    } else if (len === 4) {
      perms[keys[0]][keys[1]][keys[2]][keys[3]].active = active;
    }
    axios
      .put(`/api/v1/business/${businessInfo.orgId}/role/${selectedRole.roleKey}/permissions`, perms)
      .then(res => {
        // console.log(res);
        setPermissions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const newRole = (roleName, status) => {
    setLoading(true);
    let roleKey = roleName.toLowerCase().replace(/ /g, '_');
    axios
      .post(`/api/v1/business/${businessInfo.orgId}/role`, {
        roleKey: roleKey,
        displayName: roleName,
        group: status ? 'active' : 'inactive',
      })
      .then(res => {
        // console.log(res);
        setRoles([...roles, res.data]);
        if (selectedRole?.roleKey === roleKey) {
          setSelectedRole(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (!businessInfo.orgId || !selectedRole) return;

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
    <PageContainer
      subtitle="Login person role"
      title="Role/Access"
      actionIcon={<RoleAction handleNewRole={newRole} />}
    >
      {loading && <Loader></Loader>}
      <div className="row align-items-center justify-content-between">
        <div className="col-md-4 align-self-start">
          <div className="card">
            {/* <h2 className="main-container-box h4 py-1 text-purple">{title}</h2> */}
            {/* <div className="card-header bg-white"> */}
            {/* <h4 className="h5 text-purple mb-0">{subtitle}</h4> */}
            {/* </div> */}
            <div className="card-body">
              <RolesList
                roles={roles}
                action={toggleStatus}
                handleRoleClick={handleRoleClick}
                selectedRole={selectedRole}
              />
            </div>
          </div>
        </div>
        <span className="arrow-icon">
          <img src="/assets/images/arrow-right.svg" alt="arrow-right" />
        </span>
        <div
          className={`col-md-6 ${selectedRole?.group === 'inactive' ? 'text-muted' : ''}`}
          style={{ pointerEvents: selectedRole?.group === 'inactive' ? 'none' : 'auto' }}
        >
          <div className="card">
            <Suspense fallback={<PermissionSkeleton />}>
              <PermissionAccess permissions={permissions} setPermissions={handlePermissionChange} />
            </Suspense>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function RoleAction({ handleNewRole }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const submit = (roleName, status) => {
    handleNewRole(roleName, status);
    setIsDialogOpen(false);
  };
  return (
    <div className="">
      <a
        className="hover-cursor-pointer rounded-circle bg-white"
        style={{ width: '50px', height: '50px' }}
        onClick={() => setIsDialogOpen(true)}
      >
        <i className="icon-user"></i>
      </a>

      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSubmit={submit} />
    </div>
  );
}
