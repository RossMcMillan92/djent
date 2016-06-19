import React from 'react';

const ShareBox = (props) => (
    <div>
        <p className="title-primary u-mb05">Share this URL:</p>
        <input className="input-base input-base--large" type="text" value={props.url} onClick={e => e.target.select()} readOnly />
    </div>
);

export default ShareBox;
