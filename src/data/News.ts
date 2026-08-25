export interface NewsResponse {
    data: any[];

    meta_data: {
        page: number;
        limit: number;
        totalPage: number;
        totalRows: number;
    };
}

export const dummyNews = [
    {
        id: 1,
        title:
            "Pesona Bahari Likupang, Surga Tersembunyi di Ujung Utara Sulawesi",
        excerpt:
            "Likupang menawarkan keindahan alam bawah laut, pantai eksotis, dan berbagai aktivitas wisata bahari yang memikat wisatawan.",
        category: "Daerah",
        subCategory: "Minahasa",
        date: "16 Mei 2025",
        views: 12500,
        comments: 128,
        readTime: 8,
        image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 2,
        title:
            "Inflasi Sulut April 2025 Terkendali di Angka 2,35 Persen",
        excerpt:
            "Bank Indonesia mencatat inflasi Sulawesi Utara tetap terkendali berkat stabilitas harga pangan dan energi.",
        category: "Ekonomi",
        subCategory: "Perbankan",
        date: "16 Mei 2025",
        views: 8700,
        comments: 76,
        readTime: 6,
        image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 3,
        title:
            "Festival Budaya Minahasa 2025 Resmi Dibuka di Tomohon",
        excerpt:
            "Ribuan masyarakat dan wisatawan hadir dalam pembukaan Festival Budaya Minahasa.",
        category: "Budaya",
        subCategory: "Tradisi",
        date: "16 Mei 2025",
        views: 6200,
        comments: 54,
        readTime: 5,
        image:
            "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 4,
        title:
            "Bandara Sam Ratulangi Catat Peningkatan Penumpang 15%",
        excerpt:
            "Jumlah penumpang di Bandara Internasional Sam Ratulangi meningkat signifikan.",
        category: "Daerah",
        subCategory: "Manado",
        date: "15 Mei 2025",
        views: 5100,
        comments: 39,
        readTime: 4,
        image:
            "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
    },
    {
        id: 5,
        title:
            "Sulut United Petik Kemenangan di Laga Perdana Liga 2",
        excerpt:
            "Sulut United berhasil meraih tiga poin pada pertandingan pembuka Liga 2.",
        category: "Olahraga",
        subCategory: "",
        date: "15 Mei 2025",
        views: 4300,
        comments: 41,
        readTime: 3,
        image:
            "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=85",
    },
];