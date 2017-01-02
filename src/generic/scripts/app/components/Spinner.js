import React from 'react'

const Spinner = ({ subtext }) => (
    <div>
        <div className="spinner spinner--large"></div>
        { !subtext ? null : (<div className="spinner__subtext">{ subtext }</div>) }
    </div>
)

export default Spinner
