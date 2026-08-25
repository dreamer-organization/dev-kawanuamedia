import { motion } from "framer-motion";

export function GlobalLoader() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4 bg-navy-sgs">
            <motion.div
                className="w-10 h-10 border-4 border-green-200 border-t-blue-matext-emerald-kawanuamedia rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="text-emerald-kawanuamedia"
            >
                Loading ...
            </motion.p>
        </div>
    );
}