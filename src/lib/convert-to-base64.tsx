export default function ConvertToBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error: any) => {
            reject(new Error(String(error)));
        };
    });
};
