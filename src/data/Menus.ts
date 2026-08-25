export type MenuItem = {
  name: string;
  to: string;
  section?: string;
  type: "scroll" | "route";
  dropdown?: boolean;
  children?: {
    name: string;
    to: string;
  }[];
};

export const menus: MenuItem[] = [
  {
    name: "Beranda",
    to: "/",
    section: "home",
    type: "scroll",
  },
  {
    name: "Berita",
    to: "/berita",
    type: "route",
  },
  {
    name: "Daerah",
    to: "/kategori/daerah",
    type: "route",
    dropdown: true,
    children: [
      {
        name: "Sulawesi Utara",
        to: "/kategori/daerah/sulawesi-utara",
      },
      {
        name: "Manado",
        to: "/kategori/daerah/manado",
      },
      {
        name: "Minahasa",
        to: "/kategori/daerah/minahasa",
      },
      {
        name: "Bitung",
        to: "/kategori/daerah/bitung",
      },
    ],
  },
  {
    name: "Nasional",
    to: "/kategori/nasional",
    type: "route",
  },
  {
    name: "Budaya",
    to: "/kategori/budaya",
    type: "route",
  },
  {
    name: "Lifestyle",
    to: "/kategori/lifestyle",
    type: "route",
  },
  {
    name: "Tentang Kami",
    to: "/tentang-kami",
    type: "route",
  },
];