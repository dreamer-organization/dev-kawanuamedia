import {
    useEffect,
    useState,
} from "react";

import {
    IconChevronRight,
    IconHome,
} from "@tabler/icons-react";

import {
    Link,
} from "@tanstack/react-router";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    type SortingState,
} from "@tanstack/react-table";

import {
    useDebounce,
} from "@/hooks/use-debounce";

// import {
//     getNewsMutationFn,
// } from "@/services/news";

import MainLayout from "../layouts/MainLayout";

import NewsCategoryFilter from "./_components/news-category-filter";

import NewsToolbar from "./_components/news-toolbar";

import NewsCard, {
    type NewsListItem,
} from "./_components/news-card";

import NewsPagination from "./news-pagination";

import FollowUs from "../home/follow-us/follow-us";

import KawanuaPodcast from "../home/kawanua-podcast/kawanua-podcast";

import AdBanner from "../home/ads-banner/ads-banner";
import { getNewsFn } from "@/api/api-news";
import { toast } from "sonner";
import PopularNews from "../home/popularnews/popular-news";

// import PopularNewsSidebar from "./_components/popular-news-sidebar";


export default function NewsPage() {
    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    const [search, setSearch] = useState("");

    /*
    |--------------------------------------------------------------------------
    | PAGINATION
    |--------------------------------------------------------------------------
    */

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(0);


    /*
    |--------------------------------------------------------------------------
    | FILTER
    |--------------------------------------------------------------------------
    */

    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");


    /*
    |--------------------------------------------------------------------------
    | DEBOUNCE SEARCH
    |--------------------------------------------------------------------------
    */

    const debounceSearch =
        useDebounce(
            search,
            500,
        );


    /*
    |--------------------------------------------------------------------------
    | CALL API
    |--------------------------------------------------------------------------
    */

    const {
        data: dataBerita,
        isLoading,
        isFetching,
        error,
        isError,
    } = useQuery({
        queryKey: [
            "data-list-berita",
            limit,
            page,
            selectedCategory,
            selectedSubCategory,
            debounceSearch,
        ],

        queryFn: () =>
            getNewsFn(
                limit,
                page,
                selectedCategory,
                selectedSubCategory,
                debounceSearch,
            ),

        staleTime: 0,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (isError) {
            toast.error(`Failed to fetch news: ${(error as any)?.description || "Unknown error"}`);
        }
    }, [isError]);

    useEffect(() => {
        if (dataBerita) {
            setLimit(dataBerita?.meta_data?.limit || 10)
            setPage(dataBerita?.meta_data?.page || 1)
            setTotalRows(dataBerita?.meta_data?.totalRows)
            setTotalPages(dataBerita?.meta_data?.totalPage)
        }
    }, [dataBerita]);

    /*
    |--------------------------------------------------------------------------
    | SEARCH CHANGE
    |--------------------------------------------------------------------------
    */
    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handlePageChange = (
        nextPage: number,
    ) => {
        setPage(nextPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <MainLayout>
            <main className="container-custom bg-white">
                {/* ======================================================
                    CONTENT WRAPPER
                ======================================================= */}
                <div className="pb-12">
                    {/* ====================================================
                        BREADCRUMB
                    ===================================================== */}
                    <div className="mb-5 flex items-center gap-1.5 text-sm text-maron-kawanuamedia-200">
                        <Link
                            to="/"
                            className="flex items-center gap-1 no-underline transition hover:text-maron-kawanuamedia"
                        >
                            <IconHome
                                size={11}
                                stroke={1.7}
                            />
                            Beranda
                        </Link>
                        <IconChevronRight size={10} />
                        <span> Berita </span>
                    </div>

                    {/* ====================================================
                        PAGE CONTENT
                    ===================================================== */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
                        {/* ==================================================
                            LEFT
                        =================================================== */}
                        <div className="min-w-0">
                            {/* ==============================================
                                PAGE HEADER
                            =============================================== */}
                            <div>
                                <h1 className="font-['Plus_Jakarta_Sans'] text-4xl font-extrabold leading-none tracking-[-1px] text-[#111715]">
                                    Berita
                                </h1>

                                <p className="mt-2 text-[10px] leading-normal text-[#707873]">
                                    Informasi terbaru dan
                                    terpercaya seputar
                                    Sulawesi Utara,
                                    Indonesia, dan dunia.
                                </p>
                            </div>

                            {/* ==============================================
                                SEARCH
                            =============================================== */}
                            <div className="mt-4">
                                <input
                                    value={search}
                                    onChange={(
                                        event,
                                    ) =>
                                        handleSearchChange(
                                            event
                                                .target
                                                .value,
                                        )
                                    }
                                    placeholder="Cari berita..."
                                    className="h-10 w-full rounded-md border border-[#DDE3DF] bg-white px-3 text-[10px] text-slate-700 outline-none transition focus:border-[#08763E] focus:ring-2 focus:ring-[#08763E]/10"
                                />
                            </div>

                            {/* ==============================================
                                CATEGORY FILTER
                            =============================================== */}
                            <div className="mt-4">
                                <NewsCategoryFilter
                                    category={selectedCategory}
                                    subCategory={selectedSubCategory}
                                    // categories={categories}
                                    loading={isFetching}
                                    onApply={(category, subCategory) => {
                                        setSelectedCategory(category);
                                        setSelectedSubCategory(
                                            subCategory,
                                        );
                                        setPage(1);
                                    }}
                                    onReset={() => {
                                        setSelectedCategory("");
                                        setSelectedSubCategory("");
                                        setPage(1);
                                    }}
                                />
                            </div>

                            {/* ==============================================
                                TOOLBAR
                            =============================================== */}
                            <div className="mt-4">
                                <NewsToolbar
                                    total={ totalRows }
                                    currentPage={ page }
                                    perPage={ limit }
                                />
                            </div>

                            {/* ==============================================
                                LOADING OVERLAY
                            =============================================== */}
                            <div className="relative">
                                {isFetching && !isLoading && (
                                    <div className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden bg-[#E5ECE8]">
                                        <div className="h-full w-1/3 animate-[loading_1s_ease-in-out_infinite] bg-[#08763E]"/>
                                    </div>
                                )}

                                {/* ==========================================
                                    NEWS LIST
                                =========================================== */}
                                <div
                                    className={`space-y-3 transition-opacity duration-200
                                        ${isFetching
                                            ? "opacity-60"
                                            : "opacity-100"
                                        }
                                    `}
                                >
                                    {isLoading ? (
                                        <NewsSkeleton />
                                    ) : dataBerita !== undefined ? (
                                        dataBerita?.data?.map((item: any) => (
                                            <NewsCard
                                                key={
                                                    item.id
                                                }
                                                item={{
                                                    ...item,

                                                    /*
                                                     * Kalau API kamu
                                                     * sudah mengirim
                                                     * format string,
                                                     * bagian ini bisa
                                                     * dihapus.
                                                     */
                                                    views:
                                                        typeof item.views ===
                                                            "number"
                                                            ? item.views.toLocaleString(
                                                                "id-ID",
                                                            )
                                                            : item.views,

                                                    comments:
                                                        typeof item.comments ===
                                                            "number"
                                                            ? item.comments.toString()
                                                            : item.comments,

                                                    readTime:
                                                        typeof item.readTime ===
                                                            "number"
                                                            ? `${item.readTime} menit baca`
                                                            : item.readTime,
                                                }}
                                            />
                                        ))
                                    )
                                    //  : dataBerita.data?.length !== 0 ? (
                                    //     <EmptyNews />
                                    // )
                                     : (
                                        <FailedFetchNews />
                                    )}
                                </div>
                            </div>


                            {/* ==============================================
                                PAGINATION
                            =============================================== */}
                            {totalPages > 0 && (
                                <div className="mt-5">
                                    <NewsPagination
                                        currentPage={ page }
                                        totalPages={ totalPages }
                                        onChange={ handlePageChange }
                                    />
                                </div>
                            )}
                        </div>


                        {/* ==================================================
                            RIGHT SIDEBAR
                        =================================================== */}
                        <aside className="flex flex-col gap-3">
                            {/* <PopularNewsSidebar /> */}
                            <PopularNews />
                            <FollowUs />
                            <KawanuaPodcast />
                            <AdBanner />
                        </aside>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}


/* ============================================================
   LOADING SKELETON
============================================================ */
function NewsSkeleton() {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="grid animate-pulse grid-cols-[305px_1fr] gap-5 border-b border-[#E7EBE9] pb-3">
                    <div className="h-35.25 rounded-[7px] bg-[#EEF1EF]" />
                    <div className="flex flex-col justify-center gap-3">
                        <div className="h-2 w-16 rounded bg-[#EEF1EF]" />
                        <div className="h-4 w-4/5 rounded bg-[#EEF1EF]" />
                        <div className="h-3 w-full rounded bg-[#EEF1EF]" />
                        <div className="h-2 w-2/5 rounded bg-[#EEF1EF]" />
                    </div>
                </div>
            ))}
        </>
    );
}


/* ============================================================
   EMPTY AND BUSY
============================================================ */
function EmptyNews() {
    return (
        <div
            className="
                rounded-lg
                border
                border-dashed
                border-[#DDE3DF]
                py-16
                text-center
            "
        >
            <p className="text-[11px] text-[#7A837E]">
                Tidak ada berita
                untuk filter yang
                dipilih.
            </p>
        </div>
    );
}
function FailedFetchNews() {
    return (
        <div
            className="
                rounded-lg
                border
                border-dashed
                border-[#DDE3DF]
                py-16
                text-center
            "
        >
            <p className="text-[11px] text-[#7A837E]">
                Server busy.
            </p>
        </div>
    );
}