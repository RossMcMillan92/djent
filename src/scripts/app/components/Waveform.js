import React, { Component } from 'react';

import { repeat } from '../utils/tools'

export default class Waveform extends Component {
    zoom = 7;

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
        const newData = data
            .reduce((newArr, item, i, origArr) => {
                if (i % step === 0) {
                    newArr.push(origArr.slice(i - step, i).reduce((a, b) => a + b, 0) / step);
                }

                return newArr
            }, [])
            .forEach((item, i) => {
                ctx.fillRect(i, (height - (Math.abs(item * this.zoom) * height)), 1, height)
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
