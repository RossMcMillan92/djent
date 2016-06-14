import React, { Component } from 'react';

const SVG = (props) => {
    const icon = icons[props.icon];
    if(!icon) return null;

    const pathProps = icon.pathProps || {};

    return (
        <svg className={`${props.className ? props.className : ''} svg-icon-${props.icon}`} viewBox={icon.viewBox}>
            <path { ...pathProps } fill="currentColor" d={icon.pathCoordinates} />
        </svg>
    );
};

export default SVG;

const icons = {
    stop: {
        viewBox: '0 0 864 864',
        pathCoordinates: `M864 18q0 -8 -5 -13t-13 -5h-828q-8 0 -13 5t-5 13v828q0 8 5 13t13 5h828q8 0 13 -5t5 -13v-828z`
    },

    play: {
        viewBox: '0 0 864 864',
        pathCoordinates: 'M18 0q-5 0 -10 3q-8 5 -8 15v828q0 10 8 15q9 6 18 1l828 -414q10 -5 10 -16t-10 -16l-828 -414q-6 -2 -8 -2z'
    },
}
