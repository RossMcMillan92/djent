import React from 'react';

const Panel = (props) => {
    return (
        <div className={`panel panel--${props.theme}`}>
            <div className={`group-padding-x group-padding-y${ props.sizeY ? `-${props.sizeY}` : '' }`}>
                { props.children }
            </div>
        </div>
    );
}

export default Panel;
