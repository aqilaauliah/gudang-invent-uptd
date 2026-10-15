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
            'view-items',
            'manage-items',
            'view-stocks',
            'manage-transactions',
            'view-assets',
            'manage-assets',
            'view-locations',
            'manage-locations',
            'view-reports',
            'export-reports',
            'manage-users',
            'view-activities',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission);
        }

        $admin = Role::findOrCreate('Admin');
        $petugas = Role::findOrCreate('Petugas Gudang');

        $admin->syncPermissions($permissions);
        $petugas->syncPermissions([
            'view-items',
            'view-stocks',
            'manage-transactions',
            'view-assets',
            'view-locations',
        ]);
    }
}
