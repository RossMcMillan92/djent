import React from 'react';

const ShareBox = (props) => (
    <div>
        <input className="input-base input-base--large input-base--long" type="text" value={props.url} onClick={e => e.target.select()} readOnly />
    </div>
);

export default ShareBox;
