import React, { useState } from 'react';
import PermissionCheckbox from '../PermissionAccess/PermissionCheckbox';
import PermissionSection from '../PermissionAccess/PermissionSection';
const PermissionAccess = ({ permissions, setPermissions }) => {
  if (!permissions || Object.keys(permissions).length === 0) {
    throw new Promise(s => {
      if (!permissions || Object.keys(permissions).length > 0) {
        s();
      }
    });
  }
  // console.log(permissions);
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h3 className="mb-4 zuno-h2">Permission Access</h3>
      {/* <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"> */}
      <div className="row g-3 p-4">
        <div className="col-12 col-md-6">
          <PermissionSection
            title="Roles"
            permissions={permissions.roles}
            setPermissions={(key, active) => setPermissions(`roles.${key}`, active)}
          />
        </div>
        <div className="col-12 col-md-6">
          <PermissionSection
            title="Brand Products"
            permissions={permissions.brandProduct}
            setPermissions={(key, active) => setPermissions(`brandProduct.${key}`, active)}
          />
        </div>
        <div className="col-12 col-md-6">
          <PermissionSection
            title="Plan Creation"
            permissions={permissions.planCreation}
            setPermissions={(key, active) => setPermissions(`planCreation.${key}`, active)}
          />
        </div>
        <div className="col-12 col-md-6">
          <PermissionSection
            title="Reward Setups"
            permissions={permissions.rewardsSetups}
            setPermissions={(key, active) => setPermissions(`rewardsSetups.${key}`, active)}
          />
        </div>
      </div>
    </div>
  );
};

export default PermissionAccess;
