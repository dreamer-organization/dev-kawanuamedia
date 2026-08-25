export const SITE_CONFIG = {
    name: "Kawanua Media",
    shortName: "Kawanua Media",

    description:
        "Kawanua Media menyajikan berita terkini dan terpercaya seputar Sulawesi Utara, Manado, nasional, politik, ekonomi, lifestyle, olahraga, dan berbagai informasi terbaru.",

    url:
        import.meta.env.VITE_SITE_URL ||
        "https://kawanuamedia.com",

    logo: "/logo-kawanua-media.svg",

    defaultImage: "/og-image.jpg",

    twitterHandle: "@KawanuaMedia",

    locale: "id_ID",

    language: "id-ID",

    keywords: [
        "Kawanua Media",
        "berita Kawanua",
        "berita Sulawesi Utara",
        "berita Manado",
        "berita terbaru Manado",
        "berita terbaru Sulawesi Utara",
        "berita Indonesia",
        "berita nasional",
        "berita terkini",
        "info Manado",
        "info Sulawesi Utara",
        "media Sulawesi Utara",
        "portal berita Manado",
        "portal berita Sulawesi Utara",
    ],
};

type SEOOptions = {
    title?: string;
    description?: string;
    path?: string;
    image?: string;

    type?: "website" | "article" | "profile";

    keywords?: string[];

    structuredData?: Record<string, unknown>;

    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
};

export function createSEO({
    title,
    description = SITE_CONFIG.description,
    path = "/",
    image = SITE_CONFIG.defaultImage,
    type = "website",
    keywords = [],
    structuredData,
    publishedTime,
    modifiedTime,
    author,
}: SEOOptions = {}) {
    const pageTitle = title
        ? `${title} | ${SITE_CONFIG.name}`
        : SITE_CONFIG.name;

    const canonicalUrl = new URL(
        path,
        SITE_CONFIG.url
    ).toString();

    const imageUrl = new URL(
        image,
        SITE_CONFIG.url
    ).toString();

    const meta = [
        // Basic SEO
        {
            title: pageTitle,
        },
        {
            name: "description",
            content: description,
        },
        {
            name: "keywords",
            content: [
                ...SITE_CONFIG.keywords,
                ...keywords,
            ]
                .filter(
                    (keyword, index, array) =>
                        array.indexOf(keyword) === index
                )
                .join(", "),
        },
        {
            name: "author",
            content: author || SITE_CONFIG.name,
        },
        {
            name: "robots",
            content:
                "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        },

        // Language
        {
            httpEquiv: "content-language",
            content: SITE_CONFIG.language,
        },

        // Open Graph
        {
            property: "og:type",
            content: type,
        },
        {
            property: "og:title",
            content: pageTitle,
        },
        {
            property: "og:description",
            content: description,
        },
        {
            property: "og:url",
            content: canonicalUrl,
        },
        {
            property: "og:image",
            content: imageUrl,
        },
        {
            property: "og:image:alt",
            content: pageTitle,
        },
        {
            property: "og:site_name",
            content: SITE_CONFIG.name,
        },
        {
            property: "og:locale",
            content: SITE_CONFIG.locale,
        },

        // Twitter / X
        {
            name: "twitter:card",
            content: "summary_large_image",
        },
        {
            name: "twitter:title",
            content: pageTitle,
        },
        {
            name: "twitter:description",
            content: description,
        },
        {
            name: "twitter:image",
            content: imageUrl,
        },
        {
            name: "twitter:site",
            content: SITE_CONFIG.twitterHandle,
        },
    ];

    // Article specific metadata
    if (type === "article") {
        if (publishedTime) {
            meta.push({
                property: "article:published_time",
                content: publishedTime,
            });
        }

        if (modifiedTime) {
            meta.push({
                property: "article:modified_time",
                content: modifiedTime,
            });
        }

        if (author) {
            meta.push({
                property: "article:author",
                content: author,
            });
        }
    }

    return {
        meta,

        links: [
            {
                rel: "canonical",
                href: canonicalUrl,
            },
        ],

        scripts: structuredData
            ? [
                {
                    type: "application/ld+json",
                    children: JSON.stringify(structuredData),
                },
            ]
            : [],
    };
}