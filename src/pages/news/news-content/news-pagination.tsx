import { motion } from "framer-motion";
import {
    IconChevronLeft,
    IconChevronRight,
} from "@tabler/icons-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export default function NewsPagination({
    currentPage,
    totalPages,
    onPageChange,
    className = "",
}: PaginationProps) {
    const pages = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    );

    const changePage = (page: number) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        )
            return;

        onPageChange(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            className={`
                mt-16
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
                ${className}
            `}
        >
            {/* Previous */}

            <motion.button
                whileHover={
                    currentPage > 1
                        ? { y: -2 }
                        : {}
                }
                whileTap={{ scale: .96 }}
                disabled={currentPage === 1}
                onClick={() =>
                    changePage(currentPage - 1)
                }
                className={`
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-md
                    border
                    px-5
                    text-sm
                    font-medium
                    transition-all

                    ${
                        currentPage === 1
                            ? "cursor-not-allowed border-[#24313B] bg-[#0D1721] text-[#5C6772]"
                            : "border-[#24313B] bg-[#0D1721] text-[#F5F2EA] hover:border-[#C6A15B] hover:text-[#C6A15B]"
                    }
                `}
            >
                <IconChevronLeft size={18} />

                Previous
            </motion.button>

            {/* Numbers */}

            {pages.map((page) => (
                <motion.button
                    key={page}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: .95 }}
                    onClick={() =>
                        changePage(page)
                    }
                    className={`
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-md
                        border
                        text-sm
                        font-semibold
                        transition-all

                        ${
                            currentPage === page
                                ? "border-[#C6A15B] bg-[#C6A15B] text-[#081119]"
                                : "border-[#24313B] bg-[#0D1721] text-[#F5F2EA] hover:border-[#C6A15B] hover:text-[#C6A15B]"
                        }
                    `}
                >
                    {page}
                </motion.button>
            ))}

            {/* Next */}

            <motion.button
                whileHover={
                    currentPage < totalPages
                        ? { y: -2 }
                        : {}
                }
                whileTap={{ scale: .96 }}
                disabled={
                    currentPage === totalPages
                }
                onClick={() =>
                    changePage(currentPage + 1)
                }
                className={`
                    flex
                    h-12
                    items-center
                    gap-2
                    rounded-md
                    border
                    px-5
                    text-sm
                    font-medium
                    transition-all

                    ${
                        currentPage === totalPages
                            ? "cursor-not-allowed border-[#24313B] bg-[#0D1721] text-[#5C6772]"
                            : "border-[#24313B] bg-[#0D1721] text-[#F5F2EA] hover:border-[#C6A15B] hover:text-[#C6A15B]"
                    }
                `}
            >
                Next

                <IconChevronRight size={18} />
            </motion.button>
        </div>
    );
}