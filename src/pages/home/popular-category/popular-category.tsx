import { Link } from "@tanstack/react-router";

type CategoryItem = {
    name: string;
    count: number;
    image: string;
    to: string;
};

const categories: CategoryItem[] = [
    {
        name: "Daerah",
        count: 128,
        to: "/kategori/daerah",
        image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Ekonomi",
        count: 94,
        to: "/kategori/ekonomi",
        image:
            "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Pariwisata",
        count: 86,
        to: "/kategori/pariwisata",
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Budaya",
        count: 112,
        to: "/kategori/budaya",
        image:
            "https://images.unsplash.com/photo-1524863479829-916d8e77f114?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Diaspora",
        count: 67,
        to: "/kategori/diaspora",
        image:
            "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Komunitas",
        count: 53,
        to: "/kategori/komunitas",
        image:
            "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Event",
        count: 78,
        to: "/kategori/event",
        image:
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=500&q=80",
    },
    {
        name: "Olahraga",
        count: 41,
        to: "/kategori/olahraga",
        image:
            "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500&q=80",
    },
];

export default function PopularCategories() {
    return (
        <section className="w-full mt-5">
            {/* =====================================================
                SECTION HEADER
            ====================================================== */}
            <div className="mb-2.5 flex items-center gap-2">
                <h2 className="whitespace-nowrap text-xl font-extrabold uppercase leading-none text-[#1b201d]">
                    Kategori Populer
                </h2>
                <span className="h-0.5 w-7.25 shrink-0 rounded-full bg-maron-kawanuamedia" />
            </div>

            {/* =====================================================
                CATEGORY GRID
            ====================================================== */}
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-8">
                {categories.map(
                    (category) => (
                        <Link
                            key={category.name}
                            to={category.to as never}
                            className="group relative h-15 overflow-hidden rounded-[5px] no-underline"
                        >
                            {/* Background image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover brightness-[0.58] transition-transform duration-300 ease-out group-hover:scale-105"
                            />

                            {/* Dark overlay */}

                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/5" />

                            {/* Content */}
                            <div className="absolute inset-x-2 bottom-1.5 z-10">
                                <h3 className="truncate text-sm font-bold leading-none text-white">
                                    {category.name}
                                </h3>

                                <span className="mt-0.75 block text-xs leading-none text-white/80">
                                    {category.count} Artikel
                                </span>
                            </div>
                        </Link>
                    )
                )}
            </div>
        </section>
    );
}