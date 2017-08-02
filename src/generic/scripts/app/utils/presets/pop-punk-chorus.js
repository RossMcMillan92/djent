const preset = {
    "description": "Chrous",
    "id": "chrous",
    "settings": {
        "config": {
            "bpm": 95
        },
        "sequences": [{
            "id": "total",
            "bars": 4,
            "beats": 4
        }, {
            "id": "CUSTOM_SEQUENCE_1",
            "description": "Custom Sequence",
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
                "amount": 5,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "4",
                "name": "sixteenth",
                "amount": 2,
                "isTriplet": false,
                "isDotted": false
            }]
        }],
        "instruments": [{
            "id": "g",
            "sounds": [{
                "id": "sixth-3-muted",
                "amount": 1
            }, {
                "id": "sixth-4-muted",
                "amount": 1
            }, {
                "id": "sixth-8-muted",
                "amount": 1
            }],
            "repeatHitTypeForXBeat": 2
        }, {
            "id": "k",
            "sounds": [{
                "id": "k",
                "amount": 1
            }]
        }, {
            "id": "s",
            "sequences": ["offsetQuarters"],
            "sounds": [{
                "id": "s",
                "amount": 1
            }]
        }, {
            "id": "h",
            "sequences": ["steadyEighths"],
            "sounds": [{
                "id": "h",
                "amount": 1
            }]
        }, {
            "id": "c",
            "sequences": ["steadyWholes"],
            "sounds": [{
                "id": "crash-left",
                "amount": 1
            }, {
                "id": "crash-right",
                "amount": 1
            }]
        }]
    }
}

export default preset
