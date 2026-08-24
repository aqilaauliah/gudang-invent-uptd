<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('nomor')->unique();
            $table->string('tipe'); // masuk | keluar | mutasi
            $table->foreignId('item_id')->constrained()->cascadeOnDelete();
            $table->foreignId('location_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('location_from_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->foreignId('location_to_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->integer('jumlah');
            $table->date('tanggal');
            $table->string('dicatat_oleh'); // petugas | self-service
            $table->string('nama_petugas')->nullable();
            $table->string('nama_pengambil')->nullable();
            $table->string('sumber_supplier')->nullable();
            $table->string('no_dokumen')->nullable();
            $table->string('keperluan')->nullable();
            $table->text('keterangan')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();

            $table->index('tipe');
            $table->index('tanggal');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
