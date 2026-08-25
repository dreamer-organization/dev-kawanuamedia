import React, { useRef, useState } from 'react';
import { ArrowUpFromLine, CloudUpload, FileText, Pencil, Trash2, X } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Control } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface InputPhotoProps {
    name: string;
    label?: string;
    control: Control<any>;
    qa: string;
    linkPhoto?: string;
    info?: string;
    disabled?: boolean;
    fileType?: string;
    height?: string;
    icon?: React.ReactNode;
    variant?: string;
    placeholder?: string;
    description?: string;
    readOnly?: boolean;
    textLength?: number;
    withTextUploadButton?: boolean;
    isDeleteFileFromUrl?: boolean;
    funcDeleteFileFromUrl?: () => void;
    required?: boolean;
}

export default function InputFile({
    name,
    control,
    qa,
    label,
    linkPhoto,
    info,
    disabled,
    fileType,
    height = '11rem',
    icon,
    variant = 'default',
    placeholder,
    description,
    readOnly,
    textLength,
    withTextUploadButton = true,
    isDeleteFileFromUrl,
    funcDeleteFileFromUrl,
    required
}: Readonly<InputPhotoProps>) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [hoverShowEdit, setHoverShowEdit] = useState(false);

    const handleFileChange = (event: any, onChange: any) => {
        const file = event.target.files[0];
        if (file) {
            onChange([file]); // update react-hook-form value
            setHoverShowEdit(false);
        }
    };

    const handleRemoveFile = (onChange: any) => {
        onChange([]); // reset form value
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // allow re-uploading same file
        }
    };

    function clipText(text: string, maxLength = 30) {
        if (text?.length <= maxLength) return text;
        const beginning = text.slice(0, maxLength / 2);
        const end = text.slice(text.length - maxLength / 2);
        return beginning + '...' + end;
    }

    return (
        <FormField
            name={name}
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, ...field }, fieldState }) => {
                const selectedFile: File | undefined = value?.[0];

                return (
                    <FormItem
                        className={cn(
                            'flex flex-col',
                            label ? 'space-y-1' : 'space-y-0',
                            fieldState.error ? 'mt-3 -mb-3 gap-[1px]' : 'mt-0 mb-0'
                        )}
                    >
                        <FormLabel className={cn(fieldState.error && "text-destructive", 'w-full flex items-center justify-start text-start')}>
                            {label} {required && <span className='text-rose-500 text-base'>*</span>}
                        </FormLabel>
                        <FormControl>
                            {variant === 'default' ? (
                                <>
                                    <input
                                        qa-upload-file={qa}
                                        type="file"
                                        id={name}
                                        disabled={disabled}
                                        accept={fileType}
                                        {...field}
                                        ref={fileInputRef}
                                        onChange={(event) => handleFileChange(event, onChange)}
                                        className="hidden"
                                    />
                                    <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file) {
                                                onChange([file]);
                                                setHoverShowEdit(false);
                                            }
                                        }}
                                        onMouseEnter={() => setHoverShowEdit(true)}
                                        onMouseLeave={() => setHoverShowEdit(false)}
                                        style={{ height }}
                                        className={cn(
                                            'relative w-full xl:w-full rounded overflow-clip grid place-items-center',
                                            readOnly && 'pointer-events-none',
                                            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                                            fieldState.error
                                                ? 'border-2 border-dashed border-rose-500 bg-rose-100'
                                                : 'border-2 border-dashed border-gray-300',
                                            hoverShowEdit && !disabled && 'bg-gray-200',
                                            disabled && 'bg-gray-200'
                                        )}
                                    >
                                        {hoverShowEdit && !disabled && (
                                            selectedFile || linkPhoto ? (
                                                <div
                                                    className={`absolute z-[50] w-full h-full flex items-center justify-center gap-2 text-white cursor-pointer 
                          ${(linkPhoto || selectedFile) && 'bg-[#00000091]'}`}
                                                >
                                                    <label
                                                        htmlFor={name}
                                                        className="flex justify-center items-center px-3 gap-2 w-[6rem] text-xs py-2 rounded transition duration-300 hover:bg-premium-gold-sgs hover:text-white text-black bg-white cursor-pointer"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                        <span>Edit</span>
                                                    </label>

                                                    {selectedFile && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFile(onChange)}
                                                            className="flex justify-center items-center px-3 gap-2 w-[6rem] text-xs py-2 rounded transition duration-300 bg-white hover:bg-rose-500 hover:text-white text-rose-500 cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                            <span>Hapus</span>
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <label
                                                    htmlFor={name}
                                                    className="absolute z-[50] w-full h-full cursor-pointer mb-2"
                                                >
                                                    {''}
                                                </label>
                                            )
                                        )}

                                        {selectedFile ? (
                                            <div
                                                className={`flex flex-col gap-6 items-center justify-center relative p-8 ${fieldState.error ? 'text-rose-500' : 'text-gray-600'
                                                    }`}
                                            >
                                                <FileText className="scale-150 xl:scale-[5] mb-4 text-blue-50 absolute z-10" />
                                                <div className="z-30 flex flex-col items-center gap-1">
                                                    <span className="text-center text-premium-gold-sgs font-medium">
                                                        {clipText(selectedFile?.name, 35) || ''}
                                                    </span>
                                                    <p className="text-center text-gray-400 text-[9px] xl:text-xs">
                                                        {clipText(selectedFile?.type, 30) || ''}
                                                    </p>
                                                    <p className="text-center text-[9px] xl:text-xs max-w-[90%] font-semibold">
                                                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`flex flex-col gap-2 items-center justify-center p-8 ${fieldState.error ? 'text-rose-500' : 'text-gray-600'
                                                    }`}
                                            >
                                                {icon || <CloudUpload />}
                                                <span className="text-base font-semibold">
                                                    Click or drag file to this area to upload
                                                </span>
                                                <p className="text-center text-gray-500 text-sm xl:text-xs max-w-[90%]">
                                                    {info}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <input
                                        qa-upload-file={qa}
                                        type="file"
                                        id={name}
                                        disabled={disabled}
                                        accept={fileType}
                                        {...field}
                                        ref={fileInputRef}
                                        onChange={(event) => handleFileChange(event, onChange)}
                                        className="hidden"
                                    />
                                    <div
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file) {
                                                onChange([file]);
                                                setHoverShowEdit(false);
                                            }
                                        }}
                                        onMouseEnter={() => setHoverShowEdit(true)}
                                        onMouseLeave={() => setHoverShowEdit(false)}
                                        className={cn(
                                            'relative w-full xl:w-full rounded-md overflow-clip grid place-items-center h-10',
                                            readOnly && 'pointer-events-none',
                                            disabled ? 'cursor-not-allowed' : '',
                                            fieldState.error
                                                ? 'border border-rose-500 bg-rose-100'
                                                : 'border border-gray-300',
                                            disabled && 'bg-gray-200'
                                        )}
                                    >
                                        <label
                                            htmlFor={name}
                                            className="cursor-pointer absolute z-[50] w-full h-10 flex items-center justify-between pl-3 pr-1"
                                        >
                                            {selectedFile ? (
                                                <span className="text-sm text-center text-premium-gold-sgs font-medium">
                                                    {clipText(selectedFile?.name, textLength) || ''}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-gray-500">
                                                    {placeholder}
                                                </span>
                                            )}

                                            <div className="flex items-center gap-4 h-full">
                                                {selectedFile && (
                                                    <div className="w-full">
                                                        <button
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleRemoveFile(onChange);
                                                            }}
                                                            className="bg-gray-100 hover:bg-gray-300 transition duration-300 rounded-full h-5 w-5 flex items-center justify-center cursor-pointer"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                )}
                                                <div className='w-full h-full flex justify-center items-center gap-1'>
                                                    {
                                                        isDeleteFileFromUrl && (
                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger className='h-full'>
                                                                        <button
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                e.stopPropagation();
                                                                                funcDeleteFileFromUrl?.();
                                                                            }}
                                                                            className="cursor-pointer flex items-center gap-2 px-3 bg-rose-100 text-rose-600 hover:bg-rose-200 transition duration-300 text-xs h-[75%] tracking-wide font-semibold rounded-sm">
                                                                            <X className="h-3.5 w-3.5" />
                                                                            {withTextUploadButton && <span>Hapus</span>}
                                                                        </button>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent
                                                                        side='bottom'
                                                                    >
                                                                        Hapus File yang diupload sebelumnya.
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            </TooltipProvider>
                                                        )
                                                    }
                                                    <div className="cursor-pointer flex items-center gap-2 px-3 bg-amber-100 text-amber-600 text-xs h-[75%] tracking-wide font-semibold rounded-sm">
                                                        <ArrowUpFromLine className="h-3.5 w-3.5" />
                                                        {withTextUploadButton && <span>Upload</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </>
                            )}
                        </FormControl>
                        <div className={cn(
                            (fieldState.error) && 'mt-1'
                        )}>
                            <FormMessage />
                        </div>
                        <div className="pt-1">
                            {description && (
                                <FormDescription className="text-xs">{description}</FormDescription>
                            )}
                        </div>
                    </FormItem>
                );
            }}
        />
    );
}
