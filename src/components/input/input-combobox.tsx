import { Check, ChevronsUpDown, Loader, Plus, Trash2, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useRef, useState } from "react"
import { Control, FieldPath, FieldValues } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { clipText } from "@/lib/clip-text"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { isEmpty } from "@/lib/is-empty"

interface InputComboboxProps<T> {
    name: FieldPath<FieldValues>;
    label?: string;
    disabled?: boolean;
    control?: Control<any>;
    loading?: boolean;
    placeholder?: string;
    placeholderInput?: string;
    noDataPlaceholder?: string;
    qa: string;
    listData: T[];
    required?: boolean;
    renderLabel: (item: T) => string;
    compareFn: (item: T, value: T | null) => boolean; // Function to compare item with the current value
    onInputChange?: (inputValue: string) => void;
    readOnly?: boolean;
    addNewItem?: any;
    addNewItemFn?: () => void;
    isReset?: boolean;
    maxLengthText?: number;
    contentWidth?: number;
    description?: string;
    customTooltip?: string;
    dataSideCustomTooltip?: (item: T) => React.ReactNode;
    dataSideCustomTooltipSide?: "right" | "top" | "bottom" | "left"
}
export default function InputCombobox<T>({
    name,
    control,
    disabled,
    loading,
    qa,
    label,
    placeholder,
    placeholderInput,
    noDataPlaceholder,
    listData,
    onInputChange,
    renderLabel,
    required,
    compareFn,
    readOnly,
    addNewItem,
    addNewItemFn,
    isReset = true,
    maxLengthText = 1000,
    contentWidth,
    description,
    customTooltip,
    dataSideCustomTooltip,
    dataSideCustomTooltipSide = 'right'
}: Readonly<InputComboboxProps<T>>) {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (value: string) => {
        setInputValue(value);
        if (onInputChange) {
            onInputChange(value);
        }
    };

    const prevOpen = useRef(open);
    const defaultInputValue = useRef(inputValue); // store initial default value from props

    useEffect(() => {
        if (prevOpen.current && !open) {
            // only runs when user closes the popover
            setInputValue(defaultInputValue.current);
            if (onInputChange) {
                onInputChange(defaultInputValue.current);
            }
        }
        prevOpen.current = open;
    }, [open]);


    const buttonRef = useRef<HTMLButtonElement>(null);

    const width = contentWidth || buttonRef.current?.offsetWidth;

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
                                    <Popover open={open} onOpenChange={setOpen} >
                                        <PopoverTrigger asChild >
                                            <Button
                                                ref={buttonRef}
                                                qa={qa}
                                                variant="outline"
                                                type="button"
                                                disabled={loading || disabled}
                                                aria-expanded={open}
                                                className={cn(
                                                    readOnly && 'pointer-events-none',
                                                    fieldState.error && "bg-rose-100 border-rose-500",
                                                    "w-full justify-between font-normal px-3 disabled:opacity-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                )}
                                            >
                                                <div>
                                                    {field.value && Object.keys(field.value).length > 0
                                                        ? clipText(
                                                            renderLabel
                                                                ? renderLabel(field.value)
                                                                : String(field.value), maxLengthText, 'end')
                                                        : <span className="text-gray-500/80">{clipText(String(placeholder), maxLengthText, 'end')}</span>}
                                                </div>

                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            side="bottom"
                                            align="start"
                                            className="p-0 z-[999] pointer-events-auto h-full"
                                            style={{ width: width ? `${width}px` : 'auto' }}
                                        >
                                            <Command className="!max-h-[300px]">
                                                <CommandInput
                                                    qa-combobox-input={qa}
                                                    placeholder={placeholderInput}
                                                    value={inputValue}
                                                    onValueChange={handleInputChange}
                                                    className="pointer-events-auto"
                                                    onMouseDown={(e) => e.stopPropagation()} // Prevent modal or other elements from blocking interaction
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                <CommandList
                                                    qa-combobox-list={qa}
                                                >
                                                    {
                                                        loading
                                                            ? <div className="w-full !h-[150px] flex justify-center items-center">
                                                                <Loader className='animate-spin' />
                                                            </div>
                                                            : <>
                                                                <CommandEmpty className={cn(addNewItem ? "pt-6 pb-0" : "py-6")}>
                                                                    <div className="flex flex-col gap-4">
                                                                        {noDataPlaceholder ?? 'Data tidak ditemukan'}

                                                                        {addNewItem && (
                                                                            <div className="border-t-2 p-1 m-0">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={addNewItemFn}
                                                                                    className="cursor-pointer flex items-center justify-start w-full p-2 text-accent-foreground hover:bg-accent rounded"
                                                                                >
                                                                                    <Plus className="h-4 w-4 mr-2" />
                                                                                    Tambah Baru
                                                                                </button>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </CommandEmpty>
                                                                <CommandGroup className="relative max-h-[250px] overflow-auto">
                                                                    {listData.map((item, index) => (
                                                                        <TooltipProvider key={renderLabel ? renderLabel(item) + index : String(item) + index}>
                                                                            <Tooltip>
                                                                                <TooltipTrigger className="w-full text-start" type="button">
                                                                                    <CommandItem
                                                                                        qa-combobox-option={item + String(index)}
                                                                                        className="cursor-pointer py-2 grid grid-cols-[30px_1fr]"
                                                                                        value={renderLabel ? renderLabel(item) : String(item)}
                                                                                        onSelect={() => {
                                                                                            const selectedItem = item; // directly use the item, not find by label

                                                                                            field.onChange(
                                                                                                selectedItem && compareFn(selectedItem, field.value) ? null : selectedItem
                                                                                            );
                                                                                            setOpen(false);
                                                                                        }}
                                                                                    >
                                                                                        <Check
                                                                                            className={cn(
                                                                                                "h-4 w-4",
                                                                                                compareFn(item, field.value) ? "opacity-100" : "opacity-0"
                                                                                            )}
                                                                                        />
                                                                                        {
                                                                                            renderLabel
                                                                                                ? renderLabel(item === '' ? ('-' as T) : item)
                                                                                                : String(item === '' ? '-' : item)
                                                                                        }
                                                                                    </CommandItem>
                                                                                </TooltipTrigger>
                                                                                {
                                                                                    dataSideCustomTooltip?.(item) && (
                                                                                        <TooltipContent
                                                                                            align='start'
                                                                                            side={dataSideCustomTooltipSide}
                                                                                            className={cn(
                                                                                                (dataSideCustomTooltipSide === 'bottom' || dataSideCustomTooltipSide === 'top')
                                                                                                    ? 'ml-8' : 'ml-2',
                                                                                                'z-[9999] break-words whitespace-pre-wrap max-w-[450px]'
                                                                                            )}
                                                                                        >
                                                                                            {
                                                                                                dataSideCustomTooltip?.(item)
                                                                                                    ? dataSideCustomTooltip?.(item)
                                                                                                    : null
                                                                                            }
                                                                                        </TooltipContent>
                                                                                    )
                                                                                }
                                                                            </Tooltip>
                                                                        </TooltipProvider>
                                                                    ))}

                                                                    {
                                                                        addNewItem && (
                                                                            <>
                                                                                <CommandSeparator className="my-1" />
                                                                                <CommandItem
                                                                                    onSelect={addNewItemFn}
                                                                                    className="cursor-pointer"
                                                                                >
                                                                                    <Plus className='h-4 w-4 mr-2' />
                                                                                    Tambah Baru
                                                                                </CommandItem>
                                                                            </>
                                                                        )
                                                                    }

                                                                    {
                                                                        isReset && (
                                                                            <div className="p-1 fixed top-1 right-2">
                                                                                <Button
                                                                                    qa={`${qa}-reset`}
                                                                                    type="button"
                                                                                    onClick={() => field.onChange(null)}
                                                                                    className="w-fit h-fit text-xs py-[7px] px-3 rounded-sm flex gap-1 bg-rose-100 border-px border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white"
                                                                                >
                                                                                    <Trash2 className='h-4 w-4' />
                                                                                </Button>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </CommandGroup>
                                                            </>
                                                    }

                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                {
                                    description && (
                                        <div className='mt-[1px]'>
                                            <FormDescription className='text-xs'>
                                                {description}
                                            </FormDescription>
                                        </div>
                                    )
                                }
                                <div className={cn(label ? 'pt-1' : '')}>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        </TooltipTrigger>
                        {
                            (!open && !isEmpty(field.value)) && (
                                <TooltipContent
                                    align='start'
                                    side='bottom'
                                    className="z-[9999] !-translate-y-2 break-words whitespace-pre-wrap"
                                    style={{ width: width ? `${width}px` : 'auto' }}
                                >
                                    {
                                        customTooltip || <>
                                            {field.value && Object.keys(field.value).length > 0
                                                ? renderLabel(field.value)
                                                : placeholder}
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
