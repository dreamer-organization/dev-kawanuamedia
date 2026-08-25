import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  IconArrowRight,
  IconChevronDown,
  IconMenu2,
  IconSearch,
  IconX,
} from "@tabler/icons-react";

import {
  useLocation,
  useNavigate,
} from "@tanstack/react-router";

import {
  MenuItem,
  menus,
} from "@/data/Menus";

const breakingNews = [
  "Gempa M5,7 Guncang Talaud, Tidak Berpotensi Tsunami",
  "Pemprov Sulut Dorong Investasi Hijau dan Ekonomi Biru di Kawasan Kawanua",
  "Festival Budaya Nusantara 2025 Digelar di Manado",
];

type NavbarProps = {
  onSearch?: () => void;
};

export default function Navbar({
  onSearch,
}: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * ==========================================================
   * REFS
   * ==========================================================
   */
  const dropdownRef =
    useRef<HTMLDivElement | null>(null);

  /**
   * ==========================================================
   * STATES
   * ==========================================================
   */
  const [open, setOpen] =
    useState(false);

  const [openDropdown, setOpenDropdown] =
    useState<string | null>(null);

  const [scrolled, setScrolled] =
    useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  /**
   * ==========================================================
   * NORMALIZE PATHNAME
   * ==========================================================
   */

  const pathname =
    location.pathname.replace(/\/$/, "") ||
    "/";

  /**
   * ==========================================================
   * ACTIVE SECTION OBSERVER
   *
   * Hanya bekerja di homepage.
   * ==========================================================
   */

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = [
      "home",
      "about-us",
    ];

    const sections = sectionIds
      .map((id) =>
        document.getElementById(id),
      )
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visibleEntries =
            entries
              .filter(
                (entry) =>
                  entry.isIntersecting,
              )
              .sort(
                (a, b) =>
                  b.intersectionRatio -
                  a.intersectionRatio,
              );

          if (
            visibleEntries.length > 0
          ) {
            setActiveSection(
              visibleEntries[0].target.id,
            );
          }
        },
        {
          root: null,
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: [
            0.1,
            0.2,
            0.4,
            0.6,
          ],
        },
      );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  /**
   * ==========================================================
   * RESET ACTIVE SECTION WHEN ROUTE CHANGES
   * ==========================================================
   */

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
    }
  }, [pathname]);

  /**
   * ==========================================================
   * SCROLL DETECTION
   * ==========================================================
   */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20,
      );
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  /**
   * ==========================================================
   * CLOSE DROPDOWN WHEN CLICK OUTSIDE
   * ==========================================================
   */

  useEffect(() => {
    const handleClick = (
      event: MouseEvent,
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClick,
      );
    };
  }, []);

  /**
   * ==========================================================
   * MOBILE BODY LOCK
   * ==========================================================
   */

  useEffect(() => {
    document.body.style.overflow =
      open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /**
   * ==========================================================
   * RESET DROPDOWN WHEN ROUTE CHANGES
   * ==========================================================
   */

  useEffect(() => {
    setOpenDropdown(null);
    setOpen(false);
  }, [pathname]);

  /**
   * ==========================================================
   * SCROLL TO SECTION
   * ==========================================================
   */

  const scrollToTarget = (
    sectionId: string,
  ) => {
    const element =
      document.getElementById(
        sectionId,
      );

    if (!element) {
      return;
    }

    const navbarOffset = 105;

    const elementPosition =
      element.getBoundingClientRect()
        .top + window.scrollY;

    window.scrollTo({
      top:
        elementPosition -
        navbarOffset,
      behavior: "smooth",
    });
  };

  /**
   * ==========================================================
   * HANDLE MENU
   *
   * Jika menu mempunyai dropdown:
   * - buka dropdown
   * - jangan navigate
   *
   * Jika menu biasa:
   * - navigate / scroll
   * ==========================================================
   */

  const handleMenu = async (
    menu: MenuItem,
  ) => {
    /**
     * MENU DROPDOWN
     */
    if (
      menu.dropdown &&
      menu.children?.length
    ) {
      setOpenDropdown((current) =>
        current === menu.name
          ? null
          : menu.name,
      );

      return;
    }

    /**
     * CLOSE UI
     */
    setOpen(false);
    setOpenDropdown(null);

    /**
     * MENU SCROLL
     */
    if (menu.type === "scroll") {
      setActiveSection(
        menu.section ?? "",
      );

      /**
       * Sudah di homepage
       */
      if (pathname === "/") {
        if (menu.section) {
          scrollToTarget(
            menu.section,
          );
        }

        return;
      }

      /**
       * Pindah ke homepage dahulu
       */
      await navigate({
        to: "/" as never,
      });

      /**
       * Tunggu render homepage
       */
      setTimeout(() => {
        if (menu.section) {
          scrollToTarget(
            menu.section,
          );
        }
      }, 100);

      return;
    }

    /**
     * MENU ROUTE
     */
    await navigate({
      to: menu.to as never,
    });
  };

  /**
   * ==========================================================
   * HANDLE DROPDOWN CHILD
   * ==========================================================
   */

  const handleDropdownRoute =
    async (to: string) => {
      setOpenDropdown(null);
      setOpen(false);

      await navigate({
        to: to as never,
      });
    };

  /**
   * ==========================================================
   * ACTIVE MENU
   * ==========================================================
   */

  const isMenuActive = (
    menu: MenuItem,
  ) => {
    /**
     * HOME / SCROLL SECTION
     */
    if (menu.type === "scroll") {
      return (
        pathname === "/" &&
        activeSection ===
          menu.section
      );
    }

    /**
     * EXACT ROUTE
     */
    const normalizedMenuPath =
      menu.to.replace(/\/$/, "");

    /**
     * Current route
     */
    if (
      pathname === normalizedMenuPath
    ) {
      return true;
    }

    /**
     * Child route
     */
    if (
      menu.children?.length
    ) {
      return menu.children.some(
        (child) => {
          const childPath =
            child.to.replace(
              /\/$/,
              "",
            );

          return (
            pathname === childPath ||
            pathname.startsWith(
              `${childPath}/`,
            )
          );
        },
      );
    }

    return pathname.startsWith(
      `${normalizedMenuPath}/`,
    );
  };

  /**
   * ==========================================================
   * RENDER
   * ==========================================================
   */

  return (
    <>
      {/* ======================================================
          DESKTOP / MAIN NAVBAR
      ======================================================= */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-100 border-b border-slate-100 bg-white transition-all duration-300
          ${
            scrolled
              ? "shadow-[0_4px_20px_rgba(12,46,30,0.06)]"
              : "shadow-none"
          }
        `}
      >
        <div className="mx-auto w-full container-custom px-5">
          <div
            className={`flex items-center justify-between transition-all duration-300
              ${
                scrolled
                  ? "h-20"
                  : "h-20"
              }
            `}
          >
            {/* ==================================================
                LOGO
            =================================================== */}
            <button
              type="button"
              onClick={() =>
                handleMenu({
                  name: "Beranda",
                  to: "/",
                  section: "home",
                  type: "scroll",
                })
              }
              className="shrink-0 border-0 bg-transparent p-0 text-left outline-none"
            >
              <div className="flex items-center gap-2">
                {/* Logo Symbol */}
                <img src="./navbar/logo-kawanua-media-text.png" alt="KWM" width={260} />

                {/* Logo text */}
                {/* <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold leading-none tracking-[-0.6px] text-[#111715]">
                    Kawanua Media
                  </span>

                  <span className="mt-0.75 text-xs font-medium leading-none tracking-[0.1px] text-[#7b817e]">
                    Mengabarkan Kawanua,
                    Menginspirasi Indonesia
                  </span>
                </div> */}
              </div>
            </button>

            {/* ==================================================
                DESKTOP NAVIGATION
            =================================================== */}
            <nav
              ref={dropdownRef}
              className="hidden h-full items-center gap-6.75 lg:flex"
            >
              {menus.map((menu) => {
                const active = isMenuActive(menu);
                const hasDropdown = Boolean(menu.dropdown && menu.children?.length);
                const isDropdownOpen = openDropdown === menu.name;
                return (
                  <div
                    key={menu.name}
                    className="relative flex h-full items-center"
                  >
                    {/* ==========================================
                        MENU BUTTON
                    =========================================== */}
                    <button
                      type="button"
                      onClick={() => handleMenu(menu)}
                      className={`group relative flex h-full cursor-pointer items-center gap-1 border-0 bg-transparent px-0 text-md font-medium transition-colors duration-200
                        ${
                          active || isDropdownOpen
                            ? "text-maron-kawanuamedia"
                            : "text-slate-700 hover:text-maron-kawanuamedia"
                        }
                      `}
                    >
                      <span>{menu.name}</span>

                      {/* Dropdown icon */}
                      {hasDropdown && (
                        <IconChevronDown
                          size={11}
                          stroke={1.8}
                          className={`transition-transform duration-200
                            ${
                              isDropdownOpen
                                ? "rotate-180"
                                : "rotate-0"
                            }
                          `}
                        />
                      )}

                      {/* Active underline */}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-maron-kawanuamedia transition-all duration-300
                          ${
                            active ||
                            isDropdownOpen
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }
                        `}
                      />
                    </button>

                    {/* ==========================================
                        DESKTOP DROPDOWN
                    =========================================== */}
                    <AnimatePresence>
                      {hasDropdown &&
                        isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="absolute left-1/2 top-full z-200 w-61.25 -translate-x-1/2 pt-2"
                          >
                            {/* Dropdown card */}
                            <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-2 shadow-[0_16px_45px_rgba(12,46,30,0.12)]">
                              {/* Arrow */}
                              <span className="absolute -top-1.25 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-red-100 bg-maron-kawanuamedia"/>

                              {/* Children */}
                              <div className="relative">
                                {menu.children?.map((child) => (
                                    <button
                                      key={child.name}
                                      type="button"
                                      onClick={() => handleDropdownRoute(child.to)}
                                      className="group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-all duration-200 hover:bg-[#eff7f2] cursor-pointer"
                                    >
                                      <span className="text-sm font-medium text-slate-700 transition group-hover:text-maron-kawanuamedia">
                                        {child.name}
                                      </span>
                                      <IconArrowRight
                                        size={12}
                                        stroke={1.8}
                                        className="-translate-x-1 opacity-0 text-maron-kawanuamedia transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                      />
                                    </button>
                                  ),
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* ==================================================
                RIGHT ACTIONS
            =================================================== */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                type="button"
                onClick={onSearch}
                aria-label="Cari berita"
                className="grid h-8 w-8 place-items-center rounded-full border-0 bg-transparent text-[#202522] transition hover:bg-[#f3f6f4] hover:text-maron-kawanuamedia"
              >
                <IconSearch size={17} stroke={1.7}/>
              </button>

              {/* Contact */}
              <button
                type="button"
                onClick={() => handleDropdownRoute("/kontak")}
                className="hidden h-8 items-center justify-center rounded-[5px] bg-maron-kawanuamedia px-3.75 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#075f32] hover:shadow-md md:flex"
              >
                Kontak / Beriklan
              </button>

              {/* Mobile button */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Buka menu"
                className="grid h-8 w-8 place-items-center border-0 bg-transparent text-maron-kawanuamedia lg:hidden"
              >
                <IconMenu2 size={21} stroke={1.8}/>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ========================================================
          BREAKING NEWS
      ========================================================= */}
      <section className="fixed inset-x-0 top-20 z-40 h-12 border-b border-slate-100 bg-white">
        <div className="mx-auto flex h-full container-custom items-center gap-4 overflow-hidden px-5">
          {/* Breaking label */}
          <div className="shrink-0 rounded-[3px] bg-maron-kawanuamedia px-2.25 py-1.25 text-md font-extrabold leading-none tracking-wide text-white">
            BREAKING NEWS
          </div>

          {/* Ticker */}
          <div className="flex min-w-0 flex-1 items-center gap-13.75 overflow-hidden whitespace-nowrap">
            {breakingNews.map(
              (news, index) => (
                <div
                  key={index}
                  className="flex shrink-0 items-center gap-2 text-xs font-medium text-[#5e6562]"
                >
                  <span className="h-1 w-1 shrink-0 rounded-full bg-maron-kawanuamedia"/>
                  <span>
                    {news}
                  </span>
                </div>
              ),
            )}
          </div>

          {/* All news */}
          <button
            type="button"
            onClick={() => handleDropdownRoute( "/berita" )}
            className="flex shrink-0 cursor-pointer items-center gap-1 border-0 bg-transparent text-md font-semibold text-[#5e6562] transition hover:text-maron-kawanuamedia"
          >
            Lihat Semua
            <IconArrowRight
              size={16}
              stroke={1.8}
            />
          </button>
        </div>
      </section>

      {/* ========================================================
          MOBILE DRAWER
      ========================================================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false) }
              className="fixed inset-0 z-998 bg-black/40 backdrop-blur-[2px] lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed bottom-0 right-0 top-0 z-999 flex w-[320px] max-w-[88vw] flex-col bg-white shadow-2xl lg:hidden"
            >
              {/* ==================================================
                  MOBILE HEADER
              =================================================== */}
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                {/* Mobile logo */}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleMenu({
                      name: "Beranda",
                      to: "/",
                      section: "home",
                      type: "scroll",
                    });
                  }}
                  className="border-0 bg-transparent p-0"
                >
                  <div className="flex items-center gap-2">
                    <div className="relative h-6.25 w-7.25">
                      <span
                        className="absolute bottom-0 left-px h-0 w-0 border-b-22 border-l-14 border-r-14 border-solid border-b-maron-kawanuamedia border-l-transparent border-r-transparent"
                      />
                      <span
                        className="absolute bottom-0 right-0 h-3 w-2 skew-y-[-30deg] bg-[#17a45a]"
                      />
                    </div>

                    <div className="flex flex-col text-left">
                      <span className="text-sm font-extrabold tracking-tight text-slate-900">
                        Kawanua Media
                      </span>
                      <span className="text-[5px] font-bold uppercase text-slate-400">
                        Mengabarkan Kawanua,
                        Menginspirasi Indonesia
                      </span>
                    </div>
                  </div>
                </button>

                {/* Close */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Tutup menu"
                  className="grid h-9 w-9 place-items-center rounded-full border-0 bg-transparent text-slate-700 transition hover:bg-slate-100"
                >
                  <IconX size={21} />
                </button>
              </div>

              {/* ==================================================
                  MOBILE MENU
              =================================================== */}
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-1">
                  {menus.map((menu, index) => {
                      const active = isMenuActive(menu);
                      const hasDropdown = Boolean(menu.dropdown && menu.children?.length);
                      const isOpen = openDropdown === menu.name;
                      return (
                        <div key={menu.name} >
                          {/* Menu */}
                          <motion.button
                            type="button"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleMenu(menu)}
                            className={`relative flex min-h-11.5 w-full items-center justify-between rounded-lg border-0 px-4 text-left text-[12px] font-semibold transition-all
                              ${
                                active ||
                                isOpen
                                  ? "bg-emerald-50 text-maron-kawanuamedia"
                                  : "bg-transparent text-slate-700 hover:bg-slate-50"
                              }
                            `}
                          >
                            <span>
                              {menu.name}
                            </span>

                            {hasDropdown && (
                              <IconChevronDown
                                size={15}
                                stroke={1.8}
                                className={`transition-transform duration-200
                                  ${
                                    isOpen
                                      ? "rotate-180"
                                      : ""
                                  }
                                `}
                              />
                            )}

                            {active && (
                              <span
                                className="absolute bottom-2 left-0 top-2 w-0.75 rounded-r-full bg-maron-kawanuamedia"
                              />
                            )}
                          </motion.button>

                          {/* ========================================
                              MOBILE SUBMENU
                          ========================================= */}
                          <AnimatePresence>
                            {hasDropdown &&
                              isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="ml-4 border-l border-[#dce9e1] py-1 pl-3">
                                    {menu.children?.map((child) => (
                                        <button
                                          key={child.name}
                                          type="button"
                                          onClick={() => handleDropdownRoute(child.to)}
                                          className="flex w-full items-center rounded-md px-3 py-2.5 text-left text-[11px] font-medium text-slate-600 transition hover:bg-[#eff7f2] hover:text-maron-kawanuamedia"
                                        >
                                          {
                                            child.name
                                          }
                                        </button>
                                      ),
                                    )}
                                  </div>
                                </motion.div>
                              )}
                          </AnimatePresence>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>

              {/* ==================================================
                  MOBILE CTA
              =================================================== */}
              <div className="border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={() => handleDropdownRoute("/kontak")}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-maron-kawanuamedia px-4 py-3.5 text-[11px] font-semibold text-white transition hover:bg-[#075f32]"
                >
                  Kontak / Beriklan
                  <IconArrowRight size={14} stroke={2}/>
                </button>
                <p className="mt-4 text-center text-[8px] text-slate-400">
                  © 2026 Kawanua Media
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}