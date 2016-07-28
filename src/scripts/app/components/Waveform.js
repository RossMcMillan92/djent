import React, { Component } from 'react';

import { compose } from '../utils/tools';

let currentColorIndex = 0;
const colorScheme = [
    [0, 136, 170],
    [239, 108, 91],
    [166, 188, 24],
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
        ctx.fillStyle = '#fff';
        ctx.fillRect(state.x, 0, w, h);
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
        const targetColor = [255, 0, 0];
        return Level(x, y, w, h, targetColor);
    });

const resolution = 2;
export default class Waveform extends Component {
    startTime = 0;
    iteration = 0;
    loopIsEnabled = false;
    ctx;
    levels = [];
    backgroundColor = [150, 150, 150];
    activeColor = colorScheme[currentColorIndex];

    componentDidMount = () => {
        this.fixCanvasScale();
    }

    componentWillUpdate = (nextProps) => {
        const width = this.props.width;
        const height = this.props.height;
        const levelAmount = Math.floor(width / resolution);

        if (this.levels.length !== levelAmount) {
            this.levels = createInitialLevels(levelAmount, height, resolution);
        }

        if (this.props.isPlaying && !nextProps.isPlaying) {
            this.iteration = 0;
        }

        if (this.props.audioContext && this.props.buffer !== nextProps.buffer) {
            this.startTime = nextProps.audioContext.currentTime;
            // this.switchColors();
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

    switchColors = () => {
        this.backgroundColor = this.activeColor;
        currentColorIndex = currentColorIndex < colorScheme.length - 1 ? currentColorIndex + 1 : 0;
        this.activeColor = colorScheme[currentColorIndex];
    }

    loop = (t) => {
        const ctx = this.ctx;
        const { isPlaying, audioContext } = this.props;
        const currentTime = !isPlaying ? 0 : audioContext ? audioContext.currentTime - this.startTime : false;
        const duration = this.props.timeLength;
        const iteration = duration === 0 || currentTime === 0 ? 0 : Math.floor(currentTime / duration);
        const percentPassed = (currentTime - (duration * iteration)) / duration;
        const indexThreshold = Math.ceil(this.levels.length * percentPassed);

        if (iteration !== this.iteration && isPlaying) {
            // this.switchColors();
            this.iteration = iteration;
        }

        this.levels.forEach((level, i) => {
            if (currentTime && i <= indexThreshold) level.updateState({ targetColor: this.activeColor });
            level.draw(ctx);
            level.update(t);
        });
        requestAnimationFrame(this.loop);
    }

    updateLevels = (data) => {
        const { width, height } = this.props;
        const step = Math.ceil(data.length / width) * resolution;

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
                const y  = height - value;

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
