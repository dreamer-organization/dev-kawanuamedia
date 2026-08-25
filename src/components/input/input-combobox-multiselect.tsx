import { ArrowUpRight, Check, ChevronsUpDown, Loader, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import ModalChildren from "../modals/modal-children";
import { clipText } from "@/lib/clip-text";

interface InputComboboxMultipleSelectProps<T> {
    name: FieldPath<FieldValues>;
    label?: string;
    disabled?: boolean;
    control: Control<any>;
    loading?: boolean;
    placeholder?: string;
    placeholderInput?: string;
    noDataPlaceholder?: string;
    qa: string;
    listData: any;
    renderLabel: (item: T) => string;
    compareFn?: (item: T, value: T | null) => boolean; // Function to compare item with the current value
    onInputChange?: (inputValue: string) => void;
    maxVisibleBadges?: number;
    titleModal?: string;
    showBadges?: boolean;
    readOnly?: boolean;
    maxLengthText?: number;
    description?: string;
    maxDataShowInInput?: number;
    contentWidth?: number;
    required?:boolean;
}
export default function InputComboboxMultipleSelect<T>({
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
    compareFn,
    showBadges = true,
    maxVisibleBadges = 5,
    titleModal = 'List Peserta Terpilih',
    readOnly,
    maxLengthText = 50,
    description,
    maxDataShowInInput = 3,
    contentWidth,
    required
}: Readonly<InputComboboxMultipleSelectProps<T>>) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [openCombobox, setOpenCombobox] = useState(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedValues, setSelectedValues] = useState<any[]>([]);

    useEffect(() => {
        if (!openCombobox) {
            setInputValue('');
            if (onInputChange) onInputChange('');
        }
    }, [openCombobox]);

    const toggleFramework = (item: T | string, field: any) => {
        setSelectedValues((current) => {
            const exists = current?.some((selected) =>
                typeof item === "string"
                    ? selected === item
                    : compareFn?.(selected, item)
            );

            let updatedValues;
            if (exists) {
                updatedValues = current.filter((selected) =>
                    typeof item === "string"
                        ? selected !== item
                        : !compareFn?.(selected, item)
                );
            } else {
                updatedValues = [...current, item];
            }

            field.onChange(updatedValues); // Ensure form state is updated
            return updatedValues;
        });
    };


    const onComboboxOpenChange = (value: boolean) => {
        inputRef.current?.blur();
        setOpenCombobox(value);
    };

    const resetValues = (field: any) => {
        // Reset the local selected values state
        setSelectedValues([]);

        // Reset the form state
        field.onChange([]);
    };


    const buttonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        if (!openCombobox) {
            setInputValue('')
        }
    }, [openCombobox])

    const [showAll] = useState(false);

    const [modalViewAllOpen, setModalViewAllOpen] = useState(false)

    const width = contentWidth || buttonRef.current?.offsetWidth;

    return (
        <FormField
            name={name}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => {

                useEffect(() => {
                    if (Array.isArray(field.value)) {
                        setSelectedValues(field.value);
                    } else if (field.value != null && field.value !== '') {
                        // if a single value somehow arrives, wrap it in an array
                        setSelectedValues([field.value]);
                    } else {
                        setSelectedValues([]);
                    }
                }, [field.value]);

                return (
                    <FormItem className={cn('w-full', label ? "space-y-1" : "space-y-0")}>
                        <FormLabel className={cn(fieldState.error && "text-destructive", 'w-full flex items-center justify-start text-start')}>
                            {label} {required && <span className='text-rose-500 text-base'>*</span>}
                        </FormLabel>
                        <FormControl>
                            <div className="w-full">
                                <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            qa={qa}
                                            variant="outline"
                                            ref={buttonRef}
                                            role="combobox"
                                            aria-expanded={openCombobox}
                                            disabled={disabled}
                                            className={cn(
                                                fieldState.error && "bg-rose-100 border-rose-500",
                                                readOnly && 'pointer-events-none',
                                                "w-full justify-between font-normal px-3 disabled:opacity-100 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                            )}
                                        >
                                            <div className="truncate text-left">
                                                {selectedValues?.length === 0 && (
                                                    <span className="text-gray-500/80">{placeholder}</span>
                                                )}

                                                {selectedValues?.length > 0 && selectedValues?.length <= maxDataShowInInput && (
                                                    <>
                                                        {clipText(
                                                            selectedValues.map((item) => renderLabel(item)).join(", "),
                                                            maxLengthText,
                                                            "end"
                                                        )}
                                                    </>
                                                )}

                                                {selectedValues?.length > maxDataShowInInput && (
                                                    <>{`${selectedValues?.length} data selected`}</>
                                                )}
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
                                        <Command loop>
                                            <CommandInput
                                                ref={inputRef}
                                                placeholder={placeholderInput}
                                                value={inputValue}
                                                onValueChange={(value) => {
                                                    setInputValue(value);
                                                    onInputChange?.(value); // Call the `onInputChange` prop if provided
                                                }}
                                            />

                                            <CommandList>
                                                {
                                                    loading
                                                        ? <div className="w-full !h-[150px] flex justify-center items-center">
                                                            <Loader className='animate-spin' />
                                                        </div>
                                                        : <>
                                                            <CommandEmpty>{noDataPlaceholder ?? 'Data tidak ditemukan'}</CommandEmpty>
                                                            <CommandGroup className="max-h-[250px] overflow-auto relative">
                                                                {listData.map((item: T, index: number) => {
                                                                    const isActive = selectedValues?.some((selected) => compareFn?.(selected, item));
                                                                    return (
                                                                        <CommandItem
                                                                            key={index || `index-${index}`}
                                                                            value={renderLabel(item)}
                                                                            onSelect={() => toggleFramework(item, field)}  // Pass `field` here
                                                                        >

                                                                            <Check
                                                                                className={cn(
                                                                                    "mr-2 h-4 w-4",
                                                                                    isActive ? "opacity-100" : "opacity-0",
                                                                                )}
                                                                            />
                                                                            <div className="flex-1">{renderLabel(item)}</div>
                                                                        </CommandItem>
                                                                    );
                                                                })}
                                                                <div className="p-1 fixed top-1 right-2">
                                                                    <Button
                                                                        qa={`${qa}-reset`}
                                                                        type="button"
                                                                        onClick={() => resetValues(field)}
                                                                        className="w-fit h-fit text-xs py-[7px] px-3 rounded-sm flex gap-1 bg-rose-100 border-px border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white"
                                                                    >
                                                                        <Trash2 className='h-4 w-4' />
                                                                    </Button>
                                                                </div>
                                                            </CommandGroup>
                                                        </>
                                                }
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {
                                    (selectedValues.length > 0 && showBadges) && (
                                        <div className="mt-3 max-h-24 overflow-y-auto flex flex-wrap w-full items-center">
                                            {(showAll ? selectedValues : selectedValues?.slice(0, maxVisibleBadges))?.map((item: any, index: number) => (
                                                <Badge
                                                    key={`index-${index + 1}`}
                                                    variant="outline"
                                                    className="transition-all duration-300 mr-2 mb-3 bg-blue-100 text-blue-500 hover:bg-orange-100 hover:text-orange-500 px-4 py-[5px] text-[13px] group flex-shrink-0"
                                                >
                                                    <span>{renderLabel(item)}</span>
                                                    {
                                                        (!disabled && !readOnly) && (
                                                            <button
                                                                disabled={disabled}
                                                                type="button"
                                                                onClick={() => {
                                                                    // Remove the item from selectedValues
                                                                    const updatedSelectedValues = selectedValues.filter((selected) => !compareFn?.(selected, item));

                                                                    // Update local state
                                                                    setSelectedValues(updatedSelectedValues);

                                                                    // Update form state
                                                                    field.onChange(updatedSelectedValues);
                                                                }}
                                                                className="ml-2 text-orange-500 hover:text-rose-500 hidden group-hover:block"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        )
                                                    }
                                                </Badge>
                                            ))}
                                            {selectedValues.length > maxVisibleBadges && !showAll && (
                                                <button
                                                    type="button"
                                                    onClick={() => setModalViewAllOpen(true)}
                                                >
                                                    <Badge
                                                        className="cursor-pointer w-fit flex items-center gap-2 transition-all duration-300 mr-2 mb-3 bg-white border-blue-500 text-blue-500 hover:bg-blue-100 px-4 py-[5px] text-[13px] group"
                                                    >
                                                        Lihat Semua
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </Badge>
                                                </button>
                                            )}
                                        </div>
                                    )
                                }


                                {/* Detail Modal */}
                                <ModalChildren
                                    isOpen={modalViewAllOpen}
                                    onClose={() => setModalViewAllOpen(false)}
                                    title={titleModal}
                                >
                                    <div className="my-4 flex flex-wrap items-center gap-4">
                                        {selectedValues.map((item: any, index: number) => (
                                            <Badge
                                                key={index + 1}
                                                variant="outline"
                                                className="transition-all duration-300 bg-blue-100 text-blue-500 hover:bg-orange-100 hover:text-orange-500 px-4 py-[5px] text-[13px] group flex-shrink-0"
                                            >
                                                <span>{renderLabel(item)}</span>
                                                {
                                                    !disabled && (
                                                        <button
                                                            disabled={disabled}
                                                            type="button"
                                                            onClick={() => {
                                                                const updatedSelectedValues = selectedValues.filter((selected) => !compareFn?.(selected, item));
                                                                setSelectedValues(updatedSelectedValues);

                                                                // Update form state
                                                                field.onChange(updatedSelectedValues);
                                                            }}
                                                            className="ml-2 text-orange-500 hover:text-rose-500 hidden group-hover:block"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    )
                                                }
                                            </Badge>
                                        ))}
                                    </div>
                                </ModalChildren>

                            </div>
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
                        <div className={cn(
                            (fieldState.error) && 'mt-1'
                        )}>
                            <FormMessage />
                        </div>
                    </FormItem>
                )
            }}
        />
    );
}
