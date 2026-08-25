import {
    createRootRoute,
    HeadContent,
    Outlet,
} from "@tanstack/react-router";

import { createSEO, SITE_CONFIG } from "@/components/seo/SEO";

const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",

    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,

    description: SITE_CONFIG.description,

    url: SITE_CONFIG.url,

    logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    },

    image: `${SITE_CONFIG.url}${SITE_CONFIG.defaultImage}`,

    sameAs: [
        // Tambahkan social media resmi Kawanua Media di sini
        // "https://www.facebook.com/kawanuamedia",
        // "https://www.instagram.com/kawanuamedia",
        // "https://x.com/KawanuaMedia",
        // "https://www.youtube.com/@KawanuaMedia",
    ],

    areaServed: {
        "@type": "Country",
        name: "Indonesia",
    },

    knowsAbout: [
        "Sulawesi Utara",
        "Manado",
        "Berita Nasional",
        "Politik",
        "Ekonomi",
        "Lifestyle",
        "Olahraga",
    ],
};

export const Route = createRootRoute({
    head: () =>
        createSEO({
            description: SITE_CONFIG.description,
            path: "/",
            structuredData: organizationSchema,
        }),

    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <HeadContent />
            <Outlet />
        </>
    );
}