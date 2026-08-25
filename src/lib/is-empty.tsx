export const isEmpty = (v: unknown): boolean => {
    if (v == null || v === '') return true;
    if (v === undefined || v === 'undefined') return true;
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === 'object') return Object.keys(v).length === 0;
    return false;
};
