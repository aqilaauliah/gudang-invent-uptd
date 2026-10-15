<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $role = Role::query()->where('name', 'Petugas Gudang')->first();
        $permission = Permission::query()->where('name', 'view-reports')->first();

        if ($role && $permission) {
            $role->revokePermissionTo($permission);
        }
    }

    public function down(): void
    {
        $role = Role::query()->where('name', 'Petugas Gudang')->first();
        $permission = Permission::query()->where('name', 'view-reports')->first();

        if ($role && $permission) {
            $role->givePermissionTo($permission);
        }
    }
};
