import React from 'react';

const ShareBox = (props) => {
    return (
        <div>
            <p className="title-primary u-mb05">Share this URL:</p>
            <input className="input-fancy" type="text" value={props.url} readOnly />
        </div>
    );
}

export default ShareBox;
