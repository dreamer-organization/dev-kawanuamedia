import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandTwitter,
  IconBrandTiktok,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

import { Link } from "@tanstack/react-router";
import FooterColumn from "./footer-column";



/* ============================================================
   FOOTER LINK DATA
============================================================ */
const quickLinks = [
  {
    label: "Tentang Kami",
    to: "/tentang-kami",
  },
  {
    label: "Beriklan",
    to: "/kontak",
  },
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    to: "/terms-conditions",
  },
];

const categories = [
  {
    label: "Daerah",
    to: "/kategori/daerah",
  },
  {
    label: "Nasional",
    to: "/kategori/nasional",
  },
  {
    label: "Ekonomi",
    to: "/kategori/ekonomi",
  },
];

function KawanuaLogo() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 no-underline"
    >
      <img src="./navbar/logo-kawanua-media-text.png" alt="KWM" width={280}/>
    </Link>
  );
}

/* ============================================================
   FOOTER
============================================================ */
export default function Footer() {
  return (
    <footer className="bg-white border-t border-emerald-kawanuamedia shadow-2xl shadow-emerald-kawanuamedia">
      {/* ======================================================
          MAIN FOOTER
      ======================================================= */}
      <div className="mx-auto w-full container-custom px-5 py-8 md:py-9 lg:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1.1fr_1.1fr_1.5fr] lg:gap-10">
          {/* ==================================================
              COLUMN 1
          =================================================== */}
          <div>
            <KawanuaLogo />
            <p className="mt-4 max-w-82.5 text-sm leading-[1.75] text-[#707873]">
              Media digital terpercaya yang
              menyajikan berita lokal, nasional,
              dan internasional dengan perspektif
              Kawanua.
            </p>
          </div>

          {/* ==================================================
              COLUMN 2
              QUICK LINKS
          =================================================== */}
        <FooterColumn
            title="Quick Links"
            items={quickLinks}
        />

          {/* ==================================================
              COLUMN 3
              KATEGORI
          =================================================== */}
          <FooterColumn
            title="Kategori"
            items={categories}
            />

          {/* ==================================================
              COLUMN 4
              HUBUNGI KAMI
          =================================================== */}
          <div>
            <h3 className="mb-4 text-md font-extrabold uppercase tracking-[0.2px] text-[#1b201d]">
              Hubungi Kami
            </h3>

            <div className="space-y-3">
              {/* Address */}
              <div className="flex items-start gap-2">
                <IconMapPin
                  size={13}
                  stroke={1.8}
                  className="mt-px shrink-0 text-[#5f6964]"
                />

                <span className="max-w-50 text-xs leading-normal text-[#707873]">
                  Jl. Sam Ratulangi No. 123,
                  Manado, Sulawesi Utara,
                  Indonesia
                </span>
              </div>

              {/* Email */}
              <a href="mailto:redaksi@kawanuamedia.id" className="flex items-center gap-2 text-xs text-[#707873] no-underline transition hover:text-[#08763e]">
                <IconMail
                  size={13}
                  stroke={1.8}
                />
                <span>
                  redaksi@kawanuamedia.id
                </span>
              </a>
              {/* Phone */}
              <a href="tel:+6282112345678" className="flex items-center gap-2 text-xs text-[#707873] no-underline transition hover:text-[#08763e]">
                <IconPhone
                  size={13}
                  stroke={1.8}
                />
                <span>
                  +62 821-0000-0000
                </span>
              </a>
            </div>

            {/* =================================================
                SOCIAL MEDIA
            ================================================== */}
            <div className="mt-5">
              <h4 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2px] text-[#1b201d]">
                Ikuti Kami
              </h4>
              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-[#1877F2] transition hover:scale-110"
                >
                  <IconBrandFacebook
                    size={16}
                    stroke={1.8}
                  />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-[#E4405F] transition hover:scale-110"
                >
                  <IconBrandInstagram
                    size={16}
                    stroke={1.8}
                  />
                </a>

                {/* Youtube */}
                <a
                  href="#"
                  aria-label="Youtube"
                  className="text-[#FF0000] transition hover:scale-110"
                >
                  <IconBrandYoutube
                    size={17}
                    stroke={1.8}
                  />
                </a>

                {/* Twitter */}
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-[#111111] transition hover:scale-110"
                >
                  <IconBrandTwitter
                    size={16}
                    stroke={1.8}
                  />
                </a>

                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="text-[#111111] transition hover:scale-110"
                >
                  <IconBrandTiktok
                    size={16}
                    stroke={1.8}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          COPYRIGHT BAR
      ======================================================= */}
      <div className="border-t border-slate-100">
        <div className="mx-auto flex min-h-9.5 w-full container-custom items-center justify-between gap-4 px-5">
          <p className="m-0 text-xs text-[#8a918d]">
            © 2026 Kawanua Media.
            All rights reserved.
          </p>

          <p className="hidden text-xs text-[#8a918d] sm:block">
            Mengabarkan Kawanua,
            Menginspirasi Indonesia
          </p>
        </div>
      </div>

      {/* ======================================================
          GREEN BOTTOM BAR
      ======================================================= */}
      <div className="h-3 w-full bg-[#005C2F]"/>
    </footer>
  );
}