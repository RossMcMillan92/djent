import React from 'react';

const Panel = (props) => (
    <div className={`panel u-ovh ${props.theme ? `panel--${props.theme}` : ''} ${props.className ? props.className : ''}`}>
        <div className={`group-spacing-y${props.sizeY ? `-${props.sizeY}` : ''}`}>
            <div className={'group-padding-x group-padding-x-small@mobile group-capped-x group-centered'}>
                { props.children }
            </div>
        </div>
    </div>
);

export default Panel;
