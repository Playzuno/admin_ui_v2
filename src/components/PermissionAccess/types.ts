export interface Permission {
  title: string;
  active: boolean;
  description: string;
  level: number;
}

export interface PermissionItem {
  permission?: Permission;
  [key: string]: Permission | any;
}

export interface PermissionData {
  roleId: string;
  orgId: string;
  brandProduct: PermissionItem;
  planCreation: PermissionItem;
  rewardsSetups: PermissionItem;
  roles: {
    accessControl: PermissionItem;
  };
}