import { useEffect, useRef, useState } from 'react';
import { ArrowUpFromLine, Image, Pencil, Trash2 } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';

interface InputPhotoProps {
    name: string;
    label?: string;
    control: Control<any>;
    qa: string;
    linkImage?: string;
    info: string;
    disabled?: boolean;
    fileType?: string;
    showError?: boolean;
    error?: string;
    trigger?: any;
    shouldTrigger?: boolean;
    pathTriggerFieldTarget?: any;
    watch?: any;
    connectSchemaName?: string;
    setValue?: any;
    variant?: string;
    required?: boolean;
}

export default function InputImage({
    name,
    control,
    qa,
    label,
    linkImage,
    info,
    disabled,
    fileType,
    showError = true,
    error,
    trigger,
    shouldTrigger = false,
    pathTriggerFieldTarget,
    watch,
    connectSchemaName,
    setValue,
    variant,
    required
}: Readonly<InputPhotoProps>) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(linkImage || null);

    useEffect(() => {
        setImageSrc(linkImage || null);
    }, [linkImage]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleImageChange = (event: any, onChange: any) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
            onChange([file]); // Pass file as an array
            setHoverShowEdit(false)
        }
    };

    const handleRemoveImage = (onChange: any) => {
        setValue(connectSchemaName, '')
        setImageSrc(null);
        setSelectedImage(null);

        onChange([]); // Clear the file array

        // Reset the file input so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the input value
        }
    };

    const [hoverShowEdit, setHoverShowEdit] = useState(false);


    const watchedValue = watch ? watch(name) : undefined;

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!shouldTrigger) return;

        // Skip effect on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        if (watchedValue !== undefined) {
            trigger(pathTriggerFieldTarget);
        }
    }, [
        shouldTrigger,
        control,
        pathTriggerFieldTarget,
        watchedValue
    ]);


    return (
        <FormField
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, ...field }, fieldState }) => (
                <FormItem className={cn(
                    'flex flex-col',
                    label ? "space-y-1 gap-1" : "space-y-0",
                    (fieldState.error || error) ? '' : 'mt-0 mb-0'
                )}
                >
                    <FormLabel className={cn(fieldState.error && "text-destructive", 'w-full flex items-center justify-start text-start')}>
                        {label} {required && <span className='text-rose-500 text-base'>*</span>}
                    </FormLabel>
                    <FormControl>
                        <>
                            <input
                                qa-upload-file={qa}
                                type="file"
                                id={name}
                                disabled={disabled}
                                accept={fileType ?? '.png, .jpg, .jpeg'}
                                {...field}
                                ref={fileInputRef}
                                onChange={(event) => {
                                    handleImageChange(event, onChange);
                                }}
                                className='hidden'
                            />

                            {/* Input view */}
                            <div
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const file = e.dataTransfer.files[0];
                                    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
                                        const imageUrl = URL.createObjectURL(file);
                                        setSelectedImage(imageUrl);
                                        onChange([file]);
                                    }
                                }}
                                onMouseEnter={() => setHoverShowEdit(true)}
                                onMouseLeave={() => setHoverShowEdit(false)}
                                className={cn(
                                    'relative w-full grid place-items-center p-1 overflow-hidden',
                                    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                                    (selectedImage || imageSrc)
                                        ? (variant === 'tipe-2'
                                            ? 'h-[9rem] border-2 border-dashed rounded'
                                            : 'h-[15rem] border-2 border-dashed rounded')
                                        : (variant === 'tipe-2'
                                            ? 'h-[2.5rem] border border-solid rounded-md'
                                            : 'h-[5rem] border-2 border-dashed rounded'),

                                    (fieldState.error || error)
                                        ? 'border-rose-500 bg-rose-100'
                                        : 'bg-white border-input',
                                    (hoverShowEdit && (!selectedImage || !imageSrc) && !disabled) && 'bg-gray-200'
                                )}
                            >

                                {/* Show BACKGROUND image that uploaded */}
                                {
                                    (selectedImage || imageSrc) && (
                                        <img
                                            src='/checkerboard-pattern.jpg'
                                            alt='img-input'
                                            className={cn(
                                                'absolute w-full z-10 object-cover opacity-[.05]',
                                                ((selectedImage || imageSrc) && variant === 'tipe-2')
                                                    ? 'h-[9rem]'
                                                    : 'h-[15rem]'
                                            )}
                                        />
                                    )
                                }

                                {/* Show edit and delete button when hover */}
                                {(hoverShowEdit && !disabled) && (
                                    selectedImage || imageSrc ? (
                                        <div
                                            className={cn(
                                                'absolute z-[50] w-full h-full flex items-center justify-center gap-2 text-white cursor-pointer',
                                                (imageSrc || selectedImage) && 'bg-[#00000091]'
                                            )}
                                        >
                                            <label htmlFor={name} className='flex justify-center items-center px-3 gap-2 w-[6rem] text-xs p-2 rounded transition duration-300 hover:bg-premium-gold-sgs hover:text-white text-premium-gold-sgs bg-white cursor-pointer'>
                                                <Pencil className='w-4 h-4' /><span>Edit</span>
                                            </label>

                                            {
                                                // selectedImage && (
                                                <button
                                                    qa-button='delete-image'
                                                    type='button'
                                                    onClick={() => handleRemoveImage(onChange)}
                                                    className='flex justify-center items-center px-3 gap-2 w-[6rem] text-xs p-2 rounded transition duration-300 bg-white hover:bg-rose-500 hover:text-white text-rose-500 cursor-pointer'
                                                >
                                                    <Trash2 className='w-4 h-4' /><span>Hapus</span>
                                                </button>
                                                // )
                                            }
                                        </div>
                                    ) : <label htmlFor={name} className='absolute z-[50] w-full h-full cursor-pointer'>{''}</label>
                                )}

                                {/* View Input */}
                                {
                                    selectedImage || imageSrc ? (
                                        // Show image that uploaded
                                        <img
                                            src={selectedImage ?? imageSrc ?? undefined}
                                            alt="img-input"
                                            className={cn(
                                                "z-[20] w-[95%] h-[13.5rem] object-contain",
                                                ((selectedImage || imageSrc) && variant === 'tipe-2')
                                                    ? 'h-[7rem]'
                                                    : 'h-[13.5rem]'

                                            )}
                                        />

                                    ) : (
                                        <div
                                            className={cn(
                                                'w-full flex justify-start items-center gap-4 px-2',
                                                (variant === 'tipe-2') && 'h-full',
                                                (fieldState.error || error) ? 'text-rose-500' : 'text-gray-600',
                                            )}
                                        >
                                            {
                                                variant === 'tipe-2'
                                                    ? <div className='w-full h-full flex items-center justify-between'>
                                                        <span className='text-xs text-gray-500'>{info}</span>
                                                        <div
                                                            className='cursor-pointer flex items-center gap-2 px-3 bg-amber-100 text-amber-600 text-xs h-[75%] tracking-wide font-semibold rounded-sm'
                                                        >
                                                            <ArrowUpFromLine className='h-3.5 w-3.5' />
                                                            <span>Upload</span>
                                                        </div>
                                                    </div>
                                                    : <>
                                                        <Image className={cn(
                                                            (fieldState.error || error) ? 'text-rose-500' : 'text-premium-gold-sgs',
                                                            'h-[50px] w-[50px]'
                                                        )} />
                                                        <div className='flex flex-col justify-center gap-1'>
                                                            <span className='font-semibold'>Upload Foto</span>
                                                            <p className="text-center text-gray-400 text-xs font-medium">{info}</p>
                                                        </div>
                                                    </>
                                            }

                                        </div>
                                    )
                                }
                            </div>
                        </>
                    </FormControl>
                    {
                        showError
                            ? <div className={cn(
                                (fieldState.error) && 'mt-1'
                            )}>
                                <FormMessage />
                            </div>
                            : ''
                    }
                </FormItem>
            )}
        />
    );
}
