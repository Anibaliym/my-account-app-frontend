import { useState } from 'react';

export const CustomButtom = ({ event }) => {

    const [ hover, setHover ] = useState( false );
  
    return (
        <div
            style={{
                // margin: '0px auto',
                width: '30px',
                height:'40px', 
                padding: '5px',
                textAlign: 'left',
                cursor: 'pointer',
                // borderRadius: '4px',
                transition: 'background-color 0.3s ease-in-out',
                lineHeight: '30px', 
                // backgroundColor: 'blue'
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
