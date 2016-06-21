import React, { Component } from 'react';

import { repeat, compose } from '../utils/tools'

const incrementBySpeed = (val, targetVal, dist) => val + (dist * (targetVal - val));

const level = (x, y, w, h, targetColor) => {
    let lastUpdateTime = 0;
    let vy = 2; // px/s
    let vc = 5; // px/s
    let state = {
        x,
        y,
        w,
        h,
        color: [255, 255, 255],
        targetColor: targetColor,
        targety: 0,
    }

    const updateState = (args) => {
        state = Object.assign({}, state, args);
    }

    const draw = ctx => {
        ctx.fillStyle = `rgb(${state.color[0]}, ${state.color[1]}, ${state.color[2]})`;
        ctx.fillRect(state.x, state.y, state.w, state.h)
    }

    const update = (t) => {
        if (!t) return;

        const time = (t - lastUpdateTime) / 1000;

        // if (state.x === 0) console.log('DISTY', state.color)
        const disty = time * vy;
        state.y = Math.round((state.y + disty * (state.targety - state.y)) * 100) / 100;

        const distc = time * vc;
        const r = Math.min(255, Math.max(0, Math.abs(Math.round(state.color[0] + (distc * (state.targetColor[0] - state.color[0]))))))
        const g = Math.min(255, Math.max(0, Math.abs(Math.round(state.color[1] + (distc * (state.targetColor[1] - state.color[1]))))))
        const b = Math.min(255, Math.max(0, Math.abs(Math.round(state.color[2] + (distc * (state.targetColor[2] - state.color[2]))))))
        state.color = [r, g, b];


        lastUpdateTime = t;
    }

    return {
        x: state.x,
        y: state.y,
        w: state.w,
        h: state.h,
        update,
        updateState,
        draw,
    }
}

const createInitialLevels = (levelAmount, height, resolution) => {
    return Array(levelAmount)
        .fill()
        .map((xxx, i) => {
            const x  = i * resolution;
            const y  = 0;
            const w  = resolution === 1 ? 1 : resolution - 1;
            const h  = height;
            const targetColor = [255, 0, 0];
            return level(x, y, w, h, targetColor);
        })
}

const resolution = 3;
export default class Waveform extends Component {
    loopIsEnabled = false;
    ctx;
    levels = [];

    componentWillUpdate = () => {
        const width = this.props.width;
        const height = this.props.height;
        const levelAmount = Math.floor(width / resolution);

        if (this.levels.length !== levelAmount) {
            this.levels = createInitialLevels(levelAmount, height, resolution);
        }
    }

    componentDidUpdate = () => {
        if (!this.props.buffer) return;

        if (!this.ctx) this.ctx = this.refs.canvas.getContext('2d');

        const data = this.props.buffer.getChannelData(0);
        this.updateLevels(data, this.ctx);

        if (!this.loopIsEnabled) {
            this.loop();
            this.loopIsEnabled = true;
        }
    }

    loop = (t) => {
        const ctx = this.ctx;
        const currentTime = this.props.currentSrc ? this.props.currentSrc.context.currentTime : false;
        const duration = this.props.currentSrc ? this.props.currentSrc.buffer.duration : false;
        const percentPassed = currentTime / duration;
        const indexThreshold = Math.ceil(this.levels.length * percentPassed);

        ctx.clearRect(0, 0, this.props.width, this.props.height);
        this.levels.forEach((level, i) => {
            if (currentTime && i <= indexThreshold) level.updateState({ targetColor: [0, 0, 0] });
            level.draw(ctx);
            level.update(t);
        })
        requestAnimationFrame(this.loop);
    }

    updateLevels = (data, ctx) => {
        const { width, height } = this.props;
        const levelAmount = this.levels.length;
        const step = Math.ceil(data.length / width) * resolution;

        let highestAverage = 0;
        const newData = this.levels
            .map((item, i) => {
                const dataIndex = i * step;
                const average = data.slice(dataIndex, dataIndex + step).reduce((a, b) => a + Math.abs(b), 0) / step;
                if (average > highestAverage) highestAverage = average;
                return average;
            }, []);
        const scale = height / highestAverage;
        const targetColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];

        newData
            .forEach((item, i) => {
                const value = item * (this.props.amplified ? scale : 1);
                const level = this.levels[i];
                const y  = height - value;

                level.updateState({ targety: y, targetColor });
            });
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
