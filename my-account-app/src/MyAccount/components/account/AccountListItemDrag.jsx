import { useSortable } from '@dnd-kit/sortable'; 
import { CSS } from '@dnd-kit/utilities'; 
import { useState } from 'react';
import { useEffect } from 'react';

export const AccountListItemDrag = ({ accountId, accountDescription, setAccountIdOnView, sheetsCount, accountIdOnView }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: accountId });

    return (
        <div 
            ref={ setNodeRef }
            style={ { transform: CSS.Transform.toString(transform), transition }} 
            className={`accounts-account-list-item animate__animated animate__fadeIn animate__faster justify-content-between`}
            onClick={ ()=>{ setAccountIdOnView(accountId) } }
        >
            <div className="account-item-account-box" style={{ fontSize:'14px' }}>

                <span className="text-color-default" style={{ fontSize:'14px', width:'100%' }}>
                    {accountDescription}
                </span>

                {
                    (sheetsCount > 0) 
                        && (<div className="badge animate__animated animate__fadeInUp animate__faster">{ sheetsCount }</div>)
                }

                <i
                    className="bx bx-sort-alt-2 text-color-default card-icon ml-1"
                    style={{ cursor: 'move' }}
                    tabIndex="-1"
                    {...listeners}
                    {...attributes}
                ></i>
            </div>
        </div>
    )
}
