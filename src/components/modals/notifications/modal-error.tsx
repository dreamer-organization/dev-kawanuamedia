import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PiWarningBold } from "react-icons/pi";
import { useErrorModal } from "@/hooks/notifications/use-error-modal";

export default function ModalNotificationError() {
    const { isOpen, title, description, close } = useErrorModal();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent
                showClose
                className="flex flex-col rounded-md justify-between !w-[370px] md:!w-[400px] xl:!w-[550px]"
            >
                <DialogHeader className="w-full h-[350px] flex items-center justify-center">
                    <div className="h-24 w-24 grid place-items-center bg-rose-100 text-rose-500 rounded-full">
                        <PiWarningBold className="h-10 w-10 text-rose-500 animate-pulse" />
                    </div>

                    <DialogTitle className="text-xl pt-7 font-bold">
                        {title}
                    </DialogTitle>

                    <DialogDescription className="text-center break-all">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full flex items-center justify-center gap-4">
                    <Button
                        className="text-rose-500 bg-rose-100 hover:text-white hover:bg-rose-500 px-8"
                        onClick={close}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
