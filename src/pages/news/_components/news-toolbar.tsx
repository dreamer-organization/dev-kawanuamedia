import {
  IconChevronDown,
} from "@tabler/icons-react";

interface Props {
  total?: number;
  currentPage?: number;
  perPage?: number;

  /**
   * Nilai sorting yang sedang aktif.
   */
  sort?: string;

  /**
   * Callback ketika sorting berubah.
   */
  onSortChange?: (
    value: string,
  ) => void;

  /**
   * Callback ketika jumlah data
   * per halaman berubah.
   */
  onLimitChange?: (
    value: number,
  ) => void;

  /**
   * Pilihan jumlah data per halaman.
   */
  limitOptions?: number[];
}

export default function NewsToolbar({
  total = 0,
  currentPage = 1,
  perPage = 10,
  sort = "terbaru",
  onSortChange,
  onLimitChange,
  limitOptions = [10, 20, 50],
}: Props) {
  /**
   * ========================================================
   * RESULT RANGE
   * ========================================================
   */

  const start =
    total === 0
      ? 0
      : (currentPage - 1) *
          perPage +
        1;

  const end =
    total === 0
      ? 0
      : Math.min(
          currentPage * perPage,
          total,
        );

  return (
    <div
      className="
        flex
        flex-col
        gap-3
        border-b
        border-[#E7EBE9]
        pb-3

        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      {/* ====================================================
          RESULT INFO
      ===================================================== */}

      <p
        className="
          m-0
          text-[9px]
          leading-none
          text-[#747D78]
        "
      >
        Menampilkan{" "}
        <strong
          className="
            font-semibold
            text-[#444C48]
          "
        >
          {start} - {end}
        </strong>{" "}
        dari{" "}
        <strong
          className="
            font-semibold
            text-[#444C48]
          "
        >
          {total.toLocaleString(
            "id-ID",
          )}
        </strong>{" "}
        berita
      </p>

      {/* ====================================================
          ACTIONS
      ===================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
        "
      >
        {/* ==================================================
            LIMIT
        =================================================== */}

        {onLimitChange && (
          <>
            <span
              className="
                text-[9px]
                text-[#747D78]
              "
            >
              Tampilkan:
            </span>

            <div className="relative">
              <select
                value={perPage}
                onChange={(
                  event,
                ) => {
                  const value =
                    Number(
                      event.target
                        .value,
                    );

                  onLimitChange(
                    value,
                  );
                }}
                className="
                  h-[34px]
                  min-w-[68px]
                  cursor-pointer
                  appearance-none
                  rounded-[6px]
                  border
                  border-[#DDE3DF]
                  bg-white
                  px-3
                  pr-8
                  text-[9px]
                  font-medium
                  text-[#3F4743]
                  outline-none
                  transition
                  focus:border-maron-kawanuamedia
                  focus:ring-2
                  focus:ring-maron-kawanuamedia/10
                "
              >
                {limitOptions.map(
                  (option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ),
                )}
              </select>

              <IconChevronDown
                size={13}
                stroke={1.8}
                className="
                  pointer-events-none
                  absolute
                  right-2.5
                  top-1/2
                  -translate-y-1/2
                  text-[#68716C]
                "
              />
            </div>
          </>
        )}

        {/* ==================================================
            SORT
        =================================================== */}

        <span
          className="
            ml-1
            text-[9px]
            text-[#747D78]
          "
        >
          Urutkan:
        </span>

        <div className="relative">
          <select
            value={sort}
            onChange={(
              event,
            ) =>
              onSortChange?.(
                event.target.value,
              )
            }
            className="
              h-[34px]
              min-w-[100px]
              cursor-pointer
              appearance-none
              rounded-[6px]
              border
              border-[#DDE3DF]
              bg-white
              px-3
              pr-8
              text-[9px]
              font-medium
              text-[#3F4743]
              outline-none
              transition
              focus:border-maron-kawanuamedia
              focus:ring-2
              focus:ring-maron-kawanuamedia/10
            "
          >
            <option value="terbaru">
              Terbaru
            </option>

            <option value="terlama">
              Terlama
            </option>

            <option value="populer">
              Terpopuler
            </option>
          </select>

          <IconChevronDown
            size={13}
            stroke={1.8}
            className="
              pointer-events-none
              absolute
              right-2.5
              top-1/2
              -translate-y-1/2
              text-[#68716C]
            "
          />
        </div>
      </div>
    </div>
  );
}