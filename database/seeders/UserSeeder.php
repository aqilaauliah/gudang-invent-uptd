<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::updateOrCreate(
            ['email' => 'aqilaaulia1905@gmail.com'],
            [
                'name' => 'Aqila Aulia',
                'password' => Hash::make('admin123'),
            ],
        );

        $admin->assignRole('Admin');

        $petugas = User::updateOrCreate(
            ['email' => 'petugas@sigudin.test'],
            [
                'name' => 'Petugas Gudang',
                'password' => Hash::make('password'),
            ],
        );

        $petugas->assignRole('Petugas Gudang');
    }
}
