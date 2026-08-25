import { createSEO } from "@/components/seo/SEO";
import Home from "@/pages/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
    head: () =>
        createSEO({
            title: "Berita Terkini Sulawesi Utara & Manado",
            description:
                "Kawanua Media menyajikan berita terkini dan terpercaya seputar Sulawesi Utara, Manado, nasional, politik, ekonomi, lifestyle, olahraga, dan berbagai informasi terbaru.",
            path: "/",
            keywords: [
                "berita terkini Sulawesi Utara",
                "berita terkini Manado",
                "berita Manado hari ini",
                "berita Sulawesi Utara hari ini",
            ],
        }),

    component: Home,
});