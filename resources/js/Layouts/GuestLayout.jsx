export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-surface">
            <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-navy p-12 lg:flex">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-navy-2" />
                <div className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-navy-2/70" />

                <div className="relative flex items-center gap-4">
                    <img
                        src="/image/logo-disnakertrans.png"
                        alt="Logo DISNAKERTRANS"
                        className="h-14 w-14 object-contain"
                    />
                    <div>
                        <p className="font-display text-2xl font-bold text-white">INVENTRA</p>
                        <p className="text-sm text-white/60">Inventory & Asset Management System</p>
                    </div>
                </div>

                <div className="relative">
                    <h1 className="font-display text-3xl font-bold leading-tight text-white">
                        Kelola persediaan dan
                        <br />
                        inventaris lebih mudah.
                    </h1>
                    <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
                        Pantau stok, barang masuk &amp; keluar, mutasi, serta aset kantor dalam satu
                        sistem yang terstruktur.
                    </p>
                </div>

                <div className="relative">
                    <p className="text-sm font-medium text-white/80">
                        UPTD Pengawasan Ketenagakerjaan
                    </p>
                    <p className="text-sm text-white/50">Wilayah II Karawang</p>
                </div>
            </div>

            <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
                {children}
            </div>
        </div>
    );
}
