<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('kode')->unique();
            $table->string('nama');
            $table->string('kategori');
            $table->string('merk')->nullable();
            $table->string('tipe_model')->nullable();
            $table->string('no_seri')->nullable();
            $table->year('tahun_perolehan')->nullable();
            $table->string('sumber_perolehan')->nullable();
            $table->decimal('nilai_perolehan', 15, 2)->nullable();
            $table->foreignId('location_id')->nullable()->constrained()->nullOnDelete();
            $table->string('penanggung_jawab')->nullable();
            $table->string('kondisi')->default('Baik');
            $table->string('status')->default('Digunakan');
            $table->string('foto')->nullable();
            $table->text('keterangan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
