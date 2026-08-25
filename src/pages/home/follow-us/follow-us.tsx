import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandYoutube,
    IconBrandX,
} from "@tabler/icons-react";

type SocialItem = {
    name: string;
    href: string;
    value: string;
    label: string;
    icon: React.ReactNode;
    iconClassName: string;
};

const socialItems: SocialItem[] = [
    {
        name: "Facebook",
        href: "#",
        value: "125K",
        label: "Pengikut",
        icon: (
            <IconBrandFacebook
                size={19}
                stroke={1.8}
            />
        ),
        iconClassName: "text-[#1877F2]",
    },
    {
        name: "Instagram",
        href: "#",
        value: "89K",
        label: "Pengikut",
        icon: (
            <IconBrandInstagram
                size={19}
                stroke={1.8}
            />
        ),
        iconClassName: "text-[#E4405F]",
    },
    {
        name: "YouTube",
        href: "#",
        value: "75K",
        label: "Subscriber",
        icon: (
            <IconBrandYoutube
                size={20}
                stroke={1.8}
            />
        ),
        iconClassName: "text-[#FF0000]",
    },
    {
        name: "X",
        href: "#",
        value: "45K",
        label: "Pengikut",
        icon: (
            <IconBrandX
                size={18}
                stroke={1.8}
            />
        ),
        iconClassName: "text-[#111111]",
    },
];

export default function FollowUs() {
    return (
        <section className="w-full overflow-hidden rounded-[7px] border border-[#E5E9E7] bg-white px-3 pb-3 pt-3">
            {/* =====================================================
                HEADER
            ====================================================== */}
            <div className="flex items-center gap-2">
                <h2 className="whitespace-nowrap text-xl font-extrabold uppercase leading-none text-[#1b201d]">
                    Ikuti Kami
                </h2>
                <span
                    className="h-0.5 w-7.25 rounded-full bg-[#08763e]"
                />
            </div>

            {/* =====================================================
                SOCIAL GRID
            ====================================================== */}
            <div className="mt-3 grid grid-cols-4 divide-x divide-[#edf0ee]">
                {socialItems.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        aria-label={`Ikuti Kawanua Media di ${social.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-w-0 flex-col items-center justify-center px-1 no-underline"
                    >
                        {/* Icon */}
                        <div className={`flex h-7 w-7 items-center justify-center transition-transform duration-200 group-hover:-translate-y-0.5 ${social.iconClassName}`}>
                            {social.icon}
                        </div>

                        {/* Value */}
                        <strong className="mt-0.5 text-[14px] font-extrabold leading-none text-[#333936]">
                            {social.value}
                        </strong>

                        {/* Label */}
                        <span className="mt-0.75 text-center text-[8px] leading-none text-[#89918D]">
                            {social.label}
                        </span>
                    </a>
                ),
                )}
            </div>
        </section>
    );
}