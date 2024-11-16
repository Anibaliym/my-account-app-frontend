export const CardTest = () => {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    header
                </div>
                <div className="card-body">
                    <h5 className="card-title">Success card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <br />
                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
                <div className="card-footer">
                    <i className='bx bx-save icon' onClick={ ()=>{ console.log('click') } } ></i>
                    <i className='bx bx-trash icon' onClick={ ()=>{ console.log('click') } } ></i>
                </div>
            </div>
        </>
    )
}
