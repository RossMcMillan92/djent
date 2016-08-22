import React, { Component } from 'react';

const RESOLUTION = 3;
const colorScheme = [
    '#888',
    '#fff',
];

const incrementBySpeed = (val, targetVal, dist) => val + (dist * (targetVal - val));

const Level = (x, y, w, h, targetColor) => {
    let lastUpdateTime = 0;
    const vy = 1.5; // px/s
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
        if (oldState.y === state.y && oldState.color === state.color) return;
        // ctx.fillStyle = 'transparent';
        ctx.clearRect(state.x, 0, w + 1, h);
        ctx.fillStyle = `${state.color}`;
        ctx.fillRect(state.x, state.y, state.w, state.h);

        oldState.y = state.y;
        oldState.color = state.color;
    };

    const update = (t) => {
        if (!t) return;

        const time = (t - lastUpdateTime) / 1000;

        const disty = time * vy;
        state.y = Math.min(state.h, Math.round(incrementBySpeed(state.y, state.targety, disty) * 100) / 100);
        state.color = state.targetColor;

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

export default class Waveform extends Component {
    iteration = 0;
    loopIsEnabled = false;
    ctx;
    levels = [];
    backgroundColor = colorScheme[0];
    activeColor = colorScheme[1];

    shouldComponentUpdate = (nextProps) =>
    this.props.isPlaying !== nextProps.isPlaying
    || this.props.isLoading !== nextProps.isLoading
    || this.props.buffer !== nextProps.buffer

    componentDidMount = () => {
        this.initialise(this.props);
    }

    componentWillUpdate = (nextProps) => {
        if (this.props.width !== nextProps.width || !this.levels.length) {
            this.initialise(nextProps);
        }
    }

    componentDidUpdate = () => {
        if (!this.props.buffer) return;

        const data = this.props.buffer.getChannelData(0);

        this.updateLevels(data);

        if (!this.loopIsEnabled) {
            this.loop();
            this.loopIsEnabled = true;
        }
    }

    initialise = (props) => {
        const { width, height } = props;
        this.fixCanvasScale(width, height);
        this.createInitialLevelsFromWidth(width, height);
    }

    createInitialLevelsFromWidth = (width, height) => {
        const levelAmount = Math.ceil(width / RESOLUTION);

        if (this.levels.length !== levelAmount) {
            this.levels = createInitialLevels(levelAmount, height, RESOLUTION);
        }
    }

    fixCanvasScale = (width, height) => {
        const canvas = this.refs.canvas;
        if (!this.ctx) this.ctx = canvas.getContext('2d');

        const devicePixelRatio = window.devicePixelRatio || 1;
        const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                                  this.ctx.backingStorePixelRatio || 1;
        const canvasRatio = devicePixelRatio / backingStoreRatio;
        const scaledWidth = width * canvasRatio;
        const scaledHeight = height * canvasRatio;

        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        this.ctx.scale(canvasRatio, canvasRatio);
    }

    loop = (t) => {
        const ctx = this.ctx;
        const { isPlaying, audioContext, audioStartTime, timeLength } = this.props;
        const currentTime = !isPlaying ? 0 : audioContext ? audioContext.currentTime - audioStartTime : false;
        const duration = timeLength;
        const iteration = duration === 0 || currentTime <= 0 ? 0 : Math.floor(currentTime / duration);
        const percentPassed = (currentTime - (duration * iteration)) / duration;
        const indexThreshold = Math.ceil(this.levels.length * percentPassed);

        this.levels.forEach((level, i) => {
            const levelColor = currentTime && i <= indexThreshold ? this.activeColor : this.backgroundColor;
            level.draw(ctx);
            level.updateState({ targetColor: levelColor });
            level.update(t);
        });

        requestAnimationFrame(this.loop);
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
                const y  = this.props.isLoading ? height - 3 : (height - value);

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
