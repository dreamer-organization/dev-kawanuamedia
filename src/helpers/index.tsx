export const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
};

export const scrollToSectionIphone = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    const navbarHeight = 80;

    const top = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
        window.scrollTo(0, top);
    } else {
        window.scrollTo({
            top,
            behavior: "smooth",
        });
    }
};