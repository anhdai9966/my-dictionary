import './Alert.scss'
import ActionHorizontal from './ActionHorizontal'
import Action from './Action'

/**
 * 
 * @param {arr} items là một mảng các title item 
 * @param {string} type là chiều ngang dọc của items horizontal | vertical
 * @returns 
 */
function Alert({ title, subtitle = '', items = [], type = 'vertical' }) {

    return (
        <div className='alert'>
            <div className="alert__container alert__wrap-column">
                <div className="alert__contain alert__wrap-center-column gap-12">
                    <p className="alert__title">{title}</p>
                    {subtitle && <p className="alert__subtitle">{subtitle}</p>}
                </div>

                <div className='alert__x-separator'></div>

                {items.length !== 0 && type === 'vertical' && <Action items={items} />}
                
                {items.length === 2 && type === 'horizontal' && <ActionHorizontal items={items} />}
            </div>
        </div>
    )
}

export default Alert