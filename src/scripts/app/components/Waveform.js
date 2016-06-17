import React, { Component } from 'react';

import { repeat } from '../utils/tools'

export default class Waveform extends Component {
    static defaultProps = {
        buffer: null,
        width: 500,
        height: 100,
        zoom: 1,
        color: 'black'
    };

    componentDidUpdate = () => {
        if (!this.props.buffer) return null;

        var width = this.props.width * this.props.zoom;
        var middle = this.props.height / 2;

        var channelData = this.props.buffer.getChannelData(0);
        var step = Math.ceil(channelData.length / width);

        var ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = this.props.color;
        this.draw(width, step, middle, channelData, ctx);
    }

    draw = (width, step, middle, data, ctx) => {
        function loop(i) {
            repeat(4, () => {
                let min = 1.0;
                let max = -1.0;
                const steps = Array(step).fill()
                    .forEach((x, j) => {
                        const datum = data[(i * step) + j];

                        if (datum < min)      min = datum;
                        else if (datum > max) max = datum;

                        ctx.fillRect(i + .5, ((1 + min) * middle) + .5, 1 + .5, Math.max(1, (max - min) * middle) + .5);
                    })
                i++
            })

            if (i < width) requestAnimationFrame(() => loop(i));
        }

        loop(0);
    }

    render = () => {
        if (!this.props.buffer) return null;

        return (
            <canvas
                ref="canvas"
                className="waveform"
                width={this.props.width * this.props.zoom}
                height={this.props.height}
            ></canvas>
        )
    }
}
