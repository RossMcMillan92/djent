import React from 'react';

const IOSWarning = (props) => (
    <div>
        <h2 className="title-primary">It looks like you&apos;re using iOS...</h2>
        <p>Due to a bug in safari, iOS is currently unsupported :&nbsp;(</p>
        <p>Sorry about that. Please try visiting this website on a different device.</p>
        <button className="button-primary button-primary--small button-primary--positive" onClick={props.onButtonClick}>
            Continue
        </button>
    </div>
);

export default IOSWarning;
