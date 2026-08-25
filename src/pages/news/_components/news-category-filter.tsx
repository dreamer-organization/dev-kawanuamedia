import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    IconCheck,
    IconChevronDown,
    IconFilter,
    IconRotate,
} from "@tabler/icons-react";

export type NewsSubCategory = {
    id: string | number;
    name: string;
    slug: string;
};

export type NewsCategory = {
    id: string | number;
    name: string;
    slug: string;
    children?: NewsSubCategory[];
};

interface Props {
    /**
     * Filter yang sedang diterapkan dari parent.
     */
    category: string;
    subCategory: string;

    /**
     * Data kategori dari API / fallback.
     */
    categories?: NewsCategory[];

    /**
     * Dipanggil HANYA ketika user klik
     * tombol "Terapkan Filter".
     */
    onApply: (
        category: string,
        subCategory: string,
    ) => void;

    /**
     * Reset filter yang sudah diterapkan.
     */
    onReset?: () => void;

    /**
     * Loading dari API.
     */
    loading?: boolean;

    /**
     * Menampilkan "Semua".
     */
    showAll?: boolean;
}

const DEFAULT_CATEGORIES: NewsCategory[] = [
    {
        id: "daerah",
        name: "Daerah",
        slug: "daerah",
        children: [
            {
                id: "manado",
                name: "Manado",
                slug: "manado",
            },
            {
                id: "minahasa",
                name: "Minahasa",
                slug: "minahasa",
            },
            {
                id: "tomohon",
                name: "Tomohon",
                slug: "tomohon",
            },
            {
                id: "bitung",
                name: "Bitung",
                slug: "bitung",
            },
            {
                id: "talaud",
                name: "Kepulauan Talaud",
                slug: "talaud",
            },
        ],
    },
    {
        id: "nasional",
        name: "Nasional",
        slug: "nasional",
    },
    {
        id: "internasional",
        name: "Internasional",
        slug: "internasional",
    },
    {
        id: "ekonomi",
        name: "Ekonomi",
        slug: "ekonomi",
        children: [
            {
                id: "umkm",
                name: "UMKM",
                slug: "umkm",
            },
            {
                id: "investasi",
                name: "Investasi",
                slug: "investasi",
            },
            {
                id: "perbankan",
                name: "Perbankan",
                slug: "perbankan",
            },
        ],
    },
    {
        id: "pariwisata",
        name: "Pariwisata",
        slug: "pariwisata",
    },
    {
        id: "budaya",
        name: "Budaya",
        slug: "budaya",
        children: [
            {
                id: "tradisi",
                name: "Tradisi",
                slug: "tradisi",
            },
            {
                id: "seni",
                name: "Seni",
                slug: "seni",
            },
            {
                id: "kuliner",
                name: "Kuliner",
                slug: "kuliner",
            },
        ],
    },
    {
        id: "diaspora",
        name: "Diaspora",
        slug: "diaspora",
    },
    {
        id: "komunitas",
        name: "Komunitas",
        slug: "komunitas",
    },
    {
        id: "event",
        name: "Event",
        slug: "event",
    },
    {
        id: "olahraga",
        name: "Olahraga",
        slug: "olahraga",
    },
];

export default function NewsCategoryFilter({
    category,
    subCategory,
    categories = DEFAULT_CATEGORIES,
    onApply,
    onReset,
    loading = false,
    showAll = true,
}: Props) {
    /**
     * =========================================================
     * DRAFT STATE
     *
     * State ini TIDAK masuk ke query API.
     * =========================================================
     */
    const [draftCategory, setDraftCategory] =
        useState(category);

    const [draftSubCategory, setDraftSubCategory] =
        useState(subCategory);

    /**
     * =========================================================
     * SINKRONISASI DENGAN PARENT
     *
     * Hanya ketika filter yang sudah diterapkan
     * dari parent berubah.
     * =========================================================
     */
    useEffect(() => {
        setDraftCategory(category);
        setDraftSubCategory(subCategory);
    }, [category, subCategory]);

    /**
     * =========================================================
     * ACTIVE CATEGORY
     * =========================================================
     */
    const activeCategory = useMemo(() => {
        return categories.find(
            (item) =>
                item.slug === draftCategory,
        );
    }, [
        categories,
        draftCategory,
    ]);

    /**
     * =========================================================
     * SUB CATEGORY
     * =========================================================
     */
    const subCategories =
        activeCategory?.children ?? [];

    const hasSubCategory =
        subCategories.length > 0;

    /**
     * =========================================================
     * CHANGE CATEGORY
     *
     * Hanya mengubah draft.
     * TIDAK trigger API.
     * =========================================================
     */
    const handleCategoryChange = (
        value: string,
    ) => {
        if (loading) {
            return;
        }

        setDraftCategory(value);

        /**
         * Ketika parent category berubah,
         * child harus reset.
         */
        setDraftSubCategory("");
    };

    /**
     * =========================================================
     * CHANGE SUB CATEGORY
     *
     * Hanya mengubah draft.
     * TIDAK trigger API.
     * =========================================================
     */
    const handleSubCategoryChange = (
        value: string,
    ) => {
        if (loading) {
            return;
        }

        setDraftSubCategory(value);
    };

    /**
     * =========================================================
     * APPLY FILTER
     *
     * HANYA di sini parent diberitahu
     * untuk mengubah filter API.
     * =========================================================
     */
    const handleApply = () => {
        if (loading) {
            return;
        }

        onApply(
            draftCategory,
            draftSubCategory,
        );
    };

    /**
     * =========================================================
     * RESET FILTER
     * =========================================================
     */
    const handleReset = () => {
        if (loading) {
            return;
        }

        setDraftCategory("");
        setDraftSubCategory("");

        onReset?.();

        /**
         * Kalau parent tidak menyediakan onReset,
         * tetap apply filter kosong.
         */
        if (!onReset) {
            onApply("", "");
        }
    };

    /**
     * =========================================================
     * CHECK DIRTY
     * =========================================================
     */
    const isDirty =
        draftCategory !== category ||
        draftSubCategory !== subCategory;

    return (
        <section className="w-full">
            {/* ==================================================
                DESKTOP / TABLET
            =================================================== */}

            <div className="hidden md:block">
                {/* ==============================================
                    MAIN CATEGORY
                =============================================== */}

                <div className="flex flex-wrap gap-2">
                    {showAll && (
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                handleCategoryChange(
                                    "",
                                )
                            }
                            className={`
                                shrink-0
                                rounded-[6px]
                                border
                                px-3
                                py-2
                                text-[9px]
                                font-medium
                                transition-all
                                duration-200

                                ${
                                    draftCategory ===
                                    ""
                                        ? "border-maron-kawanuamedia bg-maron-kawanuamedia text-white shadow-sm"
                                        : "border-[#DDE3DF] bg-white text-[#4F5954] hover:border-maron-kawanuamedia hover:text-maron-kawanuamedia"
                                }

                                ${
                                    loading
                                        ? "cursor-not-allowed opacity-50"
                                        : "cursor-pointer"
                                }
                            `}
                        >
                            Semua
                        </button>
                    )}

                    {categories.map(
                        (item) => {
                            const active =
                                item.slug ===
                                draftCategory;

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    disabled={
                                        loading
                                    }
                                    onClick={() =>
                                        handleCategoryChange(
                                            item.slug,
                                        )
                                    }
                                    className={`
                                        shrink-0
                                        rounded-[6px]
                                        border
                                        px-3
                                        py-2
                                        text-[9px]
                                        font-medium
                                        transition-all
                                        duration-200

                                        ${
                                            active
                                                ? "border-maron-kawanuamedia bg-maron-kawanuamedia text-white shadow-sm"
                                                : "border-[#DDE3DF] bg-white text-[#4F5954] hover:border-maron-kawanuamedia hover:text-maron-kawanuamedia"
                                        }

                                        ${
                                            loading
                                                ? "cursor-not-allowed opacity-50"
                                                : "cursor-pointer"
                                        }
                                    `}
                                >
                                    {item.name}

                                    {item.children?.length ? (
                                        <span className="ml-1 opacity-60">
                                            ({item.children.length})
                                        </span>
                                    ) : null}
                                </button>
                            );
                        },
                    )}
                </div>

                {/* ==============================================
                    SUB CATEGORY
                =============================================== */}

                {hasSubCategory && (
                    <div
                        className="
                            mt-3
                            flex
                            flex-wrap
                            items-center
                            gap-1
                            border-l-2
                            border-maron-kawanuamedia
                            pl-3
                        "
                    >
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                handleSubCategoryChange(
                                    "",
                                )
                            }
                            className={`
                                shrink-0
                                rounded-[5px]
                                px-3
                                py-1.5
                                text-[8px]
                                font-medium
                                transition-all
                                duration-200

                                ${
                                    draftSubCategory ===
                                    ""
                                        ? "bg-[#EFF7F2] text-maron-kawanuamedia"
                                        : "text-[#727A76] hover:bg-[#F4F6F5] hover:text-maron-kawanuamedia"
                                }

                                ${
                                    loading
                                        ? "cursor-not-allowed opacity-50"
                                        : "cursor-pointer"
                                }
                            `}
                        >
                            Semua{" "}
                            {activeCategory?.name ??
                                "Kategori"}
                        </button>

                        {subCategories.map(
                            (item) => {
                                const active =
                                    item.slug ===
                                    draftSubCategory;

                                return (
                                    <button
                                        key={
                                            item.id
                                        }
                                        type="button"
                                        disabled={
                                            loading
                                        }
                                        onClick={() =>
                                            handleSubCategoryChange(
                                                item.slug,
                                            )
                                        }
                                        className={`
                                            shrink-0
                                            rounded-[5px]
                                            px-3
                                            py-1.5
                                            text-[8px]
                                            font-medium
                                            transition-all
                                            duration-200

                                            ${
                                                active
                                                    ? "bg-maron-kawanuamedia text-white"
                                                    : "text-[#727A76] hover:bg-[#F4F6F5] hover:text-maron-kawanuamedia"
                                            }

                                            ${
                                                loading
                                                    ? "cursor-not-allowed opacity-50"
                                                    : "cursor-pointer"
                                            }
                                        `}
                                    >
                                        {item.name}
                                    </button>
                                );
                            },
                        )}
                    </div>
                )}
            </div>

            {/* ==================================================
                MOBILE
            =================================================== */}

            <div className="grid grid-cols-1 gap-2 md:hidden">
                {/* Category */}

                <div className="relative">
                    <select
                        value={draftCategory}
                        disabled={loading}
                        onChange={(
                            event,
                        ) =>
                            handleCategoryChange(
                                event.target.value,
                            )
                        }
                        className="
                            h-10
                            w-full
                            appearance-none
                            rounded-[6px]
                            border
                            border-[#DDE3DF]
                            bg-white
                            px-3
                            pr-10
                            text-[10px]
                            font-medium
                            text-[#4F5954]
                            outline-none
                            focus:border-maron-kawanuamedia
                            focus:ring-2
                            focus:ring-maron-kawanuamedia/10
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        {showAll && (
                            <option value="">
                                Semua
                            </option>
                        )}

                        {categories.map(
                            (item) => (
                                <option
                                    key={
                                        item.id
                                    }
                                    value={
                                        item.slug
                                    }
                                >
                                    {item.name}
                                </option>
                            ),
                        )}
                    </select>

                    <IconChevronDown
                        size={14}
                        stroke={1.8}
                        className="
                            pointer-events-none
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-[#727A76]
                        "
                    />
                </div>

                {/* Sub Category */}

                {hasSubCategory && (
                    <div className="relative">
                        <select
                            value={
                                draftSubCategory
                            }
                            disabled={
                                loading
                            }
                            onChange={(
                                event,
                            ) =>
                                handleSubCategoryChange(
                                    event.target
                                        .value,
                                )
                            }
                            className="
                                h-10
                                w-full
                                appearance-none
                                rounded-[6px]
                                border
                                border-[#DDE3DF]
                                bg-white
                                px-3
                                pr-10
                                text-[10px]
                                font-medium
                                text-[#4F5954]
                                outline-none
                                focus:border-maron-kawanuamedia
                                focus:ring-2
                                focus:ring-maron-kawanuamedia/10
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            <option value="">
                                Semua{" "}
                                {
                                    activeCategory?.name
                                }
                            </option>

                            {subCategories.map(
                                (
                                    item,
                                ) => (
                                    <option
                                        key={
                                            item.id
                                        }
                                        value={
                                            item.slug
                                        }
                                    >
                                        {item.name}
                                    </option>
                                ),
                            )}
                        </select>

                        <IconChevronDown
                            size={14}
                            stroke={1.8}
                            className="
                                pointer-events-none
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                text-[#727A76]
                            "
                        />
                    </div>
                )}
            </div>

            {/* ==================================================
                PREVIEW FILTER
            =================================================== */}

            {(draftCategory ||
                draftSubCategory) && (
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="text-[8px] text-[#8A928E]">
                        Pilihan:
                    </span>

                    {draftCategory && (
                        <span className="rounded-[4px] bg-[#EFF7F2] px-2 py-1 text-[8px] font-medium text-maron-kawanuamedia">
                            {
                                activeCategory?.name
                            }
                        </span>
                    )}

                    {draftSubCategory && (
                        <>
                            <span className="text-[8px] text-[#A1A8A4]">
                                /
                            </span>

                            <span className="rounded-[4px] bg-[#EFF7F2] px-2 py-1 text-[8px] font-medium text-maron-kawanuamedia">
                                {
                                    subCategories.find(
                                        (
                                            item,
                                        ) =>
                                            item.slug ===
                                            draftSubCategory,
                                    )?.name
                                }
                            </span>
                        </>
                    )}
                </div>
            )}

            {/* ==================================================
                ACTIONS
            =================================================== */}

            <div className="mt-4 flex items-center gap-2">
                {/* Reset */}

                <button
                    type="button"
                    disabled={
                        loading ||
                        (!category &&
                            !subCategory &&
                            !draftCategory &&
                            !draftSubCategory)
                    }
                    onClick={
                        handleReset
                    }
                    className="
                        inline-flex
                        h-9
                        items-center
                        justify-center
                        gap-1.5
                        rounded-[6px]
                        border
                        border-[#DDE3DF]
                        bg-white
                        px-3
                        text-[9px]
                        font-medium
                        text-[#68716C]
                        transition
                        hover:border-maron-kawanuamedia
                        hover:text-maron-kawanuamedia
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <IconRotate
                        size={13}
                        stroke={1.8}
                    />

                    Reset
                </button>

                {/* Apply */}

                <button
                    type="button"
                    disabled={
                        loading ||
                        !isDirty
                    }
                    onClick={
                        handleApply
                    }
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-md bg-maron-kawanuamedia px-4 text-[9px] font-semibold text-white shadow-sm transition hover:bg-maron-kawanuamedia-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                    <IconCheck
                        size={13}
                        stroke={2}
                    />

                    Terapkan Filter
                </button>
            </div>

            {/* ==================================================
                LOADING
            =================================================== */}

            {loading && (
                <div className="mt-2 flex items-center gap-2 text-[8px] text-[#7B847F]">
                    <span
                        className="
                            h-3
                            w-3
                            animate-spin
                            rounded-full
                            border-2
                            border-[#D8E5DD]
                            border-t-maron-kawanuamedia
                        "
                    />

                    Memuat berita...
                </div>
            )}
        </section>
    );
}