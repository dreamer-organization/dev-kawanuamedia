import { Link } from "@tanstack/react-router";

interface FooterColumnItem {
  label: string;
  to: string;
}

interface Props {
  title: string;
  items: FooterColumnItem[];
}

export default function FooterColumn({
  title,
  items,
}: Props) {
  return (
    <div>
      <h3
        className="text-md font-extrabold uppercase tracking-[0.2px] text-[#1b201d]"
      >
        {title}
      </h3>

      {/* Items */}
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link to={item.to as never} className="block text-xs leading-none text-[#707873] no-underline transition-colors duration-200 hover:text-[#08763e]">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}