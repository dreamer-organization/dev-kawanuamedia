import { useEffect, useMemo, useRef } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { cn } from "@/lib/utils";

export default function JoditEditorComponent({
    value,
    onChange,
    fieldState,
    onBlur,
    readOnly,
}: Readonly<{
    value?: any;
    onChange: (value: string) => void;
    fieldState?: any;
    onBlur?: (e: any) => void;
    readOnly?: boolean;
}>) {
    const editorRef = useRef<any>(null);

    const buttons = [
        "undo",
        "redo",
        "|",
        "bold",
        "strikethrough",
        "underline",
        "italic",
        "|",
        "superscript",
        "subscript",
        "|",
        "align",
        "|",
        "ul",
        "ol",
        "outdent",
        "indent",
        "|",
        "brush",
        "|",
        "link",
        "table",
        "|",
        "hr",
        "eraser",
        "|",
        "fullsize",
    ];

    // Set custom icons
    Jodit.modules.Icon.set("undo", '<i class="ph-bold ph-arrow-u-up-left"></i>');
    Jodit.modules.Icon.set("redo", '<i class="ph-bold ph-arrow-u-up-right"></i>');
    Jodit.modules.Icon.set("bold", '<i class="ph-bold ph-text-b"></i>');
    Jodit.modules.Icon.set("strikethrough", '<i class="ph-bold ph-text-strikethrough"></i>');
    Jodit.modules.Icon.set("underline", '<i class="ph-bold ph-text-underline"></i>');
    Jodit.modules.Icon.set("italic", '<i class="ph-bold ph-text-italic"></i>');
    Jodit.modules.Icon.set("superscript", '<i class="ph-bold ph-text-superscript"></i>');
    Jodit.modules.Icon.set("subscript", '<i class="ph-bold ph-text-subscript"></i>');
    Jodit.modules.Icon.set("center", '<i class="ph-bold ph-text-align-center"></i>');
    Jodit.modules.Icon.set("left", '<i class="ph-bold ph-text-align-left"></i>');
    Jodit.modules.Icon.set("right", '<i class="ph-bold ph-text-align-right"></i>');
    Jodit.modules.Icon.set("justify", '<i class="ph-bold ph-text-align-justify"></i>');
    Jodit.modules.Icon.set("ul", '<i class="ph-bold ph-list-bullets"></i>');
    Jodit.modules.Icon.set("ol", '<i class="ph-bold ph-list-numbers"></i>');
    Jodit.modules.Icon.set("outdent", '<i class="ph-bold ph-text-outdent"></i>');
    Jodit.modules.Icon.set("indent", '<i class="ph-bold ph-text-indent"></i>');
    Jodit.modules.Icon.set("fontsize", '<i class="ph-bold ph-text-aa"></i>');
    Jodit.modules.Icon.set("brush", '<i class="ph-bold ph-paint-brush-broad"></i>');
    Jodit.modules.Icon.set("link", '<i class="ph-bold ph-link-simple"></i>');
    Jodit.modules.Icon.set("table", '<i class="ph-bold ph-grid-nine"></i>');
    Jodit.modules.Icon.set("hr", '<i class="ph-bold ph-minus"></i>');
    Jodit.modules.Icon.set("eraser", '<i class="ph-bold ph-eraser"></i>');
    Jodit.modules.Icon.set("fullsize", '<i class="ph-bold ph-arrows-out"></i>');


    const isInvalid = !!fieldState?.invalid;

    const editorConfig: any = useMemo(() => ({
        readonly: !!readOnly,
        toolbar: true,
        spellcheck: false,
        language: "en",
        toolbarButtonSize: "middle",
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        askBeforePasteHTML: true,
        askBeforePasteFromWord: true,
        buttons: buttons,
        uploader: {
            insertImageAsBase64URI: true,
        },
        width: "100%",
        height: "400px",
        style: {
            padding: '30px',
            textAlign: 'left',
            background: fieldState?.invalid ? 'oklch(94.1% 0.03 12.58)' : 'white',
        }
    }), [readOnly, isInvalid]);

    const hasSetInitialValue = useRef(false);

    useEffect(() => {
        if (
            editorRef.current &&
            !hasSetInitialValue.current &&
            editorRef.current?.editor
        ) {
            editorRef.current.editor.value = value; // set initial content
            hasSetInitialValue.current = true;
            onChange(value); // update form state
        }
    }, []);



    return (
        <div className={cn(
            'border rounded-md overflow-clip w-full [&_ol]:list-decimal [&_ul]:list-disc',
            fieldState?.invalid && 'border-rose-500',
        )}>
            <JoditEditor
                ref={editorRef}
                config={editorConfig}
                value={value}
                onBlur={onBlur}
                onChange={(newContent: string) => {
                    // Use stable comparison based on previous value passed by props
                    if (newContent !== value) {
                        // Only update external form state
                        onChange(newContent);
                    }
                }}

            />
        </div>
    );
}
