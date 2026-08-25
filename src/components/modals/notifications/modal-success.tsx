import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Lottie from "react-lottie-player";
import animationData from "@/assets/lotties/success.json";
import { useSuccessModal } from "@/hooks/notifications/use-success-modal";

export default function ModalNotificationSuccess() {
    const { isOpen, title, description, onConfirm, close } = useSuccessModal();

    const handleConfirm = () => {
        onConfirm();
        close();
    };

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent
                onInteractOutside={(e) => e.preventDefault()}
                className="flex flex-col rounded-md justify-between !w-[370px] md:!w-[400px] xl:!w-[500px]"
            >
                <DialogHeader className="w-full h-[350px] flex items-center justify-center">
                    <div className="h-24 w-24 grid place-items-center bg-green-100 text-green-500 rounded-full">
                        <Lottie
                            loop={false}
                            play
                            animationData={animationData}
                            style={{ width: 55, height: 55 }}
                            rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                        />
                    </div>

                    <DialogTitle className="text-2xl pt-7 font-bold">
                        {title}
                    </DialogTitle>

                    <DialogDescription className="text-center">
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full flex items-center justify-center gap-4">
                    <Button
                        className="text-green-500 bg-green-50 hover:text-white hover:bg-green-500 px-8"
                        onClick={handleConfirm}
                    >
                        Tutup
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
