// utils/news-navigation.ts
import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    IconArrowLeft,
    IconArrowRight,
} from "@tabler/icons-react";

interface Props {
    article?: any;
    type?: "previous" | "next";
}

interface Props {
    currentSlug?: string;
}

import { newsData } from "@/data/News";

export function getPrevNextArticle(slug: string) {
    const index = newsData.findIndex((item) => item.slug === slug);

    return {
        previous:
            index > 0
                ? newsData[index - 1]
                : null,

        next:
            index < newsData.length - 1
                ? newsData[index + 1]
                : null,
    };
}

export function PrevNextCard({
    article,
    type,
}: Props) {
    const navigate = useNavigate()

    if (!article) return <div />;

    const isPrevious = type === "previous";

    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: .25 }}
        >
            <div
                onClick={() => navigate({to: `/news/${article.slug}`})}
                className="group block rounded-xl border border-[#24303B] bg-[#0E1720] p-7 transition hover:border-[#C6A15B] cursor-pointer"
            >

                <div className="flex items-center justify-between">

                    <span className="flex items-center gap-2 text-sm uppercase tracking-[.25em] text-[#C6A15B]">

                        {isPrevious ? (
                            <>
                                <IconArrowLeft size={16} />
                                Previous
                            </>
                        ) : (
                            <>
                                Next
                                <IconArrowRight size={16} />
                            </>
                        )}

                    </span>

                </div>

                <h3 className="mt-6 font-serif text-2xl text-[#F5F2EA] transition group-hover:text-[#C6A15B]">
                    {article.title}
                </h3>

                <div className="mt-5 flex gap-4 text-sm text-[#8A98A4]">

                    <span>
                        {article.category}
                    </span>

                    <span>•</span>

                    <span>
                        {article.date}
                    </span>

                </div>

            </div>
        </motion.div>
    );
}

export default function NewsPrevNext({
    currentSlug,
}: Props) {

    const {
        previous,
        next,
    } = getPrevNextArticle(currentSlug || "");

    if (!previous && !next) {
        return null;
    }

    return (
        <section className="py-16">
            <div className="container mx-auto max-w-6xl px-6">
                <div className="grid gap-8 md:grid-cols-2">
                    <PrevNextCard
                        article={previous}
                        type="previous"
                    />
                    <PrevNextCard
                        article={next}
                        type="next"
                    />
                </div>
            </div>
        </section>
    );
}