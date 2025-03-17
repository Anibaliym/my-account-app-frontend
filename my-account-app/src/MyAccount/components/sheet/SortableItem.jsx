import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableItem = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div className="excel-card" ref={setNodeRef} style={style} {...attributes}>
            <i className="bx bx-move cursor-pointer" {...listeners}></i>
            <p>{title}</p>
        </div>
    );
};