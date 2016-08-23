import React from 'react';

const ShareBox = (props) => (
    <div>
        <h2 className="title-primary">Share this URL:</h2>
        <input className="input-base input-base--large input-base--long" type="text" value={props.url} onClick={e => e.target.select()} readOnly />
    </div>
);

export default ShareBox;
