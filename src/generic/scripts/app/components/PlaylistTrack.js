import React from 'react'
import BPMInput from 'components/BPMInput'
import InputBox from 'components/InputBox'
import SVG from 'components/SVG'

const PlaylistTrack = ({
    isActive,
    isLocked,
    onBPMChange,
    onDelete,
    onDuplicate,
    onLoadSettings,
    onLockTrack,
    onTitleChange,
    title,
    bpm
}) => (
    <div className="u-flex-row u-flex-justify">
        <div className="u-flex-row u-flex-center">
            <PlaylistTrackButton
                className={isLocked ? 'u-txt-positive' : ''}
                onClick={onLockTrack}
                title="Lock Track"
                icon="lock"
            />

            <InputBox
                defaultValue={title}
                containerClassName={`input-container input-container--${isActive ? 'light' : 'semi-light'} input-container--${!isActive ? 'disguised' : 'visible'} u-mr1`}
                className="input-container__input input-container__input--bare input-container__input--small"
                labelClassName="input-container__label"
                maxLength={30}
                onChange={onTitleChange}
                placeholder="Track Name"
            />
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
