import { Link, useNavigate } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";

type PopularNewsItem = {
    id: number;
    title: string;
    date: string;
    image: string;
};

const popularNews: PopularNewsItem[] = [
    {
        id: 1,
        title:
            "Sulut Jadi Gerbang Ekonomi Biru Indonesia Timur",
        date: "17 Mei 2025",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 2,
        title:
            "Harga Ikan di Pasar Tradisional Manado Alami Kenaikan",
        date: "17 Mei 2025",
        image:
            "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 3,
        title:
            "Diaspora Kawanua di Belanda Dukung Pendidikan di Sulut",
        date: "16 Mei 2025",
        image:
            "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 4,
        title:
            "Destinasi Likupang Masuk 5 Besar DPSP 2025",
        date: "16 Mei 2025",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    },
    {
        id: 5,
        title:
            "Komunitas Anak Muda Manado Gelar Aksi Bersih Pantai",
        date: "15 Mei 2025",
        image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80",
    },
];

export default function PopularNews() {
    const navigate = useNavigate()
    return (
        <aside className="flex min-w-0 flex-col overflow-hidden rounded-[7px] border border-[#E5E9E7] bg-white">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="flex shrink-0 items-center gap-2 px-3 pt-3">
                <h2 className="text-xl font-extrabold uppercase leading-none text-[#1b201d]">
                    Terpopuler
                </h2>
                <span
                    className="h-0.5 w-full rounded-full bg-[#08763e]"
                />
            </div>

            {/* =====================================================
                LIST
            ====================================================== */}
            <div className="mt-1 flex-1 overflow-hidden px-3 pb-2">
                {popularNews.map(
                    (item, index) => (
                        <Link
                            key={item.id}
                            to={`/berita/${item.id}` as never}
                            className="group grid grid-cols-[18px_minmax(0,1fr)_48px] items-center gap-2 border-b border-[#edf0ee] py-1.75 no-underline last:border-b-0"
                        >
                            {/* Number */}
                            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-extrabold leading-none text-[#08763e]">
                                {index + 1}
                            </span>

                            {/* Content */}
                            <div className="min-w-0">
                                <h3 className="line-clamp-2 text-[14px] font-bold leading-[1.35] text-[#252a27] transition-colors duration-200 group-hover:text-[#08763e]">
                                    {item.title}
                                </h3>
                                <span className="mt-0.5 block text-[10px] leading-none text-[#919793]">
                                    {item.date}
                                </span>
                            </div>

                            {/* Thumbnail */}
                            <div className="h-9.25 w-12 overflow-hidden rounded-sm bg-[#eef1ef]">
                                <img
                                    src={item.image}
                                    alt=""
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </Link>
                    )
                )}
            </div>
        </aside>
    );
}