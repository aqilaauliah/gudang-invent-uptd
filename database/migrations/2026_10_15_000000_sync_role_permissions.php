<?php

use Database\Seeders\RolePermissionSeeder;
use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        app(RolePermissionSeeder::class)->run();
    }

    public function down(): void
    {
        $previousPermissions = [
            'manage-items',
            'manage-stocks',
            'manage-transactions',
            'manage-assets',
            'manage-locations',
            'manage-reports',
            'manage-users',
        ];
        $permissions = Permission::query()->whereIn('name', $previousPermissions)->get();

        $admin = Role::query()->where('name', 'Admin')->first();
        $petugas = Role::query()->where('name', 'Petugas Gudang')->first();

        $admin?->syncPermissions($permissions);
        $petugas?->syncPermissions($permissions->where('name', '!=', 'manage-users'));
    }
};
