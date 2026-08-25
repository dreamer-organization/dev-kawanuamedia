import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-maron-kawanuamedia via-maron-kawanuamedia-200 to-maron-kawanuamedia">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-maron-kawanuamedia-800/10 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute right-0 bottom-10 h-105 w-105 rounded-full bg-maron-kawanuamedia-800/20 blur-3xl"
        />
      </div>

      {Array.from({ length: 20 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: [0.2, 1, 0.2], y: [-20, -120] }}
          transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
          style={{ left: `${Math.random() * 100}%`, bottom: "-20px" }}
          className="absolute h-2 w-2 rounded-full bg-maron-kawanuamedia-800/60"
        />
      ))}

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: .8, type: "spring" }}
          className="text-[120px] font-black leading-none text-white md:text-[220px]"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="mt-4 text-3xl font-bold text-white"
        >
          Halaman Tidak Ditemukan
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .35 }}
          className="mx-auto mt-5 max-w-xl text-lg leading-8 text-white/80"
        >
          Maaf, halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau URL yang dimasukkan tidak tersedia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .5 }}
          className="mt-10 flex justify-center"
        >
          <button onClick={() => navigate({ to: "/" })} className="rounded-2xl bg-maron-kawanuamedia-800 px-10 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    </section>
  );
}