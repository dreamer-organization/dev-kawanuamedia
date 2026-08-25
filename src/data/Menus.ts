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
    to: "/daerah",
    type: "route",
    dropdown: true,
    children: [
      {
        name: "Sulawesi Utara",
        to: "/daerah/sulawesi-utara",
      },
      {
        name: "Manado",
        to: "/daerah/manado",
      },
      {
        name: "Minahasa",
        to: "/daerah/minahasa",
      },
      {
        name: "Bitung",
        to: "/daerah/bitung",
      },
    ],
  },
  {
    name: "Nasional",
    to: "/nasional",
    type: "route",
  },
  {
    name: "Budaya",
    to: "/budaya",
    type: "route",
  },
  {
    name: "Lifestyle",
    to: "/lifestyle",
    type: "route",
  },
  {
    name: "Tentang Kami",
    to: "/tentang-kami",
    type: "route",
  },
];