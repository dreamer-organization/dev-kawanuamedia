import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
    IconArrowLeft,
    IconScale,
} from "@tabler/icons-react";

export default function NewsNotFound() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-[#081119] px-6">

            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: .6,
                }}
                className="max-w-xl text-center"
            >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10">
                    <IconScale
                        size={36}
                        className="text-[#C6A15B]"
                    />
                </div>

                <h1 className="mt-10 font-serif text-8xl text-[#C6A15B]">
                    404
                </h1>

                <h2 className="mt-6 font-serif text-4xl text-white">
                    Article Not Found
                </h2>

                <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-[#9AA7B2]">
                    The article you're looking for may have been removed,
                    renamed, or is temporarily unavailable.
                </p>

                <Link
                    to="/news"
                    className="
                        mt-10
                        inline-flex
                        items-center
                        gap-3
                        rounded-md
                        border
                        border-[#C6A15B]
                        px-7
                        py-4
                        text-[#C6A15B]
                        transition
                        hover:bg-[#C6A15B]
                        hover:text-[#081119]
                    "
                >
                    <IconArrowLeft size={18} />
                    Back to News
                </Link>
            </motion.div>

        </section>
    );
}