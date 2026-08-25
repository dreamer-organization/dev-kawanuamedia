import { useEffect, useRef, useState } from 'react';
import { Textarea } from '../ui/textarea'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';

interface InputTextareaProps {
    control: Control<any>;
    name: string;
    disabled?: boolean;
    qa: string;
    loading?: boolean;
    error?: string;
    label?: string;
    placeholder?: string;
    rows?: number;
    trigger?: any;
    shouldTrigger?: boolean;
    pathTriggerFieldTarget?: any;
    watch?: any;
    readOnly?: boolean;
    description?: string;
    className?: string;
    max?: number;
    required?: boolean;
}

export default function InputTextarea({
    control,
    name,
    disabled,
    loading,
    error,
    label,
    qa,
    placeholder,
    rows,
    trigger,
    shouldTrigger = false,
    pathTriggerFieldTarget,
    watch,
    readOnly,
    description,
    className,
    max,
    required
}: Readonly<InputTextareaProps>) {

    const watchedValue = watch ? watch(name) : undefined;

    const isFirstRender = useRef(true);

    const [charCount, setCharCount] = useState(0); // ⭐ NEW

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
            control={control}
            name={name}
            defaultValue=""
            render={({ field, fieldState }) => (
                <FormItem className={cn('w-full', label ? "space-y-1" : "space-y-0")}>
                    {
                        label && (
                            <FormLabel className={cn(fieldState.error && "text-destructive", 'w-full flex items-center justify-start text-start')}>
                                {label} {required && <span className='text-rose-500 text-base'>*</span>}
                            </FormLabel>
                        )
                    }

                    {description && (
                        <div className='mt-1'>
                            <FormDescription className='text-xs'>
                                {description}
                            </FormDescription>
                        </div>
                    )}

                    <FormControl>
                        <Textarea
                            {...field}
                            qa-textarea={qa}
                            disabled={disabled}
                            readOnly={readOnly}
                            placeholder={placeholder}
                            rows={rows}
                            maxLength={max}
                            onChange={(e) => {
                                let value = e.target.value;

                                // ⭐ Limit characters
                                if (max && value.length > max) {
                                    value = value?.slice(0, max);
                                }

                                setCharCount(value.length);

                                field.onChange(value);
                            }}
                            className={cn(
                                fieldState.invalid || error ? 'bg-rose-100 border-rose-500' : '',
                                'text-black disabled:bg-gray-100',
                                className
                            )}
                        />
                    </FormControl>

                    <div className={cn('grid grid-cols-[10fr_1fr] gap-2')}>
                        {
                            error
                                ? <div className="pt-1">
                                    <FormMessage>{error.replace(/"/g, '')}</FormMessage>
                                </div>
                                : <div className='pt-1'><FormMessage /></div>
                        }

                        {
                            max && (
                                <div className="text-[11px] text-gray-400 text-right">
                                    {charCount}/{max}
                                </div>
                            )
                        }
                    </div>
                </FormItem>
            )}
        />
    );
}
