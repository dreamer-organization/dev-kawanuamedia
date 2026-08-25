import { Link } from "@tanstack/react-router";
import { IconArrowRight } from "@tabler/icons-react";
import type { ReactNode } from "react";

export type FeatureNewsItem = {
    id: number;
    title: string;
    date: string;
    category?: string;
    image: string;
};

interface Props {
    title: string;
    items: FeatureNewsItem[];
    icon?: ReactNode;
}

export default function NewsFeatureCard({
    title,
    items,
    icon,
}: Props) {
    const [featured, ...others] = items;

    return (
        <section className="flex min-w-0 flex-col overflow-hidden rounded-[7px] border border-[#E5E9E7] bg-white">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="flex shrink-0 items-center gap-2 px-3 pt-3">
                <h2 className="flex items-center gap-1 whitespace-nowrap text-xl font-extrabold uppercase leading-none text-[#1b201d]">
                    {icon}
                    {title}
                </h2>
                <span className="h-0.5 w-7.25 shrink-0 rounded-full bg-[#08763e]" />
            </div>

            {/* =====================================================
                CONTENT
            ====================================================== */}
            <div className="px-3 pb-2">
                {/* ==================================================
                    FEATURED ARTICLE
                =================================================== */}
                {featured && (
                    <Link
                        to={`/berita/${featured.id}` as never}
                        className="group block border-b border-[#edf0ee] pt-2 pb-2 no-underline"
                    >
                        {/* Image */}
                        <div className="h-24.5 w-full overflow-hidden rounded-[5px] bg-[#eef1ef]">
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Category / date */}
                        <div className="mt-2 flex items-center gap-1 text-xs leading-none text-[#8b938f]">
                            {featured.category && (
                                <>
                                    <span className="text-[#08763e]">
                                        {featured.category}
                                    </span>
                                    <span>•</span>
                                </>
                            )}
                            <span>{featured.date}</span>
                        </div>

                        {/* Title */}
                        <h3 className="mt-1.5 line-clamp-3 text-md font-bold leading-[1.35] text-[#252a27] transition-colors duration-200 group-hover:text-[#08763e]">
                            {featured.title}
                        </h3>
                    </Link>
                )}

                {/* ==================================================
                    SECONDARY ARTICLES
                =================================================== */}
                <div>
                    {others.map(
                        (item) => (
                            <Link
                                key={item.id}
                                to={`/berita/${item.id}` as never}
                                className="group grid grid-cols-[55px_minmax(0,1fr)] gap-2 border-b border-[#edf0ee] py-1.75 no-underline last:border-b-0"
                            >
                                {/* Thumbnail */}
                                <div className="h-10.5 w-13.75 overflow-hidden rounded-sm bg-[#eef1ef]">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                {/* Text */}
                                <div className="min-w-0">
                                    <h4 className="line-clamp-3 text-sm font-bold leading-[1.35] text-[#252a27] transition-colors duration-200 group-hover:text-[#08763e]">
                                        {item.title}
                                    </h4>
                                    <div className="mt-1 flex items-center gap-1 text-xs leading-none text-[#929a96]">
                                        {item.category && (
                                            <>
                                                <span>
                                                    {item.category}
                                                </span>

                                                <span>•</span>
                                            </>
                                        )}
                                        <span>
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}