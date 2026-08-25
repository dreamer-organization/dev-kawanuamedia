interface AdBannerProps {
  width?: number;
  height?: number;
  label?: string;
}

export default function AdBanner({
  width = 728,
  height = 250,
  label = "IKLAN",
}: AdBannerProps) {
  return (
    <section className="flex h-22.75 w-full items-center justify-center overflow-hidden rounded-[7px] bg-[#F1F2F2]" aria-label="Advertisement">
      <div className="flex flex-col items-center justify-center">
        {/* Label */}
        <span className="text-[8px] font-medium uppercase tracking-[0.2px] text-[#9A9E9C]" >
          {label}
        </span>

        {/* Size */}
        <span className="mt-1 text-[10px] font-semibold leading-none text-[#818684]" >
          {width} × {height}
        </span>
      </div>
    </section>
  );
}