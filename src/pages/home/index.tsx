import MainLayout from "@/pages/layouts/MainLayout";

// SECTIONS
import Headline from "./headline/headline";
import PopularNews from "./popularnews/popular-news";
import LatestNews from "./latest-news/latest-news";
import NewsFeatureCard from "./_components/news-feature-card";
import FollowUs from "./follow-us/follow-us";
import PopularCategories from "./popular-category/popular-category";
import AdBanner from "./ads-banner/ads-banner";
import PopularVideo from "./popular-video/popular-video";
import KawanuaPodcast from "./kawanua-podcast/kawanua-podcast";

// IMPORT DATA
import { editorChoice, trendingNews } from "@/data/Home";

const Home = () => {
    return (
        <MainLayout>
            <main className="bg-white">
                {/* =====================================================
                    HERO AREA
                ====================================================== */}
                <section id="home" className="mx-auto w-full container-custom px-5 pt-3">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,2fr)_0.8fr]">
                        {/* HEADLINE */}
                        <Headline />

                        {/* TERPOPULER */}
                        <PopularNews />
                        {/* <p>POPULAR NEWS</p> */}
                    </div>
                </section>

                {/* =====================================================
                    MAIN CONTENT
                ====================================================== */}
                <section className="mx-auto w-full container-custom px-5 pt-4 pb-8">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
                        {/* =================================================
                            LEFT CONTENT
                        ================================================== */}
                        <div className="min-w-0">
                            {/* ---------------------------------------------
                                BERITA TERBARU / TRENDING / PILIHAN REDAKSI
                            ---------------------------------------------- */}
                            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
                                {/* Berita Terbaru */}
                                {/* <p>LATEST NEWS</p> */}
                                <LatestNews />

                                {/* Trending */}
                                <NewsFeatureCard
                                    title="Trending"
                                    icon={<span>🔥</span>}
                                    items={trendingNews}
                                />

                                {/* Pilihan Redaksi */}
                                <NewsFeatureCard
                                    title="Pilihan Redaksi"
                                    items={editorChoice}
                                />
                                {/* <EditorChoice /> */}
                            </div>

                            {/* ---------------------------------------------
                                KATEGORI POPULER
                            ---------------------------------------------- */}
                            <div className="mt-3">
                                <PopularCategories />
                            </div>
                        </div>

                        {/* =================================================
                            RIGHT SIDEBAR
                        ================================================== */}
                        <aside className="flex flex-col gap-3">
                            {/* Ikuti Kami */}
                            {/* <p>FOLOW US</p> */}
                            <FollowUs />

                            {/* Iklan */}
                            {/* <p>IKLAN BANNER</p> */}
                            <AdBanner />

                            {/* Video Populer */}
                            <PopularVideo />

                            {/* Kawanua Podcast */}
                            <KawanuaPodcast />
                        </aside>
                    </div>
                </section>
            </main>
        </MainLayout>
    );
};

export default Home;