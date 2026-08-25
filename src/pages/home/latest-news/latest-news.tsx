import {
    IconArrowRight,
} from "@tabler/icons-react";

import { Link } from "@tanstack/react-router";

type LatestNewsItem = {
    id: number;
    title: string;
    date: string;
    image: string;
};

const latestNews: LatestNewsItem[] = [
    {
        id: 1,
        title:
            "Pemprov Sulut Dorong Investasi Hijau dan Ekonomi Biru di Kawasan Kawanua",
        date: "17 Mei 2025",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 2,
        title:
            "Gempa M5,7 Guncang Talaud, Tidak Berpotensi Tsunami",
        date: "17 Mei 2025, 05:49 WITA",
        image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 3,
        title:
            "Polresta Manado Ungkap Kasus Peredaran Narkoba Jaringan Internasional",
        date: "17 Mei 2025, 07:30 WITA",
        image:
            "https://images.unsplash.com/photo-1593113646773-028c64c8f0d8?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 4,
        title:
            "Cuaca Sulawesi Utara Hari Ini Berpotensi Hujan di Sejumlah Wilayah",
        date: "17 Mei 2025, 06:15 WITA",
        image:
            "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=500&q=80",
    },
];

export default function LatestNews() {
    return (
        <section className="flex min-w-0 flex-col overflow-hidden rounded-[7px] border border-[#E5E9E7] bg-white">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="flex shrink-0 items-center gap-2 px-3 pt-3">
                <h2 className="whitespace-nowrap text-xl font-extrabold uppercase leading-none text-[#1b201d]">
                    Berita Terbaru
                </h2>

                <span className="h-0.5 w-7.25 rounded-full bg-maron-kawanuamedia" />
            </div>

            {/* =====================================================
                NEWS LIST
            ====================================================== */}
            <div className="mt-1 px-3 pb-2">
                {latestNews.map((item) => (
                    <Link
                        key={item.id}
                        to={`/berita/${item.id}` as never}
                        className="group grid grid-cols-[57px_minmax(0,1fr)] gap-2 border-b border-[#edf0ee] py-1.75 no-underline last:border-b-0"
                    >
                        {/* Thumbnail */}
                        <div className="h-10.75 w-14.25 overflow-hidden rounded-sm bg-[#eef1ef]">
                            <img
                                src={item.image}
                                alt=""
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="min-w-0">
                            <h3 className="line-clamp-3 text-[14px] font-bold leading-[1.35] text-[#252a27] transition-colors duration-200 group-hover:text-maron-kawanuamedia">
                                {item.title}
                            </h3>
                            <span className="mt-0.75 block text-[10px] leading-none text-[#919793]">
                                {item.date}
                            </span>
                        </div>
                    </Link>
                ),
                )}
            </div>
            <div className="p-2">
                <Link
                    to={`/berita` as never}
                    className="flex shrink-0 items-center justify-center gap-1 text-xs font-medium text-[#6d7671] no-underline transition-colors duration-200 hover:text-maron-kawanuamedia border border-maron-kawanuamedia p-1 rounded-md"
                >
                    Lihat Semua Berita
                    <IconArrowRight
                        size={10}
                        stroke={1.8}
                    />
                </Link>
            </div>
        </section>
    );
}