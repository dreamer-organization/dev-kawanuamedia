import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle
} from "@/components/ui/dialog"
import React, { useEffect, useState }  from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/lib/utils";
import IconReactIcons from "@/lib/icon-react-icons";

interface ModalChildrenProps {
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    noCloseBackground?: boolean;
    className?: string;
    icons?: string;
}

export default function ModalChildren({
    title,
    description,
    children,
    isOpen,
    onClose,
    noCloseBackground,
    className,
    icons
}: Readonly<ModalChildrenProps>) {

    const onChange = (open: boolean) => {
        // if (!open) {
        //     onClose()
        // }
        if(open){
            setOpen(true);
            return;
        }

        setOpen(false);

        setTimeout(()=>{
            setMounted(false);
            onClose();
        },250);
    }

    const [mounted, setMounted] = useState(isOpen);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setMounted(true);

            requestAnimationFrame(() => {
                setOpen(true);
            });

            return;
        }

        setOpen(false);

        const timer = setTimeout(() => {
            setMounted(false);
            onClose();
        }, 250);

        return () => clearTimeout(timer);

    }, [isOpen]);

    if (!mounted) {
    return null;
}

    return (
        <Dialog
            open={open}
            onOpenChange={onChange}
        >
            <DialogContent
                onOpenAutoFocus={(e) => noCloseBackground && e.preventDefault()}
                onEscapeKeyDown={(e) => noCloseBackground && e.preventDefault()}
                onInteractOutside={(e) => noCloseBackground && e.preventDefault()}
                showClose
                noCloseBackground={noCloseBackground}
                className={cn("rounded-md flex flex-col !w-fit min-w-0 md:min-w-[700px] max-w-[1450px] min-h-[300px] max-h-[650px] bg-white p-2 overflow-visible pointer-events-auto data-[state=open]:animate-dialogIn data-[state=closed]:animate-dialogOut", className)}
            >

                {(title || description || icons) && (
                    <div className={`flex items-center ${icons ? 'md:mx-2' : ''} pt-4 pb-2`}>
                        {
                            icons && (
                                <div className="shadow-sm border p-3 rounded-md mr-2 hidden md:block">
                                    <IconReactIcons
                                        lib="pi"
                                        iconName={icons ? icons : ''}
                                        className={cn(
                                            "h-[1.5vw] w-[1.5vw]"
                                        )}
                                    />
                                </div>
                            )
                        }
                        <div className="flex flex-col rounded-tl-lg rounded-tr-lg w-full px-2">
                            {title && <DialogTitle className="text-xl font-bold">{title}</DialogTitle>}
                            {description && <p className="text-sm text-slate-500/90">{description}</p>}
                            {/* <hr className='border border-blue-500 mt-3' /> */}
                        </div>
                    </div>
                )}

                <VisuallyHidden>
                    <DialogDescription>Hidden Title</DialogDescription>
                </VisuallyHidden>

                <div className="h-full overflow-auto py-4 pl-[1px] w-full scrollbar-hide">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}