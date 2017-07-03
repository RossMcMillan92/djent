import React, { Component } from 'react'
import { IO, Maybe } from 'ramda-fantasy'

import {
    compose,
    curry,
    flip,
    identity,
    map,
} from 'ramda'

import { getLocalStorageIO, setLocalStorageIO } from 'modules/localStorageIO'
import { toBoolean } from 'modules/casting'

const maybe  = Maybe.maybe

//    getExpandableKeyName :: String -> String
const getExpandableKeyName = title => `expandable-${title}`

//    titleToLSKey :: String -> String
const titleToLSKey = curry(compose(
    getExpandableKeyName,
    escape,
))

//    getLSItemFromTitle :: String -> IO String
const getLSItemFromTitle = curry(compose(
    getLocalStorageIO,
    titleToLSKey,
))

//    getLSItemOrDefault :: Boolean -> String -> IO Boolean
const getLSItemOrDefault = curry((defaultVal, title) => compose(
    map(maybe(defaultVal, identity)),
    map(map(toBoolean)),
    map(Maybe),
    getLSItemFromTitle,
)(title))

//    setLSItemFromTitle :: String -> String -> IO
const setLSItemFromTitle = curry((title, value) => compose(
    flip(setLocalStorageIO)(value),
    titleToLSKey,
)(title))

//    setStateIO :: ReactComponent -> Object -> IO
const setStateIO = curry((ctx, state) =>
    IO(() => ctx.setState(state)))

class Expandable extends Component {
    isPristine = true

    constructor(props) {
        super()
        const defaultValue = getLSItemOrDefault(props.isExpanded, props.title).runIO()

        this.state = {
            isExpanded: defaultValue
        }
    }

    componentWillUpdate = (nextProps) => {
        const propsHaveChanged = nextProps.isExpanded !== this.props.isExpanded
        const propsAreDifferent = nextProps.isExpanded !== this.state.isExpanded
        if (propsHaveChanged
            && propsAreDifferent
            && nextProps.isExpanded !== undefined
            && this.isPristine) {
            this.setState({ isExpanded: nextProps.isExpanded })
        }
    }

    onClick = () => {
        const newValue = !this.state.isExpanded
        const updateExpandedState = compose(
            setStateIO(this),
            d => ({ isExpanded: d }),
        )

        if (this.props.enableStateSave && window.localStorage) setLSItemFromTitle(this.props.title, newValue).runIO()

        this.isPristine = false
        updateExpandedState(newValue).runIO()
    }

    render = () => (
        <div className={`expandable ${this.state.isExpanded ? 'is-expanded' : ''} ${this.props.className ? this.props.className : ''}`}>
            <div className={`expandable__title ${this.props.titleClassName ? this.props.titleClassName : ''}`} onClick={this.onClick}>
                { this.props.title }
            </div>
            <div className={`expandable__body ${this.props.bodyClassName ? this.props.bodyClassName : ''}`} onClick={() => { this.isPristine = false }}>
                { this.props.children }
            </div>
        </div>
    )
}

export default Expandable
