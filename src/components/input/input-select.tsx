import { useEffect, useState } from 'react';
import { Control, FieldValues, FieldPath } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { cn } from '@/lib/utils';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

interface InputSelectProps<T> {
    name: FieldPath<FieldValues>;
    control: Control<any>;
    disabled?: boolean;
    placeholder: string;
    qa: string;
    label?: string;
    labelFilter?: string;
    isReset?: boolean;
    loading?: boolean;
    listData: T[];
    required?: boolean;
    renderLabel?: (item: T) => string;
    compareFn?: (item: T) => string | number;   // ✅ unique ID function
    readOnly?: boolean;
    activatePortal?: boolean;
}

export default function InputSelect<T>({
    name,
    label,
    labelFilter,
    control,
    disabled,
    placeholder,
    isReset = true,
    qa,
    listData,
    loading,
    required,
    renderLabel,
    compareFn,
    readOnly,
    activatePortal = false
}: Readonly<InputSelectProps<T>>) {

    useEffect(() => {
        const addCustomAttributes = () => {
            const nativeSelect = document.querySelectorAll(`select[aria-hidden="true"]`);
            nativeSelect.forEach(selectElement => {
                if (selectElement) {
                    const qaTrigger = selectElement.closest(`div`)?.querySelector(`[qa-select-trigger="${qa}"]`);
                    if (qaTrigger) {
                        selectElement.setAttribute('qa-select', qa ?? '');

                        Array.from(selectElement.querySelectorAll('option')).forEach((option, i) => {
                            option.setAttribute('qa-select-option', `${qa}-option-${i}`);
                        });
                    }
                }
            });
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    addCustomAttributes();
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        addCustomAttributes();
        return () => observer.disconnect();
    }, [qa, listData]);

    const [open, setOpen] = useState(false);

    // -----------------------------
    // VALUE + LABEL HELPERS
    // -----------------------------
    const getItemValue = (item: T) => {
        const raw = compareFn ? compareFn(item) : item;

        if (typeof raw === "string" || typeof raw === "number") {
            return String(raw);
        }

        // fallback if raw is object
        return JSON.stringify(raw);
    };

    const getItemLabel = (item: T) =>
        renderLabel ? renderLabel(item) : String(item);

    // For displaying selected label on trigger
    const getTriggerLabel = (value: any) => {
        if (!value) return "";
        return renderLabel ? renderLabel(value) : String(value);
    };

    return (
        <FormField
            name={name}
            control={control}
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
                                    <Select
                                        open={open}
                                        onOpenChange={setOpen}
                                        disabled={disabled}
                                        value={field.value ? getItemValue(field.value) : ""}
                                        onValueChange={(selectedId) => {
                                            const selectedItem = listData.find(
                                                item => getItemValue(item) === selectedId
                                            );

                                            // ❗ Return whole object OR primitive
                                            field.onChange(selectedItem ?? null);
                                        }}
                                    >
                                        <SelectTrigger
                                            qa-select-trigger={qa}
                                            className={cn(
                                                readOnly && 'pointer-events-none',
                                                fieldState.error && "bg-rose-100 border-rose-500",
                                                field.value ? 'text-black' : 'text-gray-500/80',
                                                'relative cursor-pointer text-premium-gold-sgs border-premium-gold-sgs focus:ring-0'
                                            )}
                                        >
                                            <SelectValue
                                                placeholder={placeholder}
                                                defaultValue=""
                                            >
                                                {getTriggerLabel(field.value)}
                                            </SelectValue>

                                            {labelFilter && (
                                                <span className='absolute -top-[11px] left-2 text-[11px] bg-white px-1 text-gray-500'>
                                                    {labelFilter}
                                                </span>
                                            )}
                                        </SelectTrigger>

                                        <SelectContent
                                            data-radix-select-content
                                            qa-select={qa}
                                            className='max-h-[250px] relative bg-[#F6F2E9] border-premium-gold-sgs'
                                            activatePortal={activatePortal}
                                        >
                                            {listData?.map((item, index) => {
                                                const itemValue = getItemValue(item);
                                                const currentValue = field.value ? getItemValue(field.value) : "";
                                                const isSelected = currentValue === itemValue;

                                                return (
                                                    <div
                                                        key={itemValue + index}
                                                        onMouseDown={() => {
                                                            if (isSelected) {
                                                                field.onChange(null);
                                                                setOpen(false);
                                                            }
                                                        }}
                                                    >
                                                        <SelectItem
                                                            qa-select-option={qa}
                                                            data-custom-attribute="value1"
                                                            className='cursor-pointer py-2'
                                                            onSelect={() => setOpen(false)}
                                                            value={itemValue}
                                                        >
                                                            {getItemLabel(item)}
                                                        </SelectItem>
                                                    </div>
                                                );
                                            })}

                                            {isReset && (
                                                <div className="p-1 fixed top-1 right-1">
                                                    <Button
                                                        qa={`${qa}-reset`}
                                                        type="button"
                                                        onClick={() => field.onChange(null)}
                                                        className="w-fit h-fit text-xs py-[7px] px-4 rounded-sm flex gap-1 bg-rose-100 border-px border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white"
                                                    >
                                                        <Trash2 className='h-4 w-4' />
                                                    </Button>
                                                </div>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <div className={cn(label ? 'pt-1' : '')}>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        </TooltipTrigger>

                        {(!open && field.value) && (
                            <TooltipContent
                                align='start'
                                side='bottom'
                                className="-mt-1"
                            >
                                {getTriggerLabel(field.value)}
                            </TooltipContent>
                        )}
                    </Tooltip>
                </TooltipProvider>
            )}
        />
    );
}
