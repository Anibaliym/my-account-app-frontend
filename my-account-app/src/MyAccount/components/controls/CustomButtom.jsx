import { useState } from 'react';

export const CustomButtom = ({ event }) => {

    const [ hover, setHover ] = useState( false );
  
    return (
        <div
            style={{
                margin: '10px auto',
                width: '50px',
                height:'36px', 
                padding: '5px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '4px',
                transition: 'background-color 0.3s ease-in-out',
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={ event }
        >
            {
                (hover) ? 
                    (<i className={`bx bx-plus animate__animated text-color-primary animate__faster ${ hover ? "animate__fadeInDown" : "animate__fadeInUp"}`} style={{ fontSize: '23px' }}></i>)
                    :
                    (<i className={`bx bx-plus animate__animated text-color-primary animate__faster ${ hover ? "animate__fadeInDown" : "animate__fadeInUp"}`}></i>)
            }
        </div>
    );
};
