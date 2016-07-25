import React from 'react';

const Panel = (props) => (
    <div className={`panel ${props.theme ? `panel--${props.theme}` : ''} ${props.className ? props.className : ''}`}>
        <div className={`group-padding-x group-padding-x-small@mobile group-capped-x group-centered group-padding-y${props.sizeY ? `-${props.sizeY}` : ''}`}>
            { props.children }
        </div>
    </div>
);

export default Panel;
