import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from '../utils/tools';

const RESISTANCE_COEF = 0.7;
const UNCERTAINTY_THRESHOLD = 3; // px

const getFinalIndex = (roundingType, maxIndex, index) => compose(
    (v) => Math.max(0, v),
    (v) => Math.min(maxIndex, v),
    Math[roundingType]
)(index);

class SwipeableViews extends Component {
    static defaultProps = {
        index: 0,
        threshold: 5,
        resistance: false,
    }

    indexCurrent;
    containerEl;
    rootEl;

    componentWillMount = () => {
        this.indexCurrent = this.props.index;
    }

    componentDidMount = () => {
        this.containerEl = this.refs.container;
        this.rootEl = findDOMNode(this);
    }

    componentWillUpdate = (nextProps) => {
        if (this.indexCurrent !== nextProps.index) {
            this.indexCurrent = nextProps.index;
        }
    }

    onTouchStart = (event) => {
        const touch = event.touches[0];
        this.startWidth = this.rootEl.getBoundingClientRect().width;
        this.startX = touch.pageX;
        this.lastX = touch.pageX;
        this.vx = 0;
        this.startY = touch.pageY;
        this.isSwiping = undefined;
        this.started = true;

        this.containerEl.style.transition = 'none';
    }

    onTouchMove = (event) => {
        if (!this.started) return this.handleTouchStart(event);

        const touch = event.touches[0];

        // We don't know yet.
        if (this.isSwiping === undefined) {
          if (event.defaultPrevented) {
            this.isSwiping = false;
          } else {
            const dx = Math.abs(this.startX - touch.pageX);
            const dy = Math.abs(this.startY - touch.pageY);

            const isSwiping = dx > dy && dx > UNCERTAINTY_THRESHOLD;

            if (isSwiping === true || dx > UNCERTAINTY_THRESHOLD || dy > UNCERTAINTY_THRESHOLD) {
              this.isSwiping = isSwiping;
              this.startX = touch.pageX; // Shift the starting point.
            }
          }
        }

        if (this.isSwiping !== true) {
          return;
        }

        // Prevent native scrolling
        event.preventDefault();

        this.vx = this.vx * 0.5 + (touch.pageX - this.lastX) * 0.5;
        this.lastX = touch.pageX;

        const indexMax = this.props.children.length;

        let index = this.indexCurrent + (this.startX - touch.pageX) / this.startWidth;

        if (!this.props.resistance) {
            index = compose((v) => Math.min(indexMax, v), (v) => Math.max(0, v))(index);
            this.startX = touch.pageX;
        } else {
            if (index < 0) {
                index = Math.exp(index * RESISTANCE_COEF) - 1;
            } else if (index > indexMax) {
                index = indexMax + 1 - Math.exp((indexMax - index) * RESISTANCE_COEF);
            }
        }

        this.containerEl.style.transform = `translate3d(${index * -100}%, 0, 0)`;
        this.index = index;
    }

    onTouchEnd = () => {
        if (!this.started || this.isSwiping !== true) return;
        this.containerEl.style.transition = '';
        this.started = false;

        const pastSpeedThreshold = (Math.abs(this.vx) > this.props.threshold);
        const roundingType = pastSpeedThreshold
                           ? (this.vx > 0) ? 'floor' : 'ceil'
                           : 'round';

        const distanceTravelled = (this.startWidth * Math.abs(this.indexCurrent - this.index));
        const time = Math.abs((this.startWidth - distanceTravelled) / this.vx);
        console.log('TIME', time)

        const index = getFinalIndex(roundingType, this.props.children.length - 1, this.index);
        this.containerEl.style.transform = `translate3d(${index * -100}%, 0, 0)`;

        if (pastSpeedThreshold && index !== this.indexCurrent) {
            this.containerEl.style.transitionDuration = `${time}ms`;
            setTimeout(() => {
                this.containerEl.style.transitionDuration = '';
            }, time)
        }

        this.changeIndex(index);
    }

    changeIndex = (index) => {
        this.indexCurrent = index;
        if (this.props.onChangeIndex) this.props.onChangeIndex(index);
    }

    renderChildren = (children) => children
        .map((child, i) => (
            <div className="swipeable__slide" key={i}>
                { child }
            </div>
        ))

    render = () => (
        <div className="swipeable">
            <div
                className="swipeable__container"
                onTouchStart={this.onTouchStart}
                onTouchMove={this.onTouchMove}
                onTouchEnd={this.onTouchEnd}
                ref="container"
                style={{
                    transform: `translate3d(${this.indexCurrent * -100}%, 0, 0)`
                }}
            >
                { this.renderChildren(this.props.children) }
            </div>
        </div>
    )
}

export default SwipeableViews;
