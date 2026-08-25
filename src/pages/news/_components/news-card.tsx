import {
  IconCalendar,
  IconEye,
  IconMessageCircle,
  IconClock,
} from "@tabler/icons-react";

import { Link } from "@tanstack/react-router";

export type NewsListItem = {
  id?: number;
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  views?: string;
  comments?: string;
  readTime?: string;
  image?: string;
};

interface Props {
  item?: NewsListItem;
}

export default function NewsCard({
  item,
}: Props) {
  return (
    <article className="group border-b border-[#E7EBE9] py-5 last:border-b-0 mb-0">
      <Link to={`/berita/${item?.id}` as never} className="grid grid-cols-[305px_minmax(0,1fr)] gap-5 no-underline xl:grid-cols-[305px_minmax(0,1fr)]">
        {/* ==================================================
            IMAGE
        =================================================== */}
        <div
          className="h-35.25 w-full overflow-hidden rounded-[7px] bg-[#EEF1EF]"
        >
          <img
            src={item?.image}
            alt={item?.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>

        {/* ==================================================
            CONTENT
        =================================================== */}
        <div className="flex min-w-0 flex-col justify-center">
          {/* Category */}
          <span className="text-xs font-extrabold uppercase leading-none tracking-[0.2px] text-maron-kawanuamedia">
            {item?.category}
          </span>

          {/* Title */}
          <h2 className="mt-2 line-clamp-2 font-['Plus_Jakarta_Sans'] text-2xl font-bold leading-[1.3] text-[#171C19] transition-colors duration-200 group-hover:text-maron-kawanuamedia">
            {item?.title}
          </h2>

          {/* Excerpt */}
          <p className="mt-2 line-clamp-2 max-w-162.5 text-sm leading-[1.55] text-[#737B76]">
            {item?.excerpt}
          </p>

          {/* Meta */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#8A928E]">
            <span className="flex items-center gap-1">
              <IconCalendar size={11} stroke={1.7}/>
              {item?.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <IconEye
                size={11}
                stroke={1.7}
              />

              {item?.views}
            </span>

            {item?.comments && (
              <>
                <span>•</span>

                <span className="flex items-center gap-1">
                  <IconMessageCircle
                    size={11}
                    stroke={1.7}
                  />

                  {item?.comments}
                </span>
              </>
            )}

            <span>•</span>

            <span className="flex items-center gap-1">
              <IconClock
                size={11}
                stroke={1.7}
              />

              {item?.readTime}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}