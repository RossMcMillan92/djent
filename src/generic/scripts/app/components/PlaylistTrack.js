import React from 'react'
import SVG from 'components/SVG'

const PlaylistTrack = ({ isLocked, onDelete, onDuplicate, onLoadSettings, onLockTrack, title }) => (
    <div className="u-flex-row u-flex-justify">
        <div className="u-flex-row u-align-center">
            <PlaylistTrackButton
                className={isLocked ? 'u-txt-positive' : ''}
                onClick={onLockTrack}
                title="Lock Track"
                icon="lock"
            />

            <div className="block-list__body u-pl0 u-txt-truncate">
                { title }
            </div>
        </div>
        <div className="u-flex-row u-align-center">
            <PlaylistTrackButton
                className="is-disablable"
                onClick={onLoadSettings}
                title="Load Settings"
                icon="gear"
            />
            <PlaylistTrackButton
                className="is-disablable u-txt-negative"
                onClick={onDelete}
                title="Delete"
                icon="cross"
            />
            <PlaylistTrackButton
                className="is-disablable u-txt-positive"
                onClick={onDuplicate}
                title="Duplicate"
                icon="plus"
            />
        </div>
    </div>
)

const PlaylistTrackButton = props => (
    <div
        className={`block-list__button block-list__content-spacing ${props.className}`}
        onClick={ props.onClick }
        title={ props.title }
    >
        <SVG className="block-list__button-icon" icon={props.icon} />
    </div>
)

export default PlaylistTrack
