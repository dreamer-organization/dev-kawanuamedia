import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
    IconCalendar,
    IconChevronRight,
    IconClock,
    IconUser,
} from "@tabler/icons-react";

interface Props {
    article: any;
}

export default function NewsDetailHero({
    article,
}: Props) {
    return (
        <section className="relative h-160 overflow-hidden">
            {/* Background */}

            <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-[#081119]/75" />

            <div className="absolute inset-0 bg-linear-to-r from-[#081119] via-[#081119]/80 to-transparent" />

            <div className="absolute bottom-0 left-0 h-44 w-full bg-linear-to-t from-[#081119] to-transparent" />

            {/* Content */}

            <div className="relative z-10 mx-auto flex h-full container-custom md:container items-end px-6 pb-24">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: .6,
                    }}
                    className="max-w-225"
                >
                    {/* Category */}

                    <span
                        className="
                            inline-flex
                            rounded-full
                            border
                            border-[#C6A15B]
                            px-5
                            py-2
                            text-sm
                            font-medium
                            uppercase
                            tracking-[2px]
                            text-[#C6A15B]
                        "
                    >
                        {article.category}
                    </span>

                    {/* Title */}

                    <h1
                        className="
                            mt-8
                            font-serif
                            text-4xl
                            leading-tight
                            text-white
                            md:text-5xl
                            lg:text-7xl
                        "
                    >
                        {article.title}
                    </h1>

                    {/* Meta */}

                    <div className="mt-8 flex flex-wrap items-center gap-6 text-[#C8D0D7]">
                        <div className="flex items-center gap-2">
                            <IconUser size={18} />
                            <span>{article.author.name}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <IconCalendar size={18} />
                            <span>{article.publishedAt}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <IconClock size={18} />
                            <span>{article.readTime}</span>
                        </div>
                    </div>

                    {/* Breadcrumb */}

                    <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-white/70">
                        <Link
                            to="/"
                            className="transition hover:text-[#C6A15B]"
                        >
                            Home
                        </Link>

                        <IconChevronRight size={15} />

                        <Link
                            to="/news"
                            className="transition hover:text-[#C6A15B]"
                        >
                            News
                        </Link>

                        <IconChevronRight size={15} />

                        <span className="text-[#C6A15B]">
                            {article.title}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}