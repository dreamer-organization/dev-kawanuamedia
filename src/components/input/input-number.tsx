import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Control } from 'react-hook-form';

import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useRef } from 'react';

interface InputNumberProps extends NumericFormatProps {
    control: Control<any>;
    name: string;
    description?: string;
    qa: string;
    error?: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    showError?: boolean;
    isCenter?: boolean;
    allowNegative?: boolean;
    allowLeadingZeros?: boolean;
    alignTooltip?: "start" | "center" | "end" | undefined,
    adjustTooltipWidth?: number,
    endAdorn?: React.ReactNode | string;
}


export default function InputNumber({
    control,
    name,
    description,
    disabled,
    qa,
    error,
    label,
    showError = true,
    required,
    isCenter,
    className,
    allowNegative = false,
    allowLeadingZeros = false,
    alignTooltip,
    adjustTooltipWidth,
    endAdorn,
    ...props
}: Readonly<InputNumberProps>) {

    const inputRef = useRef<HTMLInputElement>(null);

    const width = inputRef.current?.offsetWidth;

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
                                    <div className="relative flex items-center">
                                        <NumericFormat
                                            {...props}
                                            getInputRef={inputRef}
                                            value={field.value === undefined || field.value === null ? '' : field.value}
                                            onValueChange={(values) => {
                                                const value = values.floatValue;
                                                field.onChange(value === undefined || value === null ? 0 : value);
                                            }}
                                            allowNegative={allowNegative}
                                            allowLeadingZeros={allowLeadingZeros}
                                            customInput={Input}
                                            disabled={disabled}
                                            className={cn(
                                                ((fieldState.error || error) && !disabled) && "bg-rose-100 !border-rose-500",
                                                isCenter && 'text-center',
                                                'text-black',
                                                className
                                            )}
                                        />
                                        {
                                            <div className='h-fit absolute right-[12px] top-[10px] rounded-md text-sm'>{endAdorn}</div>
                                        }
                                    </div>
                                </FormControl>
                                {
                                    description && (
                                        <FormDescription className='text-xs'>
                                            {description}
                                        </FormDescription>
                                    )
                                }
                                {
                                    (showError && !disabled) && (
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
                            (Number(field.value) > 0) && (
                                <TooltipContent
                                    align={alignTooltip}
                                    side='bottom'
                                    className="z-[9999] !-translate-y-2 break-words whitespace-pre-wrap"
                                    style={{ width: width ? `${width + (adjustTooltipWidth ? adjustTooltipWidth : 0)}px` : 'auto' }}
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
