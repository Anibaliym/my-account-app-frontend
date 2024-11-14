import { Tooltip } from '@nextui-org/react';
import { useSortable } from "@dnd-kit/sortable"; 
import { CSS } from '@dnd-kit/utilities'; 

export const SheetDragableListItem = ({ id, description, isDarkMode, onDeleteSheetRefresh }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const onDeleteSheet = () => {
        console.log('Eliminando elemento:', id);
    };

    return (
        <li
            ref={ setNodeRef }
            style={ {transform: CSS.Transform.toString(transform), transition} } // Estilos dinámicos de movimiento
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center p-2 small ${ isDarkMode ? 'bg-dark text-light' : '' }`}
        >
            { description }

            <div className="d-flex gap-2">
                <Tooltip
                    placement="left"
                    content="Eliminar hoja de cálculo"
                    color="secondary"
                    closeDelay={50}
                >
                    <i
                        className="bx bx-trash icon"
                        onClick={onDeleteSheet}
                        style={{ cursor: 'pointer' }}
                    ></i>
                </Tooltip>

                <Tooltip
                    placement="right"
                    content="Ordenar item"
                    color="secondary"
                    closeDelay={50}
                >
                    <i
                        className="bx bx-sort-alt-2 icon"
                        {...listeners}
                        {...attributes}
                        style={{ cursor: 'move' }}
                    ></i>
                </Tooltip>
            </div>
        </li>
    );
};