import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  IconArrowRight,
  IconCalendar,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

type HeadlineItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  caption: string;
};

const headlines: HeadlineItem[] = [
  {
    id: 1,
    title:
      "Festival Budaya Nusantara 2025 Meriah di Manado, Angkat Warisan Budaya Kawanua ke Dunia",
    excerpt:
      "Ribuan warga dan wisatawan memadati pembukaan Festival Budaya Nusantara 2025 di Manado. Kegiatan ini menjadi ajang pelestarian budaya sekaligus promosi pariwisata Sulawesi Utara ke tingkat internasional.",
    date: "17 Mei 2025",
    author: "Redaksi Kawanua Media",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=90",
    caption:
      "Festival Budaya Nusantara 2025 di Manado",
  },
  {
    id: 2,
    title:
      "Likupang Jadi Destinasi Favorit Wisatawan Mancanegara",
    excerpt:
      "Keindahan pantai dan kekayaan bawah laut Likupang terus menunjukkan pertumbuhan kunjungan wisatawan sepanjang 2025.",
    date: "16 Mei 2025",
    author: "Kawanua Travel",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=90",
    caption:
      "Keindahan bahari Likupang, Sulawesi Utara",
  },
  {
    id: 3,
    title:
      "Pemprov Sulut Dorong Investasi Hijau dan Ekonomi Biru di Kawasan Kawanua",
    excerpt:
      "Pemerintah Sulawesi Utara terus mendorong investasi yang mampu menggerakkan ekonomi sekaligus menjaga keberlanjutan lingkungan.",
    date: "17 Mei 2025",
    author: "Desk Ekonomi",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=90",
    caption:
      "Potensi ekonomi hijau dan biru Sulawesi Utara",
  },
  {
    id: 4,
    title:
      "Gempa M5,7 Guncang Talaud, Tidak Berpotensi Tsunami",
    excerpt:
      "Gempa bumi berkekuatan magnitudo 5,7 mengguncang wilayah Kepulauan Talaud dan tidak berpotensi menimbulkan tsunami.",
    date: "17 Mei 2025",
    author: "Desk Daerah",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=90",
    caption:
      "Aktivitas gempa di wilayah Sulawesi Utara",
  },
];

const AUTO_SLIDE_DURATION = 5000;

export default function Headline() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) =>
        current === headlines.length - 1
          ? 0
          : current + 1,
      );
    }, AUTO_SLIDE_DURATION);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const activeItem = headlines[activeIndex];

  return (
    <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[0.82fr_1.42fr] items-center">
      {/* ======================================================
          LEFT : HEADLINE TEXT
      ======================================================= */}
      <div className="flex min-w-0 flex-col justify-center md:h-80 lg:h-85">
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex h-full flex-col justify-center"
          >
            {/* Label */}
            <span className="inline-flex w-fit shrink-0 rounded-md bg-[#08763e] px-2 py-1 text-sm font-extrabold uppercase tracking-[0.15px] text-white">
              HEADLINE
            </span>
            {/* Title */}
            <h1 className="mt-2 line-clamp-5 font-['Plus_Jakarta_Sans'] text-[23px] font-extrabold leading-[1.12] tracking-[-1px] text-[#111715] sm:text-[24px] md:text-[25px] xl:text-[28px]">
              {activeItem.title}
            </h1>
            {/* Excerpt */}
            <p className="mt-2 line-clamp-3 max-w-97.5 text-sm truncate leading-[1.55] text-[#707873]">
              {activeItem.excerpt}
            </p>
            {/* Meta */}
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs text-[#7d8581]">
              <IconCalendar
                size={10}
                stroke={1.7}
              />
              <span>{activeItem.date}</span>
              <span>•</span>
              <span>
                Oleh {activeItem.author}
              </span>
            </div>
            {/* Button */}
            <Link
              to={`/berita/${activeItem.id}` as never}
              className="mt-3 inline-flex w-fit shrink-0 items-center gap-2 rounded-md bg-[#08763e] px-3 py-2 text-sm font-bold text-white no-underline transition-all duration-200 hover:bg-[#075f32] hover:shadow-md"
            >
              Baca Selengkapnya
              <IconArrowRight
                size={11}
                stroke={2}
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ======================================================
          RIGHT : HERO IMAGE
      ======================================================= */}
      <div className="relative h-55 w-full min-w-0 overflow-hidden rounded-[7px] bg-[#e7ebe8] md:h-80 lg:h-85">
        <AnimatePresence
          mode="wait"
          initial={false}
        >
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full"
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-22.5 bg-linear-to-t from-black/75 via-black/20 to-transparent"/>

            {/* Caption */}
            <div className="absolute bottom-3 left-3 right-3 z-10">
              <span className="text-[7px] font-medium text-white">
                {activeItem.caption}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ====================================================
            DOTS
        ===================================================== */}
        <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
          {headlines.map(
            (item, index) => {
              const active =
                index === activeIndex;

              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className="flex h-3 w-3 items-center justify-center border-0 bg-transparent p-0"
                >
                  <span
                    className={`block rounded-full transition-all duration-300
                      ${
                        active
                          ? "h-1.5 w-1.5 bg-white"
                          : "h-1.25 w-1.25 bg-white/50"
                      }
                    `}
                  />
                </button>
              );
            },
          )}
        </div>

        {/* ====================================================
            PROGRESS
        ===================================================== */}
        <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
          <motion.div
            key={activeIndex}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: AUTO_SLIDE_DURATION / 1000, ease: "linear" }}
            className="h-full bg-white/70"
          />
        </div>
      </div>
    </section>
  );
}