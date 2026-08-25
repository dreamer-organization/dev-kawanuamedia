import {
    IconHeadphones,
    IconPlayerPlay,
} from "@tabler/icons-react";

import { Link } from "@tanstack/react-router";

type PodcastProps = {
    title?: string;
    description?: string;
    href?: string;
};

export default function KawanuaPodcast({
    title = "KAWANUA PODCAST",
    description = "Inspirasi, Cerita, dan Perspektif untuk Kawanua dan Indonesia.",
    href = "/podcast",
}: PodcastProps) {
    return (
        <section className="relative min-h-29.5 w-full overflow-hidden rounded-[7px] border border-[#DDEBE2] bg-[#F1F8F3]">
            {/* =====================================================
                CONTENT
            ====================================================== */}
            <div className="relative z-10 flex min-h-29.5 flex-col items-start justify-center px-3 py-3">
                {/* Label */}
                <span className="text-[8px] font-extrabold uppercase tracking-[0.2px] text-[#31563F]">
                    {title}
                </span>
                {/* Description */}
                <p className="mt-1 max-w-38.75 text-[8px] leading-normal text-[#68766E]">
                    {description}
                </p>
                {/* CTA */}
                <Link
                    to={href as never} className="mt-2 inline-flex items-center gap-1.5 rounded-sm bg-maron-kawanuamedia px-2.5 py-1.5 text-[7px] font-bold text-white no-underline transition-all duration-200 hover:bg-[#075f32] hover:shadow-md">
                    <IconHeadphones
                        size={11}
                        stroke={2}
                    />
                    Dengarkan Sekarang
                </Link>
            </div>

            {/* =====================================================
                DECORATION
            ====================================================== */}
            <div className="pointer-events-none absolute -bottom-4.5 -right-2 z-0 -rotate-12 text-maron-kawanuamedia/10">
                <IconHeadphones
                    size={100}
                    stroke={1}
                />
            </div>

            {/* Additional decorative circle */}
            <div className="pointer-events-none absolute -bottom-7.5 -right-7.5 h-27.5 w-27.5 rounded-full bg-maron-kawanuamedia/[0.035]" />

            {/* Small play icon */}
            <div className="pointer-events-none absolute bottom-3.25 right-4.25 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-maron-kawanuamedia/10 text-maron-kawanuamedia/70">
                <IconPlayerPlay
                    size={11}
                    fill="currentColor"
                    stroke={1.5}
                />
            </div>
        </section>
    );
}