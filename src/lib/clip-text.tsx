export function clipText(text: string, maxLength = 30, mode: 'middle' | 'end' = 'middle') {
    if (text?.length <= maxLength) {
        return text;
    }

    if (mode === 'middle') {
        const half = Math.floor(maxLength / 2);
        const beginning = text?.slice(0, half);
        const end = text?.slice(text?.length - half);
        return beginning + '...' + end;
    }

    // mode === 'end'
    return text?.slice(0, maxLength) + '...';
}
