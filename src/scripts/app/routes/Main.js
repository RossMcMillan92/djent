import React, { Component } from 'react';

import Expandable from '../components/Expandable';
import Spinner from '../components/Spinner';
import SwipeableViews from '../components/SwipeableViews';

import Instruments from '../containers/Instruments';
import Modal from '../containers/Modal';
import Player from '../containers/Player';
import Sequences from '../containers/Sequences';

import { defaultAllowedLengths } from '../reducers/sequences';

import presets, { backwardsCompatibility } from '../utils/presets';
import { getActiveSoundsFromHitTypes } from '../utils/instruments';
import { getPresetData, getPresetFromData, handleGoogleAPI } from '../utils/short-urls';

import { log, throttle } from '../utils/tools';
import { isMobile } from '../utils/mobile';

export default class Main extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    state = {
        activePageIndex: 0,
        googleAPIHasLoaded: false
    }

    refreshOnWindowResize = () => {
        const throttledFn = throttle(() => this.forceUpdate(), 500);
        window.addEventListener('resize', throttledFn);
    }

    componentWillMount = () => {
        this.setupBackButtonController();

        const shareID = this.props.params.shareID;

        handleGoogleAPI()
            .then(() => {
                this.checkForShareData(shareID);
                this.setState({ googleAPIHasLoaded: true });
            })
            .catch(e => log(e));

        if (!shareID) {
            const presetID = this.props.params.presetID || this.props.activePresetID;
            const preset = presets.find(p => p.id === presetID)
                         || presets.find(p => p.id === this.props.activePresetID);
            return this.props.actions.applyPreset(preset);
        }

        this.props.actions.enableModal({
            content: (<Spinner subtext="Loading..." />),
            isCloseable: false,
            className: 'modal--auto-width',
        });
    }

    componentDidMount = () => {
        this.refreshOnWindowResize();
    }

    componentWillUpdate = (nextProps) => {
        if (!this.props.params.shareID && nextProps.params.shareID) {
            this.checkForShareData(nextProps.params.shareID);
        }
    }

    componentWillUnmount = () => {
        window.removeEventListener('popstate', this.backToHome);
    }

    setupBackButtonController = () => {
        window.addEventListener('popstate', this.backToHome);
    }

    backToHome = () => {
        if (document.location.hash !== '#fwd') {
            this.changeActivePageIdnex(0);
        }
    }

    setActivePageIndex = (index) => {
        if (this.state.activePageIndex !== index) this.setState({ activePageIndex: index });
    }

    checkForShareData = (shareID) => {
        if (shareID) {
            getPresetData(shareID)
                .then(this.applySharedPreset);
        }
    }

    applySharedPreset = (data) => {
        let sharedPreset = getPresetFromData(data);

        if (sharedPreset) {
            sharedPreset = backwardsCompatibility(sharedPreset, defaultAllowedLengths);
            sharedPreset.settings.instruments = sharedPreset.settings.instruments
                .map(i => ({ ...i, sounds: getActiveSoundsFromHitTypes(i.predefinedHitTypes) }));

            this.props.actions.applyPreset(sharedPreset);
        }

        this.props.actions.disableModal();
    }

    changeActivePageIdnex = (index) => {
        this.context.router.push(`${index === 0 ? '' : '#fwd'}`);
        this.setActivePageIndex(index);
    };

    render = () => {
        const tabs = ['Player', 'Sequences', 'Instruments']
            .map((tabName, i) => (
                <div
                    key={i}
                    className={`nav-tab ${i === this.state.activePageIndex ? 'is-active' : ''}`}
                    onClick={() => this.changeActivePageIdnex(i)}
                >
                    <div className="nav-tab__inner">
                        { tabName }
                    </div>
                </div>
            ));
        const isMobileView = isMobile();
        const headerContent =  (
            <div className="">
                <div className="group-spacing-x">
                    <div className="u-flex-row u-flex-justify">
                        <h1 className="header__title u-mb0">
                            Djen
                        </h1>
                        <a className="" href="https://www.facebook.com/djenerationstation/" target="_blank">
                            <img
                                className="header__icon social-icon"
                                src="/assets/images/F_icon.svg"
                                width="39"
                                height="39"
                            />
                        </a>
                    </div>
                </div>
            </div>
        );
        const expandableTitleClass = 'title-primary u-txt-large dropdown-icon-after group-padding-x group-padding-x-small@mobile group-capped-x group-centered';
        const Views = isMobileView
            ? (
                <SwipeableViews
                    viewHeight={true}
                    resistance={true}
                    index={this.state.activePageIndex}
                    onChangeIndex={(i) => this.changeActivePageIdnex(i)}
                >
                    <Player
                        route={this.props.route}
                        googleAPIHasLoaded={this.state.googleAPIHasLoaded}
                    />
                    <Sequences route={this.props.route} />
                    <Instruments route={this.props.route} />
                </SwipeableViews>
            )
            : (
                <div>
                    <div className="u-mb2">
                        <Player
                            route={this.props.route}
                            googleAPIHasLoaded={this.state.googleAPIHasLoaded}
                        />

                    </div>
                    <div className="u-mb2">
                        <Expandable
                            title="Sequences"
                            titleClassName={expandableTitleClass}
                        >
                            <Sequences route={this.props.route} />
                        </Expandable>
                    </div>
                    <Expandable
                        title="Instruments"
                        titleClassName={expandableTitleClass}
                    >
                        <Instruments route={this.props.route} />
                    </Expandable>
                </div>
            );

        return (
            <section>
                <Modal />
                <div className="site">
                    <div className="site__content" ref="content">
                        <div className="header" ref="header">
                            <div className="group-capped-x group-centered">
                                { headerContent }
                            </div>
                        </div>

                        { Views }
                    </div>

                    {
                        isMobile
                      ? (
                          <div className="site__fixed">
                              <div className="u-flex-row u-flex-justify-around">
                              {
                                  isMobileView
                                  ? tabs
                                  : null
                              }
                              </div>
                          </div>
                        )
                      : null
                    }
                </div>
            </section>
        );
    }

}
