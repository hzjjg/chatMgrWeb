
export class AuthPermission {
    permissionId: number;
    name: string;
    operation: string;
    remark: string;
}

export class AuthPermissionCategory {
    name: string;
    remark: string;
    category: string;
    permissions: string[];
}