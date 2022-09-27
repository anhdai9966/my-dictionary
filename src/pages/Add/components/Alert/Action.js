function Action({ items }) {

    return (
        <>
            {items.map((item, index) => (
                <div key={index} className='alert__wrap-column'>
                    <button 
                        className="alert__btn"
                        onClick={item.action}
                        style={item.color && {color: item.color}}
                    >{item.title}</button>

                    <div className='alert__x-separator'></div>
                </div>
            ))}
        </>
    )
}

export default Action