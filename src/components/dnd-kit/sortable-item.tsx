import { cn } from "@/lib/utils";
import {
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import React, { ReactElement, isValidElement, cloneElement } from "react";

export default function SortableRow({
    id,
    children,
    disabled = false,
    className,
    hideButton
}: {
    id: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    hideButton?: boolean;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
        setActivatorNodeRef
    } = useSortable({ id, disabled }); // pass disabled to useSortable

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <tr
            ref={setNodeRef}
            style={style}
            {...(!disabled ? attributes : {})}
            className={cn('border-b', className)}
        >
            {React.Children.map(children, (child, index) => {
                if (index === 0 && isValidElement(child)) {
                    const typedChild = child as ReactElement<any>;
                    const originalChildren = typedChild.props.children;

                    return cloneElement(typedChild, {
                        children: (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    ref={!disabled ? setActivatorNodeRef : undefined}
                                    {...(!disabled ? listeners : {})}
                                    className={cn(
                                        disabled
                                            ? "cursor-not-allowed text-gray-300"
                                            : "cursor-grab active:cursor-grabbing text-gray-500",
                                        hideButton && 'hidden'
                                    )}
                                    type="button"
                                    disabled={disabled}
                                >
                                    <GripVertical className="w-4 h-4" />
                                </button>
                                {originalChildren}
                            </div>
                        ),
                    });
                }
                return child;
            })}
        </tr>
    );
}
