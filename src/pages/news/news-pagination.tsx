import {
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onChange: (
    page: number,
  ) => void;
}

function getPages(
  currentPage: number,
  totalPages: number,
) {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
  }

  const pages: (
    | number
    | "ellipsis"
  )[] = [];

  pages.push(1);

  if (currentPage > 4) {
    pages.push("ellipsis");
  }

  const start = Math.max(
    2,
    currentPage - 1,
  );

  const end = Math.min(
    totalPages - 1,
    currentPage + 1,
  );

  for (
    let i = start;
    i <= end;
    i++
  ) {
    pages.push(i);
  }

  if (
    currentPage <
    totalPages - 3
  ) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

export default function NewsPagination({
  currentPage,
  totalPages,
  onChange,
}: Props) {
  const pages = getPages(
    currentPage,
    totalPages,
  );

  return (
    <div
      className="
        mt-5
        flex
        items-center
        justify-center
        gap-1.5
      "
    >
      {/* Previous */}

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() =>
          onChange(currentPage - 1)
        }
        className="
          grid
          h-[28px]
          w-[28px]
          place-items-center
          rounded-[5px]
          border
          border-[#DDE3DF]
          bg-white
          text-[#69726D]
          transition
          hover:border-maron-kawanuamedia
          hover:text-maron-kawanuamedia
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <IconChevronLeft
          size={14}
        />
      </button>

      {/* Pages */}

      {pages.map(
        (page, index) => {
          if (
            page ===
            "ellipsis"
          ) {
            return (
              <span
                key={`ellipsis-${index}`}
                className="
                  flex
                  h-[28px]
                  min-w-[28px]
                  items-center
                  justify-center
                  text-[9px]
                  text-[#7D8580]
                "
              >
                ...
              </span>
            );
          }

          const active =
            page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onChange(page)
              }
              className={`
                grid
                h-[28px]
                min-w-[28px]
                place-items-center
                rounded-[5px]
                border
                text-[9px]
                font-medium
                transition-all

                ${
                  active
                    ? "border-maron-kawanuamedia bg-maron-kawanuamedia text-white"
                    : "border-[#DDE3DF] bg-white text-[#69726D] hover:border-maron-kawanuamedia hover:text-maron-kawanuamedia"
                }
              `}
            >
              {page}
            </button>
          );
        },
      )}

      {/* Next */}

      <button
        type="button"
        disabled={
          currentPage ===
          totalPages
        }
        onClick={() =>
          onChange(currentPage + 1)
        }
        className="
          grid
          h-[28px]
          w-[28px]
          place-items-center
          rounded-[5px]
          border
          border-[#DDE3DF]
          bg-white
          text-[#69726D]
          transition
          hover:border-maron-kawanuamedia
          hover:text-maron-kawanuamedia
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <IconChevronRight
          size={14}
        />
      </button>
    </div>
  );
}