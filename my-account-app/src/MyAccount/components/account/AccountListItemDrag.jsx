import { useState, useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const AccountListItemDrag = ({ accountId, accountDescription, setAccountIdOnView, sheetsCount }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: accountId });
    const [ isFocused, setIsFocused ] = useState(false);

    const combinedRef = (node) => {
        setNodeRef(node);
        itemRef.current = node;
    };

    const itemRef = useRef();

    const handleClick = () => {
        setAccountIdOnView(accountId);
        itemRef.current?.focus();
    };

    return (
        <div
            ref={combinedRef}
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={handleClick}
            style={{
                transform: CSS.Transform.toString(transform),
                transition
            }}
            className={`accounts-account-list-item animate__animated animate__fadeIn animate__faster justify-content-between ${
                isFocused ? 'accounts-account-list-item-focus' : ''
            }`}
        >
            <div className="account-item-account-box" style={{ fontSize: '14px' }}>
                <span className="text-color-default" style={{ fontSize: '14px', width: '100%' }}>{accountDescription}</span>

                {
                    (sheetsCount > 0) 
                        && (<div className="badge animate__animated animate__fadeInUp animate__faster">{sheetsCount}</div>)
                }

                <div className="account-gragable-item">
                    <i
                        className="bx bx-sort-alt-2 text-color-default card-icon ml-1"
                        style={{ cursor: 'move' }}
                        tabIndex="-1"
                        {...listeners}
                        {...attributes}
                    ></i>

                </div>
            </div>
        </div>
    );
};