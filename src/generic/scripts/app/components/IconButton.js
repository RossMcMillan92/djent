import React, { Component } from 'react'
import { isNil } from 'ramda'
import PropTypes from 'prop-types'
import SVG from 'components/SVG'
import { capitalize } from 'utils/tools'

class IconButton extends Component {
    shouldComponentUpdate = nextProps => (
        nextProps.children !== this.props.children ||
        nextProps.icon !== this.props.icon ||
        nextProps.isDisabled !== this.props.isDisabled ||
        nextProps.isLoading !== this.props.isLoading ||
        nextProps.onClick !== this.props.onClick ||
        nextProps.style !== this.props.style ||
        nextProps.theme !== this.props.theme ||
        nextProps.title !== this.props.title
    )

    render() {
        const {
            children,
            icon,
            iconClassName,
            id,
            isDisabled,
            isLoading,
            onClick,
            style,
            theme,
            title,
        } = this.props
        const baseClass = `button-${style}`
        const themeClasses = Array.isArray(theme)
            ? theme
            : [theme]
        const themeClassString = themeClasses
            .filter(Boolean)
            .map(t => `${baseClass}--${t}`)
            .join(' ')
        const titleString = title || capitalize(icon)
        const optionalProps = {
            ...(id ? { id } : {}),
            ...(isDisabled ? { disabled: true } : {}),
        }

        return (
            <button
                className={`${baseClass} ${themeClassString} u-flex-row ${isLoading ? '' : 'icon-is-hidden'}`}
                onClick={onClick}
                title={titleString}
                {...optionalProps}
            >
                <span className={`${baseClass}__inner u-flex-row`}>
                    <SVG icon={icon} className={`${baseClass}__svg-icon ${iconClassName} ${children ? 'u-mr05' : ''}`} />
                    { children }
                </span>

                {
                    !isNil(isLoading) &&
                        <span className={`${baseClass}__icon`}>
                            <span className="spinner" />
                        </span>
                }
            </button>
        )
    }
}

IconButton.propTypes = {
    icon: PropTypes.string.isRequired,
    id: PropTypes.string,
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    style: PropTypes.string,
    theme: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    title: PropTypes.string
}

IconButton.defaultProps = {
    style: 'primary',
    isDisabled: false
}

export default IconButton
