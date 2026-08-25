import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react';

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Control, useWatch } from 'react-hook-form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { isEmpty } from '@/lib/is-empty';

interface InputTextProps {
    control: Control<any>;
    name: string;
    startAdorn?: React.ReactNode | string;
    endAdorn?: React.ReactNode | string;
    loading?: boolean;
    type?: string;
    input_variant?: string;
    description?: string;
    qa: string;
    error?: string;
    label?: string;
    placeholder?: string;
    size?: string;
    className?: string;
    disabled?: boolean;
    isCenter?: boolean;
    showError?: boolean;
    trigger?: any;
    shouldTrigger?: boolean;
    pathTriggerFieldTarget?: any;
    watch?: any;
    fieldArrayLength?: number;
    max?: number;
    showMaxCharacter?: boolean;
    required?: boolean;
    readOnly?: boolean;
    alignTooltip?: "start" | "center" | "end",
    adjustTooltipWidth?: number
}

export default function InputText({
    control,
    name,
    startAdorn,
    endAdorn,
    loading,
    description,
    disabled,
    qa,
    type = 'text',
    input_variant = 'default',
    error,
    label,
    placeholder,
    size,
    isCenter,
    className,
    showError = true,
    trigger,
    shouldTrigger = false,
    pathTriggerFieldTarget,
    watch,
    max,
    showMaxCharacter = false,
    fieldArrayLength = 0,
    required,
    readOnly,
    alignTooltip = 'start',
    adjustTooltipWidth,
}: Readonly<InputTextProps>) {

    const watchedValue = useWatch({
        control,
        name,
        defaultValue: '',
    });


    const isFirstRender = useRef(true);


    const previousFieldArrayLength = useRef<number>(fieldArrayLength);

    useEffect(() => {
        if (!shouldTrigger) return;

        // Skip effect on first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Skip effect if a field was removed (field count decreased)
        if (fieldArrayLength < previousFieldArrayLength.current) {
            previousFieldArrayLength.current = fieldArrayLength; // Update count
            return;
        }

        previousFieldArrayLength.current = fieldArrayLength; // Update ref after validation

        if (watchedValue !== undefined) {
            trigger(pathTriggerFieldTarget);
        }
    }, [
        shouldTrigger,
        control,
        pathTriggerFieldTarget,
        watchedValue,
        fieldArrayLength, // Track field count changes
    ]);


    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
        setInputType(prevType => prevType === 'password' ? 'text' : 'password');
    };

    const handleKeyDown = (type: string, e: any) => {
        // Allow navigation keys, backspace, etc.
        const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab', ' '];

        if (e.ctrlKey || e.metaKey) {
            return;
        }

        if (allowedKeys.includes(e.key)) return;

        if (type === 'number') {
            if (['.'].includes(e.key)) return;
            if (!/^\d$/.test(e.key)) {
                e.preventDefault();
            }
        }

        if (type === 'Alphabetic') {
            if (!/^[a-zA-Z]$/.test(e.key)) {
                e.preventDefault();
            }
        }

        if (type === 'Numeric') {
            if (!/^[0-9]$/.test(e.key)) {
                e.preventDefault();
            }
        }

        if (type === 'Alphanumeric') {
            if (!/^[a-zA-Z0-9.,-]$/.test(e.key)) {
                e.preventDefault();
            }
        }
    };

    const handleChange = (type: string, e: React.ChangeEvent<HTMLInputElement>) => {
        if (type === 'number') {
            let value = e.target.value.replace(/D/g, ""); // Allow only numbers
            const input = e.target

            if (max !== undefined && Number(value) > Number(max)) {
                input.value = max.toString(); // Limit max value
            }
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const width = inputRef.current?.offsetWidth;

    const charCount =
        showMaxCharacter && typeof watchedValue === 'string'
            ? watchedValue.length
            : 0;



    return (
        <FormField
            control={control}
            name={name}
            defaultValue=""
            render={({ field, fieldState }) => (
                <TooltipProvider delayDuration={700}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <FormItem className={cn('w-full', label ? "space-y-1" : "space-y-0")}>
                                <FormLabel className={cn(fieldState.error && "text-destructive", 'w-full flex items-center justify-start text-start')}>
                                    {label} {required && <span className='text-rose-500 text-base'>*</span>}
                                </FormLabel>
                                <FormControl>
                                    <div
                                        className="relative flex items-center"
                                    >
                                        <Input
                                            {...field}
                                            ref={inputRef}
                                            autoFocus={false}
                                            step="any"
                                            onChange={(e) => {
                                                let value = e.target.value;

                                                // Enforce max length
                                                if (max && value.length > max) {
                                                    value = value?.slice(0, max);
                                                }

                                                if (type === 'number') {
                                                    handleChange(type, e);
                                                }

                                                field.onChange(value);
                                            }}


                                            onKeyDown={(e) => handleKeyDown(type, e)}
                                            onBlur={(e) => {
                                                field.onBlur();
                                            }}
                                            onPaste={(e) => {
                                                const clipboardData = e.clipboardData || (globalThis as any).clipboardData;
                                                const pastedText = clipboardData.getData('text');

                                                let filteredText = pastedText;

                                                if (type === 'number') {
                                                    filteredText = pastedText.replace(/[^0-9.]/g, '');
                                                } else if (type === 'Alphabetic') {
                                                    filteredText = pastedText.replace(/[^a-zA-Z]/g, '');
                                                } else if (type === 'Alphanumeric') {
                                                    filteredText = pastedText.replace(/[^a-zA-Z0-9.,-]/g, '');
                                                }

                                                // 🔴 Enforce max length
                                                if (max) {
                                                    filteredText = filteredText?.slice(0, max);
                                                }

                                                e.preventDefault();
                                                field.onChange(filteredText);
                                            }}

                                            data-type={type}
                                            // datatype={type}
                                            input_variant={input_variant}
                                            min={0}
                                            qa-input={qa}
                                            type={type === 'number' ? 'text' : inputType}
                                            disabled={disabled}
                                            readOnly={readOnly}
                                            placeholder={placeholder}
                                            className={cn(
                                                (fieldState.error || error) && "bg-rose-100 !border-rose-500",
                                                size === 'lg' && 'h-[50px]',
                                                startAdorn && 'pl-[45px]',
                                                endAdorn && 'pr-[45px]',
                                                showMaxCharacter && 'pr-[60px]',
                                                isCenter && 'text-center',
                                                'text-black',
                                                className
                                            )}
                                        />
                                        {
                                            <div className='absolute left-[12px] bottom-[10px] text-sm'>{startAdorn}</div>
                                        }
                                        {
                                            <div className='h-fit absolute right-[12px] bottom-[10px] rounded-md text-sm'>{endAdorn}</div>
                                        }
                                        {
                                            type === 'password' && (
                                                <button
                                                    type="button"
                                                    onClick={togglePasswordVisibility}
                                                    aria-label={inputType === 'password' ? "Hide password" : "Show password"}
                                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    {inputType === 'password' ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
                                                </button>
                                            )
                                        }

                                        {
                                            (showMaxCharacter && !readOnly) && (
                                                <div className="hidden md:block absolute right-[12px] top-[13px] text-[11px] text-gray-400 text-right">
                                                    {charCount}/{max}
                                                </div>
                                            )
                                        }
                                    </div>
                                </FormControl>

                                {
                                    description && (
                                        <div className='mt-1'>
                                            <FormDescription className='text-xs'>
                                                {description}
                                            </FormDescription>
                                        </div>
                                    )
                                }

                                {
                                    showError && (
                                        <div className={cn(
                                            (fieldState.error || error) && 'pt-1'
                                        )}>
                                            <FormMessage />
                                        </div>
                                    )
                                }
                            </FormItem>
                        </TooltipTrigger>
                        {
                            (!isEmpty(field.value)) && (
                                <TooltipContent
                                    align={alignTooltip}
                                    side='bottom'
                                    className="z-[9999] !-translate-y-1 break-words whitespace-pre-wrap"
                                    style={{ width: width ? `${width + (adjustTooltipWidth || 0)}px` : 'auto' }}
                                >
                                    {
                                        <>
                                            {field.value}
                                        </>
                                    }
                                </TooltipContent>
                            )
                        }
                    </Tooltip>
                </TooltipProvider>
            )}
        />
    )
}
