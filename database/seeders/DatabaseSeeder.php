<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
            LocationSeeder::class,
            ItemSeeder::class,
            AssetSeeder::class,
            TransactionSeeder::class,
        ]);
    }
}
