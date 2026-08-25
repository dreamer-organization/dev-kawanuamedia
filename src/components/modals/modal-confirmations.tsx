import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "../ui/button";

import Lottie from "react-lottie-player";

import animationData from '../../assets/lotties/confetti.json';
import { PiSealCheckFill } from "react-icons/pi";
import { LoaderCircle } from "lucide-react";

interface ModalConfirmationProps {
    data?: any;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading?: boolean;
    type?: string;
    icon?: React.ReactNode;
    variantConfirm?: string;
    titleConfirm?: string;
    descriptionConfirm?: string;
    subDescriptionConfirm?: React.ReactNode;
    labelButtonConfirm?: string;
}

export default function ModalConfirmation({
    isOpen,
    data,
    onClose,
    onConfirm,
    loading,
    type = 'idea',
    icon,
    variantConfirm = 'confirm',
    titleConfirm,
    descriptionConfirm,
    subDescriptionConfirm,
    labelButtonConfirm = 'Simpan'
}: Readonly<ModalConfirmationProps>) {

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                className="flex flex-col !w-[420px] md:!w-[620px] xl:!w-[620px] px-[50px] !h-none !min-h-0 !rounded-2xl"
            >
                <DialogHeader className="w-full py-[15px] flex items-center justify-center">
                        <div className="relative flex justify-center">
                            {icon}
                        </div>
                    <DialogTitle className="text-[25px] pt-2 text-center">
                        {titleConfirm}
                    </DialogTitle>

                    <DialogDescription className="text-center">
                        {descriptionConfirm}
                    </DialogDescription>

                    <DialogDescription className="text-center">
                        {subDescriptionConfirm}
                    </DialogDescription>
                </DialogHeader>

                <div className="w-full flex items-center justify-center gap-4">
                    <Button
                        disabled={loading}
                        qa='button-close-modal-confirmation'
                        variant='default'
                        className="w-full !border !border-input !bg-background hover:!bg-accent hover:!text-accent-foreground text-black"
                        onClick={onClose}
                    >
                        Kembali
                    </Button>
                    {
                        variantConfirm !== 'failed' && (
                            <Button
                                disabled={loading}
                                qa='button-confirm-modal-confirmation'
                                variant='primary'
                                className="w-full"
                                onClick={onConfirm}
                            >
                                {
                                    loading
                                        ? <LoaderCircle className='animate-spin' />
                                        : labelButtonConfirm
                                }
                            </Button>
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}