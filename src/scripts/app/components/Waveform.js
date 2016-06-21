import React, { Component } from 'react';

import { repeat } from '../utils/tools'

const resolution = 1;

const level = (x, y, w, h) => {
    let state = {
        x,
        y,
        w,
        h,
    }

    const update = (args) => {
        state = Object.assign({}, state, args);
    }

    const draw = ctx => {
        // console.log('STATE.X, STATE.Y, STATE.W, STATE.H', state.x, state.y, state.w, state.h)
        ctx.fillRect(state.x, state.y, state.w, state.h)
    }

    return {
        x: state.x,
        y: state.y,
        w: state.w,
        h: state.h,
        update,
        draw,
    }
}

export default class Waveform extends Component {
    levels = [];

    componentWillUpdate = () => {
        const width = this.props.width;
        const height = this.props.height;
        const levelAmount = Math.floor(width / resolution);

        if (this.levels.length === levelAmount) return;

        this.levels = Array(levelAmount)
            .fill()
            .map((xxx, i) => {
                const x  = i * resolution;
                const y  = 0;
                const w  = resolution === 1 ? 1 : resolution - 1;
                const h  = height - y;
                return level(x, y, w, h)
            })
    }

    componentDidUpdate = () => {
        if (!this.props.buffer) return null;

        const width = this.props.width;
        const height = this.props.height;
        const data = this.props.buffer.getChannelData(0);
        const step = Math.ceil(data.length / width);
        const ctx = this.refs.canvas.getContext('2d');

        ctx.fillStyle = this.props.color;
        this.draw(data, ctx);
    }

    draw = (data, ctx) => {
        let highestAverage = 0;
        const { width, height } = this.props;
        const levelAmount = this.levels.length;
        const newData = this.levels
            .map((item, i) => {
                const dataIndex = i * levelAmount;
                const average = data.slice(dataIndex, dataIndex + levelAmount).reduce((a, b) => a + Math.abs(b), 0) / levelAmount;
                if (average > highestAverage) highestAverage = average;
                return average;
            }, []);
        const scale = height / highestAverage;

        console.log('NEWDATA', newData.length, newData)
        console.log('THIS.LEVELS', this.levels.length, this.levels)

        ctx.clearRect(0, 0, width, height);

        newData
            .forEach((item, i) => {
                const value = item * (this.props.amplified ? scale : 1);
                const level = this.levels[i];
                const y  = height - value;
                const h  = height - y;

                level.update({ y, h });
                level.draw(ctx)
            });
    }

    drawx = (width, step, height, data, ctx) => {

        const levels = Array(Math.floor(newData.length / resolution))
            .fill()
            .map((xxx, i) => {
                const item = (newData.slice(i, i+resolution).reduce((a, b) => a + b, 0)) / resolution;
                const value = item * (this.props.amplified ? scale : 1);
                const x  = i * resolution;
                const y  = height - value;
                const w  = resolution === 1 ? 1 : resolution - 1;
                const h  = height - y;

                return level(x, y, w, h)
            })
            .forEach(level => level.draw(ctx));
    }

    render = () => (
        <canvas
            ref="canvas"
            className={`${this.props.className}`}
            width={this.props.width}
            height={this.props.height}
        ></canvas>
    )
}
