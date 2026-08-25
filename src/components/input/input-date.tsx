import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, ChevronDown } from "lucide-react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { generateYears } from "@/lib/generate-years";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface InputDateProps {
    control: Control<any>;
    name: string;
    qa: string;
    error?: string | boolean;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    disabledFuture?: boolean;
    fromYear?: number;
    toYear?: number;
    required?: boolean;
    disabledDate?: any;
    readOnly?: boolean;
    showIcon?: boolean;
    formatDatePlaceholder?: string;
    description?: string;
}

const currentYear = new Date().getFullYear();

export default function InputDate({
    control,
    name,
    qa,
    disabled,
    label,
    placeholder = "Pilih Tanggal",
    fromYear = 1900,
    toYear = currentYear,
    error,
    required,
    disabledDate,
    readOnly,
    showIcon = true,
    formatDatePlaceholder = 'd MMM yyyy',
    description
}: Readonly<InputDateProps>) {


    const years = generateYears(fromYear || 1900, toYear);
    // const months = Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString("default", { month: "long" }));
    const months = Array.from({ length: 12 }, (_, i) =>
        format(new Date(2000, i, 1), "LLLL", { locale: id })
    );

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [displayedMonth, setDisplayedMonth] = useState(new Date(selectedYear, selectedMonth));
    const [isOpen, setIsOpen] = useState(false);

    const handleYearChange = (year: any) => {
        setSelectedYear(Number(year));
        setDisplayedMonth(new Date(Number(year), selectedMonth));
        setOpen(false);
    };

    const handleMonthChange = (month: string) => {
        setSelectedMonth(Number(month));
        setDisplayedMonth(new Date(selectedYear, Number(month)));
    };

    const handleCalendarMonthChange = (newMonth: Date) => {
        setSelectedYear(newMonth.getFullYear());
        setSelectedMonth(newMonth.getMonth());
        setDisplayedMonth(newMonth);
    };
    const [open, setOpen] = useState(false);

    // const formatDate = (date: Date, locale: string = 'en-GB'): string => {
    //     return date.toLocaleDateString(locale, {
    //         month: 'long',
    //         day: 'numeric',
    //         year: 'numeric'
    //     });
    // };

    const formatDate = (date: Date, locale = id): string => {
        return format(date, formatDatePlaceholder, { locale });
    };


    const yearListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (yearListRef.current) {
                    const selectedButton = yearListRef.current.querySelector(`[data-year="${selectedYear}"]`);
                    selectedButton?.scrollIntoView({ block: "center" });
                }
            }, 50); // Slight delay ensures rendering
        }
    }, [open, selectedYear]);

    return (
        <FormField
            control={control}
            name={name}
            defaultValue=""
            render={({ field, fieldState }: any) => {

                useEffect(() => {
                    const isDisabled = disabledDate?.(field.value);
                    if (field.value && isDisabled) {
                        field.onChange(null); // Clear the date
                    }
                }, [field.value, disabledDate]);

                return (
                    <FormItem className={cn('w-full', label ? "space-y-1" : "space-y-0")}>
                        <FormLabel className={cn(fieldState.error && "text-destructive", 'w-full flex items-center justify-start text-start')}>
                            {label} {required && <span className='text-rose-500 text-base'>*</span>}
                        </FormLabel>
                        <Popover
                            modal={false}
                            open={isOpen}
                            onOpenChange={(open: boolean) => setIsOpen(open)}
                        >
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        qa="button-date"
                                        disabled={disabled}
                                        qa-date-trigger={qa}
                                        variant="outline"
                                        className={cn(
                                            readOnly && 'pointer-events-none',
                                            (fieldState.error || error) && "bg-rose-100 border-rose-500",
                                            "w-full flex justify-between items-center font-normal gap-3 px-3 disabled:opacity-90 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        )}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <span className='mt-[2px] font-normal'>
                                            {
                                                field.value
                                                    ? <span className="text-black">{formatDate(field.value)}</span>
                                                    : <span className="text-gray-400">{placeholder}</span>

                                            }
                                        </span>
                                        {
                                            showIcon && (
                                                <CalendarDays className="h-4 w-4" />
                                            )
                                        }
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>

                            <PopoverContent
                                align="start"
                                className="flex w-auto flex-col space-y-2 p-2"
                            >
                                <div className="scale-[0.85] m-[-20px] flex flex-col space-y-2">
                                    <div className="flex items-center space-x-2">
                                        {/* Popover year */}
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    qa="button-trigger-year"
                                                    variant="outline"
                                                    className="w-full flex justify-between items-center disabled:opacity-90"
                                                >
                                                    {selectedYear.toString()}
                                                    <ChevronDown className="!h-4 !w-4 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                side="bottom"
                                                align="end"
                                                sideOffset={6}
                                                className="w-[270px] h-[300px] overflow-auto p-4 z-[999] animate-none"
                                                style={{
                                                    position: "absolute",
                                                    top: "100%",
                                                    transform: "translateX(-53%)",
                                                }}
                                            >
                                                <div
                                                    ref={yearListRef}
                                                    className="grid grid-cols-4 gap-2"
                                                >
                                                    {years.map((year) => (
                                                        <Button
                                                            data-year={year}
                                                            qa={`button-select-year-${year}`}
                                                            variant='ghost'
                                                            type="button"
                                                            key={year}
                                                            onClick={() => handleYearChange(year)}
                                                            className={cn(
                                                                "w-full py-2 rounded-lg text-sm text-center",
                                                                selectedYear === Number(year) ? "bg-premium-gold-sgs text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                                                            )}
                                                        >
                                                            {year}
                                                        </Button>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>

                                        {/* Month Select with qa_date */}
                                        <Select onValueChange={handleMonthChange}>
                                            <SelectTrigger qa-date-select-trigger-month={qa}>
                                                <SelectValue placeholder={months[selectedMonth]} />
                                            </SelectTrigger>
                                            <SelectContent qa-date-select-list-month={qa} className="h-[300px]">
                                                {months.map((month, index) => (
                                                    <SelectItem key={month + '-' + index} value={index.toString()} qa-date-select-option-month={qa + '-' + index}>
                                                        {month}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="rounded-md border h-full">
                                        <Calendar
                                            qa_date="date-input"
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                if (date) {
                                                    // Normalize to UTC midnight to avoid timezone offset issues
                                                    const normalizedDate = new Date(Date.UTC(
                                                        date.getFullYear(),
                                                        date.getMonth(),
                                                        date.getDate()
                                                    ));
                                                    field.onChange(normalizedDate);
                                                } else {
                                                    field.onChange(null);
                                                }
                                                setIsOpen(false);
                                            }}

                                            // onSelect={(date) => {
                                            //     field.onChange(date)
                                            //     setIsOpen(false)
                                            // }}
                                            month={displayedMonth}
                                            onMonthChange={handleCalendarMonthChange}
                                            fromYear={fromYear}
                                            toYear={toYear}
                                            disabled={(date) => disabledDate ? disabledDate(date) : false}
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        {
                            fieldState.error &&
                            <div className="pt-1">
                                <FormMessage className="pt-[1px]">{fieldState.error.message}</FormMessage>
                            </div>
                        }

                        {
                            description && (
                                <div className='mt-1'>
                                    <FormDescription className='text-xs'>
                                        {description}
                                    </FormDescription>
                                </div>
                            )
                        }
                    </FormItem>
                )
            }}
        />
    );
}
