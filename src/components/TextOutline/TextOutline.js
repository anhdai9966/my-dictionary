import { memo } from 'react';

import './TextOutline.scss';

function TextBorder({ text }) {
    return (
        <div className="text-border">
            <p className="text-outline">{text}</p>
            <p className="text-front">{text}</p>
        </div>
    );
}

export default memo(TextBorder);
