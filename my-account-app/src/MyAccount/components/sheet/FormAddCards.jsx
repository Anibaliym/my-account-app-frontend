import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const FormAddCards = ({ id, title }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = { transform: CSS.Transform.toString(transform), transition };

    return (
        <div
            key={id}
            className=" card-item-dragable"
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <div className="card-item-dragable action">
                <i className='bx bx-sort-alt-2 icon text-color-primary card-icon mr-1' {...listeners}></i>
            </div>
            <div className="excel-card-cell description">
                <span className="text-color-default">{title}</span>
            </div>
        </div>
    )
}; 
