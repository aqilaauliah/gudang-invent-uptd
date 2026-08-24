<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'manage-items',
            'manage-stocks',
            'manage-transactions',
            'manage-assets',
            'manage-locations',
            'manage-reports',
            'manage-users',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $admin = Role::findOrCreate('Admin');
        $petugas = Role::findOrCreate('Petugas Gudang');

        $admin->syncPermissions($permissions);
        $petugas->syncPermissions(array_diff($permissions, ['manage-users']));
    }
}
