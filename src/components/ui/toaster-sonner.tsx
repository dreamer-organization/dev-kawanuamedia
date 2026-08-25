import { X } from "lucide-react";
import { PiSealCheckFill, PiTrash, PiWarningFill, PiXBold } from "react-icons/pi";
import { toast } from "sonner";

export const showToastSonner = {

    error(message: string) {
        return toast.custom(
            (id) => (
                <div className="sonner-toast">
                    <div className="sonner-toast-content">
                        <div className="w-[400px] md:w-[500px] grid grid-cols-[.7fr_10fr_1fr] md:grid-cols-[.7fr_12fr_1fr] items-center gap-3 bg-rose-50 p-4 rounded-md shadow-md">
                            <div
                                className="h-full flex justify-center items-start py-1 animate-pulse"
                            >
                                <PiWarningFill className="text-rose-500 h-6 w-6" />
                            </div>

                            <span className="text-rose-500 font-medium text-sm whitespace-pre-line">{message}</span>

                            <button
                                onClick={() => {
                                    toast.dismiss(id);
                                }}
                                className="h-full flex justify-end items-center text-lg text-rose-500 font-bold hover:opacity-70 cursor-pointer"
                            >
                                <PiXBold className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ),
            {
                duration: 10000,
                className: "richColors",
            });
    },
    error2(message?: string, description?: string) {
        return toast.custom(
            (id) => (
                <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4 w-full max-w-[640px] border">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-200 border-4 border-red-50">
                        <PiWarningFill className="text-red-500 w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col flex-1">
                        <p className="font-semibold text-gray-900">
                            {message}
                        </p>
                        <p className="text-sm text-gray-500">
                            {description}
                        </p>
                    </div>

                    {/* Close */}
                    <button
                        onClick={() => {
                            toast.dismiss(id);
                        }}
                        className="h-full flex justify-end items-center text-lg text-[#717680] font-bold hover:opacity-70 cursor-pointer"
                    >
                        <PiXBold className="h-4 w-4" />
                    </button>
                </div>
            ),
            {
                duration: 10000,
                className: "richColors",
            });
    },

    success2(message?: string, description?: string) {
        return toast.custom(
            (id) => (
                <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4 w-full max-w-[640px] border">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D1FADF] border-4 border-[#ECFDF3]">
                        <PiSealCheckFill className="text-green-500 w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col flex-1">
                        <p className="font-semibold text-gray-900">
                            {message}
                        </p>
                        <p className="text-sm text-gray-500">
                            {description}
                        </p>
                    </div>

                    {/* Close */}
                    <button
                        onClick={() => {
                            toast.dismiss(id);
                        }}
                        className="h-full flex justify-end items-center text-lg text-[#717680] font-bold hover:opacity-70 cursor-pointer"
                    >
                        <PiXBold className="h-4 w-4" />
                    </button>
                </div>
            ),
            {
                duration: 10000,
                className: "richColors",
            });
    },
    success_delete(message?: string, description?: string) {
        return toast.custom(
            (id) => (
                <div className="flex items-center gap-4 bg-white rounded-xl shadow-md p-4 w-full max-w-[640px] border">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-200 border-4 border-red-50">
                        <PiTrash className="text-[#D92D20] w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col flex-1">
                        <p className="font-semibold text-gray-900">
                            {message}
                        </p>
                        <p className="text-sm text-gray-500">
                            {description}
                        </p>
                    </div>

                    {/* Close */}
                    <button
                        onClick={() => {
                            toast.dismiss(id);
                        }}
                        className="h-full flex justify-end items-center text-lg text-[#717680] font-bold hover:opacity-70 cursor-pointer"
                    >
                        <PiXBold className="h-4 w-4" />
                    </button>
                </div>
            ),
            {
                duration: 10000,
                className: "richColors",
            });
    },


    success(message: string) {
        return toast.custom(
            (id) => (
                <div className="sonner-toast">
                    <div className="sonner-toast-content">
                        <div className="w-[400px] md:w-[500px] grid grid-cols-[.7fr_12fr_1fr] items-center gap-3 bg-emerald-50 p-4 rounded-md shadow-md">
                            <div
                                className="h-full flex justify-center items-start py-1"
                            >
                                <PiSealCheckFill className="text-green-500 h-6 w-6 animate-pulse" />
                            </div>

                            <span className="text-green-500 font-medium tracking-wide text-sm whitespace-pre-line">{message}</span>

                            <button
                                onClick={() => {
                                    toast.dismiss(id);
                                }}
                                className="h-full flex justify-end items-center text-lg text-green-500 font-bold hover:opacity-70 cursor-pointer"
                            >
                                <PiXBold className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ),
            {
                duration: 3000,
                className: "richColors",
            });
    }
};

