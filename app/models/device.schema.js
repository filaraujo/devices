var clog = require('clog'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// define browser schema
var Device = new Schema({
    created: Date,
    id: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    agent: {
        type: Object,
        family: String,
        major: String,
        minor: String,
        patch: String,
        id: String
    },
    css: {
        animations: Boolean,
        background: {
            repeatround: Boolean,
            repeatspace: Boolean,
            size: Boolean,
            sizeCover: Boolean
        },
        border: {
            image: Boolean,
            radius: Boolean
        },
        box: {
            sizing: Boolean,
            shadow: Boolean
        },
        checked: Boolean,
        filters: Boolean,
        layouts: {
            displayrunin: Boolean,
            flexbox: Boolean,
            columns: Boolean,
            positionSticky: Boolean

        },
        text: {},
        transforms: {
            '2d': Boolean,
            '3d': Boolean
        },
        transitions: Boolean,
        units: {
            rem: Boolean,
            vh: Boolean,
            vmin: Boolean,
            vmax: Boolean,
            vw: Boolean
        }
    },
    device: Object,
    html: {
        input: {
            properties: {
                autocomplete: Boolean,
                autofocus: Boolean,
                list: Boolean,
                max: Boolean,
                min: Boolean,
                multiple: Boolean,
                pattern: Boolean,
                placeholder: Boolean,
                required: Boolean,
                step: Boolean
            },
            types: {
                color: Boolean,
                date: Boolean,
                datetime: Boolean,
                datetimelocal: Boolean,
                email: Boolean,
                file: Boolean,
                month: Boolean,
                number: Boolean,
                range: Boolean,
                search: Boolean,
                tel: Boolean,
                time: Boolean,
                url: Boolean,
                week: Boolean
            }
        }
    },
    system: {
        type: Object,
        major: String,
        minor: String,
        patch: String,
        patchMinor: String,
        id: String
    }
});

// define default for created
Device.path('created').default(Date.now);

Device.post('save', function() {
    clog.debug('action:\tDevice saved to database');
});

// export Browser
module.exports = mongoose.model('Device', Device);