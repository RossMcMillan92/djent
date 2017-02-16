import { IO } from 'ramda-fantasy'

import {
    compose,
    curry,
} from 'ramda'

const ga = window.ga
const eventQueue = []

let isRequestIdleCallbackScheduled
const schedulePendingEvents = () => {
    if (isRequestIdleCallbackScheduled) return
    isRequestIdleCallbackScheduled = true
    requestIdleCallback(processPendingAnalyticsEvents)
}

const processPendingAnalyticsEvents = (deadline) => {
    isRequestIdleCallbackScheduled = false

    // Go for as long as there is time remaining and work to do.
    while (deadline.timeRemaining() > 0 && eventQueue.length > 0) {
        const event = eventQueue.pop()
        event.runIO()
    }

    // Check if there are more events still to send.
    if (eventQueue.length > 0) schedulePendingEvents()
}

//    sendGAEvent :: String s : s -> s -> s -> IO gaEvent
const sendGAEvent = curry((eventCategory, eventAction, eventLabel) =>
    IO(() => {
        ga('send', {
            hitType: 'event',
            eventCategory,
            eventAction,
            ...(eventLabel !== '' ? { eventLabel } : {})
        })
    })
)

//    addGAEventToQueue :: IO gaEvent -> ()
const addGAEventToQueue = compose(
    schedulePendingEvents,
    event => eventQueue.push(event)
)

//    sendPlaybackEvent :: eventAction -> eventLabel -> IO gaEvent
const sendPlaybackEvent = sendGAEvent('Playback')

//    sendOutputEvent :: eventAction -> eventLabel -> IO gaEvent
const sendOutputEvent = sendGAEvent('Output')

//    sendGenerateEvent :: label -> IO gaEvent
export const sendGenerateEvent = compose(
    addGAEventToQueue,
    sendPlaybackEvent('generate')
)

//    sendShareEvent :: label -> IO gaEvent
export const sendShareEvent = compose(
    addGAEventToQueue,
    sendOutputEvent('share')
)

//    sendSaveEvent :: label -> IO gaEvent
export const sendSaveEvent = compose(
    addGAEventToQueue,
    sendOutputEvent('save')
)

//    sendFacebookLinkEvent :: label -> IO gaEvent
export const sendFacebookLinkEvent = compose(
    addGAEventToQueue,
    sendOutputEvent('facebookLink')
)
