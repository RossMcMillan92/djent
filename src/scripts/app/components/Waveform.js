import React, { Component } from 'react';

import { repeat } from '../utils/tools'

export default class Waveform extends Component {

    componentDidUpdate = () => {
        if (!this.props.buffer) return null;

        const width = this.props.width;
        const height = this.props.height;
        const data = this.props.buffer.getChannelData(0);
        const step = Math.ceil(data.length / width);
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillStyle = this.props.color;
        this.draw(width, step, height, data, ctx);
    }

    draw = (width, step, height, data, ctx) => {
        ctx.clearRect(0, 0, this.props.width, this.props.height);
        let highestAverage = 0;
        const newData = data
            // get average of data in step
            .reduce((newArr, item, i, origArr) => {
                if (i % step === 0) {
                    const average = origArr.slice(i - step, i).reduce((a, b) => a + Math.abs(b), 0) / step;
                    if (average > highestAverage) highestAverage = average;
                    newArr.push(average);
                };
                return newArr
            }, [])

        const zoom = height / highestAverage;
        console.log('HIGHESTAVERAGE', highestAverage)
        const drawnLines = newData
            .forEach((item, i) => {
                const value = item * (this.props.amplified ? zoom : 1);
                const x  = i;
                const y  = height - value;
                const w  = 1;
                const h  = height - y;

                ctx.fillRect(x, y, w, h)
            });
    }

    render = () => {
        if (!this.props.buffer) return null;

        return (
            <canvas
                ref="canvas"
                className={`${this.props.className}`}
                width={this.props.width}
                height={this.props.height}
            ></canvas>
        )
    }
}
