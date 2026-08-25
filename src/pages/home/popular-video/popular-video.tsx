import {
    IconArrowRight,
    IconPlayerPlay,
} from "@tabler/icons-react";

import { Link } from "@tanstack/react-router";

type PopularVideoItem = {
    id: number;
    title: string;
    date: string;
    views: string;
    duration: string;
    image: string;
};

const popularVideo: PopularVideoItem = {
    id: 1,
    title:
        "Pesona Bahari Likupang, Surga Tersembunyi di Ujung Utara Sulawesi",
    date: "16 Mei 2025",
    views: "12K",
    duration: "05:42",
    image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=85",
};

export default function PopularVideo() {
    const video = popularVideo;

    return (
        <section className="w-full overflow-hidden rounded-[7px] border border-[#E5E9E7] bg-white px-3 pb-3 pt-3">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="flex items-center gap-2">
                <h2 className="whitespace-nowrap text-xl font-extrabold uppercase leading-none text-[#1b201d]">
                    Video Pilihan
                </h2>
                <span className="h-0.5 w-7.25 shrink-0 rounded-full bg-[#08763e]" />

                {/* <Link
                        to={"/video" as never}
                        className="ml-auto flex shrink-0 items-center gap-1 text-[7px] font-medium text-[#6d7671] no-underline transition-colors duration-200 hover:text-[#08763e]"
                    >
                    Lihat Semua
                    <IconArrowRight
                        size={10}
                        stroke={1.8}
                    />
                    </Link> */}
            </div>

            {/* =====================================================
                VIDEO
            ====================================================== */}
            <Link to={`/video/${video.id}` as never} className="group mt-2.5 block no-underline">
                {/* Thumbnail */}
                <div className="relative h-28 w-full overflow-hidden rounded-[5px] bg-[#e8ece9]">
                    <img
                        src={video.image}
                        alt={video.title}
                        loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/10 transition duration-300 group-hover:bg-black/20" />

                    {/* Play button */}
                    <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#08763e]">
                        <IconPlayerPlay
                            size={16}
                            stroke={1.8}
                            fill="currentColor"
                        />
                    </div>

                    {/* Duration */}
                    <span className="absolute bottom-1.5 right-1.5 rounded-[3px] bg-black/70 px-1.5 py-0.75 text-[6px] font-medium leading-none text-white">
                        {video.duration}
                    </span>
                </div>

                {/* Title */}
                <h3 className="mt-2 line-clamp-2 text-sm font-bold leading-[1.4] text-[#252a27] transition-colors duration-200 group-hover:text-[#08763e]">
                    {video.title}
                </h3>

                {/* Metadata */}
                <div className="mt-1 flex items-center gap-1 text-[10px] leading-none text-[#8b938f]">
                    <span>{video.date}</span>
                    <span>•</span>
                    <span>{video.views} Viewers</span>
                </div>
            </Link>
        </section>
    );
}