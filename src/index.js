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
    if (event.ResourceProperties.DecimalPoints) {
        if (!(/^[0-9]+$/).test(event.ResourceProperties.DecimalPoints.toString())) {
            throw new Error('DecimalPoints must be an integer');
        }
    }
};

pub.create = function (event, _context, callback) {
    var product = event.ResourceProperties.LeftFactor * event.ResourceProperties.RightFactor;
    if (event.ResourceProperties.DecimalPoints !== undefined) {
        product = product.toFixed(parseInt(event.ResourceProperties.DecimalPoints));
    }
    setImmediate(function () {
        callback(null, { Product: parseFloat(product) });
    });
};

pub.delete = function (_event, _context, callback) {
    return setImmediate(callback);
};

pub.update = function (event, context, callback) {
    return pub.create(event, context, callback);
};

module.exports = pub;
