import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

import animationData from '../../assets/lotties/warning-2.json';
import animationData2 from '../../assets/lotties/warning-tape.json';

import Lottie from "react-lottie-player";
import logOut from "@/lib/log-out";

interface ModalPageUnauthorizedProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    loading?: boolean;
}

export default function ModalPageUnauthorized({
    title,
    description,
    isOpen,
    onClose,
    loading
}: Readonly<ModalPageUnauthorizedProps>) {

    return (
        <>
            {
                isOpen && (
                    <div className="w-full h-screen relative z-[200] bg-white flex items-center justify-center">
                        <Lottie
                            className="w-full h-full absolute z-[510] scale-[.8]"
                            loop={true}
                            play={true}
                            speed={0.5}
                            animationData={animationData2}
                            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                        />
                    </div>
                )
            }
            <Dialog open={isOpen}>
                <DialogContent
                    onInteractOutside={(e) => {
                        e.preventDefault();
                    }}
                    className="flex flex-col justify-between !w-[350px] md:!w-[400px] xl:!w-[500px]"
                >
                    <DialogHeader className="w-full h-[300px] flex items-center justify-center">
                        <Lottie
                            loop={true}
                            play={true}
                            animationData={animationData}
                            style={{ width: 115, height: 115 }}
                            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
                        />
                        <DialogTitle className="text-2xl pt-7">Unauthorized</DialogTitle>
                        <DialogDescription className="text-center">Maaf Anda tidak memiliki akses ke halaman ini. Silahkan hubungi Admin untuk informasi lebih lanjut</DialogDescription>
                    </DialogHeader>
                    <div className="w-full flex justify-center items-center">
                        <Button
                            qa='button-back-modal-unauthorized'
                            className="bg-[#FFC71F] hover:bg-yellow-500 text-black font-medium px-8"
                            onClick={() => logOut()}
                        >
                            Kembali ke Home
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}