import { Link } from "@tanstack/react-router";
import {
    IconArrowRight,
    IconSearch,
} from "@tabler/icons-react";
import { newsCategories, recentPosts } from "@/data/News";

export default function NewsSidebar() {
    return (
        <aside className="sticky top-28 h-fit space-y-8">

            {/* SEARCH */}

            <div className="rounded-md border border-[#26313B] bg-[#101922] p-7">

                <h3 className="mb-5 font-serif text-[28px] text-white">
                    Search
                </h3>

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search article..."
                        className="
                            h-12
                            w-full
                            rounded-md
                            border
                            border-[#2F3A45]
                            bg-[#081119]
                            px-4
                            pr-12
                            text-white
                            placeholder:text-[#74808A]
                            outline-none
                            transition
                            focus:border-[#C6A15B]
                        "
                    />

                    <IconSearch
                        size={20}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C6A15B]"
                    />

                </div>

            </div>

            {/* CATEGORY */}

            <div className="rounded-md border border-[#26313B] bg-[#101922] p-7">

                <h3 className="mb-6 font-serif text-[28px] text-white">
                    Practice Areas
                </h3>

                <div className="space-y-3">

                    {newsCategories.map((item: any) => (

                        <button
                            key={item.id}
                            className="
                                flex
                                w-full
                                items-center
                                justify-between
                                rounded-md
                                border
                                border-[#27323D]
                                px-4
                                py-3
                                transition
                                hover:border-[#C6A15B]
                                hover:bg-[#C6A15B]/10
                            "
                        >
                            <span className="text-[#DCE2E8]">
                                {item.name}
                            </span>

                            <span className="rounded bg-[#18222D] px-2 py-1 text-xs text-[#C6A15B]">
                                {item.total}
                            </span>

                        </button>

                    ))}

                </div>

            </div>

            {/* RECENT */}

            <div className="rounded-md border border-[#26313B] bg-[#101922] p-7">

                <h3 className="mb-6 font-serif text-[28px] text-white">
                    Recent Articles
                </h3>

                <div className="space-y-5">

                    {recentPosts.map((item: any) => (

                        <Link
                            key={item.id}
                            // to="/news/$slug"
                            to="/"
                            params={{
                                slug: item.slug,
                            }}
                            className="group flex gap-4"
                        >

                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-20 w-24 rounded object-cover"
                            />

                            <div>

                                <p className="text-sm text-[#C6A15B]">
                                    {item.date}
                                </p>

                                <h4 className="mt-2 text-[15px] font-medium leading-6 text-[#F4F1EA] transition group-hover:text-[#C6A15B]">
                                    {item.title}
                                </h4>

                            </div>

                        </Link>

                    ))}

                </div>

            </div>

            {/* CTA */}

            <div className="overflow-hidden rounded-md border border-[#C6A15B]/20 bg-gradient-to-b from-[#111B25] to-[#081119] p-8">

                <span className="text-sm uppercase tracking-[5px] text-[#C6A15B]">
                    Need Legal Help
                </span>

                <h3 className="mt-5 font-serif text-[34px] leading-tight text-white">
                    Schedule a Consultation
                </h3>

                <p className="mt-5 leading-8 text-[#A8B4BF]">
                    Speak directly with one of our experienced lawyers
                    and get trusted legal advice for your case.
                </p>

                <Link
                    to="/"
                    className="
                        mt-8
                        inline-flex
                        items-center
                        gap-3
                        rounded-md
                        bg-[#C6A15B]
                        px-6
                        py-4
                        font-medium
                        text-[#081119]
                        transition
                        hover:translate-x-1
                    "
                >
                    Contact Us

                    <IconArrowRight size={18} />

                </Link>

            </div>

        </aside>
    );
}