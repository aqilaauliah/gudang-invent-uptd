<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Concerns\FlashesMessages;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use FlashesMessages;

    public function index(): Response
    {
        $users = User::with('roles')->orderBy('name')->paginate(10);

        return Inertia::render('Pengguna/Index', [
            'users' => $users,
            'roles' => Role::orderBy('name')->pluck('name'),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        $user->assignRole($request->role);

        $this->flash('success', "Pengguna \"{$user->name}\" berhasil ditambahkan.");

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'type' => 'tambah_pengguna',
                'nama' => $user->name,
                'email' => $user->email,
                'role' => $request->role,
            ])
            ->log("Menambahkan pengguna \"{$user->name}\"");

        return redirect()->back();
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $data['password'] = $request->password;
        }

        $user->update($data);
        $user->syncRoles([$request->role]);

        $this->flash('success', "Pengguna \"{$user->name}\" berhasil diperbarui.");

        activity()
            ->causedBy($request->user())
            ->withProperties([
                'type' => 'ubah_pengguna',
                'nama' => $user->name,
                'email' => $user->email,
                'role' => $request->role,
            ])
            ->log("Mengubah pengguna \"{$user->name}\"");

        return redirect()->back();
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->id === request()->user()->id) {
            $this->flash('critical', 'Anda tidak dapat menghapus akun sendiri.');

            return redirect()->back();
        }

        $nama = $user->name;
        $email = $user->email;
        $user->delete();

        $this->flash('success', "Pengguna \"{$nama}\" berhasil dihapus.");

        activity()
            ->causedBy(request()->user())
            ->withProperties([
                'type' => 'hapus_pengguna',
                'nama' => $nama,
                'email' => $email,
            ])
            ->log("Menghapus pengguna \"{$nama}\"");

        return redirect()->back();
    }
}
