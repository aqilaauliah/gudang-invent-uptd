<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    public function up(): void
    {
        $role = Role::where('name', 'Petugas Gudang')->first();
        $permission = Permission::where('name', 'export-asset-reports')->first();

        if ($role && $permission) {
            $role->revokePermissionTo($permission);
        }
    }

    public function down(): void
    {
        //
    }
};
