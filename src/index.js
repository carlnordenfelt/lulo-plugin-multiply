'use strict';

var pub = {};

pub.validate = function (event) {
    if (!event.ResourceProperties.LeftFactor) {
        throw new Error('Missing required property LeftFactor');
    }
    if (!(/^[0-9.]+$/).test(event.ResourceProperties.LeftFactor.toString())) {
        throw new Error('LeftFactor must be a number');
    }
    if (!event.ResourceProperties.RightFactor) {
        throw new Error('Missing required property RightFactor');
    }
    if (!(/^[0-9.]+$/).test(event.ResourceProperties.RightFactor.toString())) {
        throw new Error('RightFactor must be a number');
    }
};

pub.create = function (event, _context, callback) {
    var product = event.ResourceProperties.LeftFactor * event.ResourceProperties.RightFactor;
    setImmediate(function () {
        callback(null, { physicalResourceId: product });
    });
};

pub.delete = function (_event, _context, callback) {
    return setImmediate(callback);
};

pub.update = function (event, context, callback) {
    return pub.create(event, context, callback);
};

module.exports = pub;
