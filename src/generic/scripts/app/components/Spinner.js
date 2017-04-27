import React from 'react'

const Spinner = ({ subtext }) => (
    <div className="spinner-container u-flex-column u-flex-center">
        <div className="spinner spinner--dark spinner--large"></div>
        { subtext && <div className="spinner-container__subtext">{ subtext }</div> }
    </div>
)

export default Spinner
