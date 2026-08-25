export interface NewsItem {
    id: number;
    image: string;
    date: string;
    category: string;
    title: string;
    description: string;
    slug: string;
}

export const newsData: NewsItem[] = [
    {
        id: 1,
        image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
        date: "12 May 2024",
        category: "INTELLECTUAL PROPERTY",
        title:
            "Trademark Registration: Benefits, Protection, and Legal Risks",
        description:
            "Understanding the crucial steps and benefits of registering your company's trademark in Indonesia to prevent future disputes.",
        slug: "trademark-registration",
    },

    {
        id: 2,
        image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80",
        date: "28 Apr 2024",
        category: "CORPORATE LAW",
        title:
            "New Regulations on Foreign Direct Investment in Tech Sector",
        description:
            "A comprehensive breakdown of the latest government policies affecting foreign investors looking to establish tech startups.",
        slug: "foreign-investment",
    },

    {
        id: 3,
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        date: "15 Mar 2024",
        category: "LABOR LAW",
        title:
            "Navigating Employee Termination: A Guide for Employers",
        description:
            "Best practices and legal requirements for handling employee termination to minimize the risk of industrial relations disputes.",
        slug: "employee-termination",
    },

    {
        id: 4,
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        date: "15 Mar 2024",
        category: "LABOR LAW",
        title:
            "Navigating Employee Termination: A Guide for Employers",
        description:
            "Best practices and legal requirements for handling employee termination to minimize the risk of industrial relations disputes.",
        slug: "employee-termination",
    },

    {
        id: 5,
        image:
            "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80",
        date: "15 Mar 2024",
        category: "LABOR LAW",
        title:
            "Navigating Employee Termination: A Guide for Employers",
        description:
            "Best practices and legal requirements for handling employee termination to minimize the risk of industrial relations disputes.",
        slug: "employee-termination",
    },
];

export const newsDetail = {
    success: true,
    message: "Success",
    data: {
    id: 1,

    slug: "trademark-registration",

    title: "Corporate Law Update for Businesses in 2026",

    category: "Corporate Law",

    description:
        "Corporate law continues to evolve as governments introduce new regulations aimed at improving transparency, governance, and investor protection. Businesses should stay informed to remain compliant and competitive.",

    image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600",

    author: {
        name: "John Anderson",
        position: "Senior Partner",
        avatar:
            "https://randomuser.me/api/portraits/men/32.jpg",
        email: "john.anderson@sgs-law.com",
        linkedin: "#",
    },

    publishedAt: "12 January 2026",

    readTime: "6 min read",

    tags: [
        "Corporate",
        "Business",
        "Compliance",
        "Legal Update",
    ],

    seo: {
        meta_title:
            "Corporate Law Update 2026 | SGS Law Firm",
        meta_description:
            "Learn the latest corporate law changes affecting businesses in 2026.",
        keywords: [
            "Corporate Law",
            "Law Firm",
            "Business",
            "Legal",
        ],
    },

    content: `
<h2>Keuntungan dan Kerugian terhadap Merek yang Telah dan Belum Didaftarkan</h2>

<p>
Merek merupakan identitas yang membedakan suatu produk maupun jasa dengan produk lainnya.
Selain berfungsi sebagai identitas, merek juga menjadi aset perusahaan yang memiliki nilai ekonomi
dan memberikan perlindungan hukum kepada pemiliknya apabila telah didaftarkan sesuai ketentuan
peraturan perundang-undangan.
</p>

<p>
Masih banyak pelaku usaha yang menganggap pendaftaran merek bukan merupakan prioritas.
Padahal, tanpa pendaftaran, pemilik usaha berpotensi kehilangan hak atas mereknya apabila
didahului oleh pihak lain.
</p>

<figure class="image">
<img
src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200"
alt="Trademark"
/>
<figcaption>Trademark Registration Process</figcaption>
</figure>

<h3>Kerugian Apabila Merek Belum Didaftarkan</h3>

<ol>
<li>
<strong>Tidak Memiliki Perlindungan Hukum</strong>

<p>
Merek yang belum didaftarkan tidak memperoleh hak eksklusif sebagaimana diatur dalam
Undang-Undang Merek sehingga pemilik akan kesulitan melakukan upaya hukum terhadap
pelanggaran yang dilakukan pihak lain.
</p>
</li>

<li>
<strong>Berpotensi Didahului Pihak Lain</strong>

<p>
Indonesia menerapkan prinsip <strong>First to File</strong>, sehingga hak atas merek
diberikan kepada pihak yang lebih dahulu mengajukan permohonan pendaftaran.
</p>
</li>

<li>
<strong>Nilai Bisnis Menjadi Lebih Rendah</strong>

<p>
Merek yang belum terdaftar cenderung memiliki nilai komersial yang lebih rendah karena
belum memiliki kepastian hukum bagi investor maupun calon mitra bisnis.
</p>
</li>
</ol>

<h3>Keuntungan Setelah Merek Terdaftar</h3>

<ul>
<li>Memiliki hak eksklusif atas penggunaan merek.</li>

<li>Dapat melarang pihak lain menggunakan merek yang sama.</li>

<li>Meningkatkan kepercayaan pelanggan.</li>

<li>Menjadi aset perusahaan yang dapat dialihkan maupun dilisensikan.</li>

<li>Memberikan nilai tambah bagi perusahaan ketika mencari investor.</li>
</ul>

<blockquote>
<p>
"Pendaftaran merek bukan sekadar formalitas administrasi, melainkan investasi jangka panjang
untuk melindungi identitas dan reputasi bisnis."
</p>
</blockquote>

<h3>Perbandingan Singkat</h3>

<table>
<thead>
<tr>
<th>Aspek</th>
<th>Merek Terdaftar</th>
<th>Belum Terdaftar</th>
</tr>
</thead>

<tbody>
<tr>
<td>Perlindungan Hukum</td>
<td>✔ Memiliki</td>
<td>✘ Tidak Ada</td>
</tr>

<tr>
<td>Hak Eksklusif</td>
<td>✔ Ya</td>
<td>✘ Tidak</td>
</tr>

<tr>
<td>Dapat Digugat</td>
<td>Risiko Lebih Rendah</td>
<td>Risiko Lebih Tinggi</td>
</tr>

<tr>
<td>Nilai Bisnis</td>
<td>Tinggi</td>
<td>Terbatas</td>
</tr>
</tbody>
</table>

<h3>Kesimpulan</h3>

<p>
Pendaftaran merek merupakan langkah strategis yang memberikan perlindungan hukum sekaligus
meningkatkan nilai bisnis. Oleh karena itu, pelaku usaha disarankan untuk segera mendaftarkan
merek sebelum digunakan secara luas di pasar.
</p>

<p>
Apabila Anda memerlukan pendampingan terkait pendaftaran merek maupun penyelesaian sengketa
Hak Kekayaan Intelektual, tim <strong>SGS Law Firm</strong> siap memberikan konsultasi
dan solusi hukum yang sesuai dengan kebutuhan bisnis Anda.
</p>
`,
    }
};

export const newsCategories = [
    { id: 1, name: "Corporate Law", total: 12 },
    { id: 2, name: "Litigation", total: 8 },
    { id: 3, name: "Employment", total: 6 },
    { id: 4, name: "Tax Law", total: 5 },
    { id: 5, name: "Family Law", total: 3 },
];

export const recentPosts = [
    {
        id: 1,
        slug: "corporate-law-update-2026",
        title: "Corporate Law Update 2026",
        date: "12 Jan 2026",
        image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500",
    },
    {
        id: 2,
        slug: "international-trade",
        title: "International Trade Agreement",
        date: "9 Jan 2026",
        image:
            "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500",
    },
    {
        id: 3,
        slug: "employment-law",
        title: "Employment Law Changes",
        date: "2 Jan 2026",
        image:
            "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500",
    },
];