export const generateYears = (
    startYear: number,
    toYear: number,
    fromCurrent: boolean = false,
    ascending: boolean = false
) => {
    const currentYear = new Date().getFullYear();
    const years: string[] = [];

    if (fromCurrent) {
        for (let year = currentYear; year >= startYear; year--) {
            years.push(String(year));
        }
    } else {
        if (ascending) {
            for (let year = startYear; year <= toYear; year++) {
                years.push(String(year));
            }
        } else {
            for (let year = toYear; year >= startYear; year--) {
                years.push(String(year));
            }
        }
    }

    return years;
};
