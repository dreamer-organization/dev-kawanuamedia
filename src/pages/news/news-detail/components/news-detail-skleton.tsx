import { motion } from "framer-motion";

function Skeleton({
    className,
}: {
    className?: string;
}) {
    return (
        <motion.div
            animate={{
                opacity: [.45, .9, .45],
            }}
            transition={{
                repeat: Infinity,
                duration: 1.4,
            }}
            className={`rounded-md bg-[#1A2630] ${className}`}
        />
    );
}

export default function NewsDetailSkeleton() {
    return (
        <div className="min-h-screen bg-[#081119]">

            {/* Hero */}

            <div className="relative h-[650px] overflow-hidden bg-[#111C26]">

                <div className="absolute bottom-20 left-1/2 w-full max-w-[1320px] -translate-x-1/2 px-6">

                    <Skeleton className="h-10 w-36 rounded-full" />

                    <Skeleton className="mt-8 h-16 w-3/4" />

                    <Skeleton className="mt-4 h-16 w-2/3" />

                    <div className="mt-10 flex gap-5">
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-5 w-36" />
                        <Skeleton className="h-5 w-28" />
                    </div>

                </div>

            </div>

            {/* Content */}

            <div className="mx-auto grid max-w-[1320px] gap-20 px-6 py-20 xl:grid-cols-[1fr_340px]">

                {/* Left */}

                <div>

                    <Skeleton className="h-[520px] w-full rounded-xl" />

                    <Skeleton className="mt-10 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-11/12" />

                    <Skeleton className="mt-14 h-10 w-72" />

                    <Skeleton className="mt-8 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-10/12" />

                    <Skeleton className="mt-16 h-40 w-full rounded-xl" />

                    <Skeleton className="mt-14 h-10 w-56" />

                    <Skeleton className="mt-8 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-full" />
                    <Skeleton className="mt-4 h-5 w-9/12" />

                </div>

                {/* Sidebar */}

                <div className="space-y-8">

                    <Skeleton className="h-72 w-full rounded-xl" />

                    <Skeleton className="h-96 w-full rounded-xl" />

                    <Skeleton className="h-72 w-full rounded-xl" />

                </div>

            </div>

        </div>
    );
}