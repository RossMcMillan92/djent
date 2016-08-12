import React, { Component } from 'react';

import { compose } from '../utils/tools';

const colorScheme = [
    [146, 198, 211],
    [255, 255, 255],
];

const incrementBySpeed = (val, targetVal, dist) => val + (dist * (targetVal - val));
const calculateColorValue = compose(
    (a) => Math.min(255, a),
    (a) => Math.max(0, a),
    Math.abs,
    Math.round,
    incrementBySpeed,
);

const Level = (x, y, w, h, targetColor) => {
    let lastUpdateTime = 0;
    const vy = 1.5; // px/s
    const vc = 10; // px/s
    const oldState = {};
    let state = {
        x,
        y,
        w,
        h,
        color: [255, 255, 255],
        targetColor,
        targety: 0,
    };

    const updateState = (args) => {
        state = Object.assign({}, state, args);
    };

    const draw = ctx => {
        if (oldState.y === state.y && oldState.color.filter((val, i) => val === state.color[i]).length === 3) return;
        // ctx.fillStyle = 'transparent';
        ctx.clearRect(state.x, 0, w + 1, h);
        ctx.fillStyle = `rgb(${state.color[0]}, ${state.color[1]}, ${state.color[2]})`;
        ctx.fillRect(state.x, state.y, state.w, state.h);

        oldState.y = state.y;
        oldState.color = [state.color[0], state.color[1], state.color[2]];
    };

    const update = (t) => {
        if (!t) return;

        const time = (t - lastUpdateTime) / 1000;

        const disty = time * vy;
        state.y = Math.min(state.h, Math.round(incrementBySpeed(state.y, state.targety, disty) * 100) / 100);

        const distc = time * vc;
        const r = calculateColorValue(state.color[0], state.targetColor[0], distc);
        const g = calculateColorValue(state.color[1], state.targetColor[1], distc);
        const b = calculateColorValue(state.color[2], state.targetColor[2], distc);
        state.color = [r, g, b];

        lastUpdateTime = t;
    };

    return {
        x: state.x,
        y: state.y,
        w: state.w,
        h: state.h,
        update,
        updateState,
        draw,
    };
};

const createInitialLevels = (levelAmount, height, resolution) => Array(levelAmount).fill()
    .map((xxx, i) => {
        const x  = i * resolution;
        const y  = 0;
        const w  = resolution === 1 ? 1 : resolution - 1;
        const h  = height;
        const targetColor = [255, 255, 255];
        return Level(x, y, w, h, targetColor);
    });

const RESOLUTION = 3;
export default class Waveform extends Component {
    iteration = 0;
    loopIsEnabled = false;
    ctx;
    levels = [];
    backgroundColor = colorScheme[0];
    activeColor = colorScheme[1];

    componentDidMount = () => {
        this.fixCanvasScale();
        this.createInitialLevelsFromWidth(this.props);
    }

    componentWillUpdate = (nextProps) => {
        this.createInitialLevelsFromWidth(nextProps);
        if (this.props.isPlaying && !nextProps.isPlaying) {
            this.iteration = 0;
        }
    }

    createInitialLevelsFromWidth = ({ width, height }) => {
        const levelAmount = Math.floor(width / RESOLUTION);

        if (this.levels.length !== levelAmount) {
            this.levels = createInitialLevels(levelAmount, height, RESOLUTION);
        }
    }

    componentDidUpdate = (prevProps) => {
        if (!this.props.buffer) return;

        if (prevProps.width !== this.props.width) this.fixCanvasScale();
        const data = this.props.buffer.getChannelData(0);

        this.updateLevels(data);

        if (!this.loopIsEnabled) {
            this.loop();
            this.loopIsEnabled = true;
        }
    }

    fixCanvasScale = () => {
        const canvas = this.refs.canvas;
        if (!this.ctx) this.ctx = canvas.getContext('2d');

        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                                  this.ctx.backingStorePixelRatio || 1;
        const canvasRatio = devicePixelRatio / backingStoreRatio;
        const width = this.props.width * canvasRatio;
        const height = this.props.height * canvasRatio;

        canvas.width = width;
        canvas.height = height;
        this.ctx.scale(canvasRatio, canvasRatio);
    }

    loop = (t) => {
        const ctx = this.ctx;
        const { isPlaying, audioContext, audioStartTime } = this.props;
        const currentTime = !isPlaying ? 0 : audioContext ? audioContext.currentTime - audioStartTime : false;
        const duration = this.props.timeLength;
        const iteration = duration === 0 || currentTime <= 0 ? 0 : Math.floor(currentTime / duration);
        const percentPassed = (currentTime - (duration * iteration)) / duration;
        const indexThreshold = Math.ceil(this.levels.length * percentPassed);

        if (iteration !== this.iteration && isPlaying) {
            this.iteration = iteration;
        }

        this.levels.forEach((level, i) => {
            level.draw(ctx);

            const levelColor = currentTime && i <= indexThreshold ? this.activeColor : this.backgroundColor;
            level.updateState({ targetColor: levelColor });
            level.update(t);
        });

        if (isPlaying) requestAnimationFrame(this.loop);
        else this.loopIsEnabled = false;
    }

    updateLevels = (data) => {
        const { width, height } = this.props;
        const step = Math.ceil(data.length / width) * RESOLUTION;

        let highestAverage = 0;
        const newData = this.levels
            .map((item, i) => {
                const dataIndex = i * step;
                const average = data.subarray(dataIndex, dataIndex + step).reduce((a, b) => a + Math.abs(b), 0) / step;
                if (average > highestAverage) highestAverage = average;
                return average;
            }, []);
        const scale = height / highestAverage;
        const targetColor = this.backgroundColor;

        newData
            .forEach((item, i) => {
                const value = item * (this.props.amplified ? scale : 1);
                const level = this.levels[i];
                const y  = (height - value);

                level.updateState({ targety: y, targetColor });
            });
    }

    render = () => (
        <canvas
            ref="canvas"
            className={`${this.props.className}`}
            style={{
                width: this.props.width,
                height: this.props.height,
            }}
        ></canvas>
    );
}
