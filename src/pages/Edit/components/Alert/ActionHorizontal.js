function Action2Horizontal({ items }) {

    return (
        <div className='alert__wrap-x-center'>
            <button 
                className="alert__btn"
                onClick={items[0].action}
                style={items[0].color && {color: items[0].color}}
            >{items[0].title}</button>

            <div className='alert__y-separator'></div>

            <button 
                className="alert__btn"
                onClick={items[1].action}
                style={items[1].color && {color: items[1].color}}
            >{items[1].title}</button>
        </div>
    )
}

export default Action2Horizontal