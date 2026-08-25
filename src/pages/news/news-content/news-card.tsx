// components/news-page/news-card.tsx

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

interface Props {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
}

export default function NewsCard({
    image,
    category,
    date,
    title,
    description,
}: Props) {
    return (
        <motion.article
            whileHover={{ y: -8 }}
            transition={{ duration: .35 }}
            className="group overflow-hidden rounded-md border border-[#2A3742] bg-[#0D1721] transition hover:border-[#C6A15B]"
        >
            {/* IMAGE */}
            <div className="overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="h-52.5 w-full object-cover transition duration-700 group-hover:scale-110"
                />
            </div>

            {/* CONTENT */}
            <div className="p-6">
                <div className="grid md:grid-cols-2 items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[2px] text-[#C6A15B]">
                        {category}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#95A0AA] justify-end">
                        <CalendarDays size={13} />
                        {date}
                    </div>
                </div>

                <h3 className="mt-5 font-serif text-xl leading-snug tracking-[2px] text-[#F5F2EA] text-balance transition group-hover:text-[#C6A15B]">
                    {title}
                </h3>

                <p className="mt-5 text-[16px] leading-8 text-[#8D99A5]">
                    {description}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 font-semibold text-[#C6A15B]">
                    Read Article
                    <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                    />
                </button>

            </div>

        </motion.article>
    );
}