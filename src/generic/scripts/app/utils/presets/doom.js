const preset = {
    "description": "Doom",
    "id": "doom",
    "settings": {
        "sequences": [{
            "id": "total",
            "bars": 4,
            "beats": 4
        }, {
            "id": "CUSTOM_SEQUENCE_1",
            "description": "Custom Sequence",
            "bars": 4,
            "beats": 4,
            "hitChance": 0.85,
            "allowedLengths": [{
                "id": "0.25",
                "name": "whole",
                "amount": 4,
                "isTriplet": false,
                "isDotted": false
            }, {
                "id": "0.5",
                "name": "half",
                "amount": 1,
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
                "amount": 0,
                "isTriplet": false,
                "isDotted": false
            }]
        }],
        "instruments": [{
            "id": "g",
            "sounds": [{
                "id": "sixth-0-muted",
                "amount": 1
            }, {
                "id": "sixth-0-open",
                "amount": 3
            }],
            "pitch": -400
        }, {
            "id": "k",
            "sounds": [{
                "id": "k",
                "amount": 4
            }]
        }, {
            "id": "s",
            "sounds": [{
                "id": "s",
                "amount": 16
            }]
        }, {
            "id": "c",
            "sounds": [{
                "id": "china-left",
                "amount": 8
            }]
        }, {
            "id": "d",
            "sounds": [{
                "id": "drone-medium",
                "amount": 2
            }]
        }]
    }
}

export default preset
