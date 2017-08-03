const preset = {
    "description": "High Tremolo",
    "id": "high-tremolo",
    "settings": {
        "config": {
            "bpm": 114
        },
        "sequences": [{
            "id": "total",
            "bars": 4,
            "beats": 4
        }, {
            "id": "CUSTOM_SEQUENCE_1",
            "description": "Chord Rythm",
            "bars": 4,
            "beats": 4,
            "hitChance": 1,
            "allowedLengths": [{
                "id": "0.25",
                "name": "whole",
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "0.5",
                "name": "half",
                "amount": 2,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "1",
                "name": "quarter",
                "amount": 2,
                "isTriplet": false,
                "isDotted": true
            }, {
                "id": "2",
                "name": "eighth",
                "amount": 1,
                "isTriplet": false,
                "isDotted": true
            }, {
                "id": "4",
                "name": "sixteenth",
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }]
        }, {
            "id": "CUSTOM_SEQUENCE_2",
            "description": "High Guitars",
            "bars": 4,
            "beats": 4,
            "hitChance": 1,
            "allowedLengths": [{
                "id": "0.25",
                "name": "whole",
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "0.5",
                "name": "half",
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "1",
                "name": "quarter",
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "2",
                "name": "eighth",
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "4",
                "name": "sixteenth",
                "amount": 1,
                "isTriplet": true,
                "isDotted": false
            }]
        }],
        "instruments": [{
            "id": "g",
            "sounds": [{
                "id": "sixth-0-chord",
                "amount": 1
            }, {
                "id": "sixth-3-chord",
                "amount": 1
            }, {
                "id": "sixth-8-chord",
                "amount": 1
            }],
            "volume": 0.9,
            "repeatHitTypeForXBeat": 4
        }, {
            "id": "lg",
            "sequences": ["CUSTOM_SEQUENCE_2"],
            "sounds": [{
                "id": "gs4",
                "amount": 2
            }, {
                "id": "b5",
                "amount": 2
            }, {
                "id": "cs5",
                "amount": 1
            }, {
                "id": "ds5",
                "amount": 1
            }, {
                "id": "e5",
                "amount": 2
            }, {
                "id": "fs5",
                "amount": 1
            }, {
                "id": "gs5",
                "amount": 2
            }],
            "fadeOutDuration": 0.06,
            "volume": 0.9,
            "repeatHitTypeForXBeat": 2
        }, {
            "id": "k",
            "sounds": [{
                "id": "k",
                "amount": 1
            }]
        }, {
            "id": "s",
            "sounds": [{
                "id": "s",
                "amount": 1
            }]
        }, {
            "id": "c",
            "sounds": [{
                "id": "crash-left",
                "amount": 1
            }, {
                "id": "crash-right",
                "amount": 1
            }, {
                "id": "china-left",
                "amount": 1
            }]
        }]
    }
}

export default preset
