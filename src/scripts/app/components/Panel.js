import React from 'react';

const Panel = (props) => {
    return (
        <div className={`panel ${ props.theme ? 'panel--' + props.theme : '' } ${ props.className ? props.className : '' }`}>
            <div className={`group-padding-x group-capped-x group-centered group-padding-y${ props.sizeY ? `-${props.sizeY}` : '' }`}>
                { props.children }
            </div>
        </div>
    );
}

export default Panel;
