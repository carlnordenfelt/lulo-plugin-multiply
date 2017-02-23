'use strict';

var expect = require('chai').expect;

describe('Index unit tests', function () {
    var subject = require('../../src/index');
    var event;
    beforeEach(function () {
        event = {
            ResourceProperties: {
                LeftFactor: '3',
                RightFactor: '4'
            }
        };
    });

    describe('validate', function () {
        it('should succeed', function (done) {
            subject.validate(event);
            done();
        });
        it('should fail if DecimalPoints is not a number', function (done) {
            event.ResourceProperties.DecimalPoints = '2';
            subject.validate(event);
            done();
        });
        it('should fail if LeftFactor is not set', function (done) {
            delete event.ResourceProperties.LeftFactor;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property LeftFactor/);
            done();
        });
        it('should fail if LeftFactor is not a number', function (done) {
            event.ResourceProperties.LeftFactor = 'ABC';
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/LeftFactor must be a number/);
            done();
        });
        it('should fail if LeftFactor is not a number', function (done) {
            event.ResourceProperties.LeftFactor = '123ABC';
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/LeftFactor must be a number/);
            done();
        });
        it('should fail if RightFactor is not set', function (done) {
            delete event.ResourceProperties.RightFactor;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property RightFactor/);
            done();
        });
        it('should fail if RightFactor is not a number', function (done) {
            event.ResourceProperties.RightFactor = 'ABC';
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/RightFactor must be a number/);
            done();
        });
        it('should fail if DecimalPoints is not a number', function (done) {
            event.ResourceProperties.DecimalPoints = 'ABC';
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/DecimalPoints must be an integer/);
            done();
        });
    });

    describe('create', function () {
        it('should succeed', function (done) {
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.Product).to.equal(12);
                done();
            });
        });
        it('should multiply floats', function (done) {
            event.ResourceProperties.RightFactor = 2.5;
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.Product).to.equal(7.5);
                done();
            });
        });
        it('should return 0 decimal points', function (done) {
            event.ResourceProperties.DecimalPoints = 0;
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.Product).to.equal(12);
                done();
            });
        });
        it('should round off float to 0 decimals', function (done) {
            event.ResourceProperties.RightFactor = 2.33;
            event.ResourceProperties.DecimalPoints = 0;
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.Product).to.equal(7);
                done();
            });
        });
        it('should round off float to 4 decimals', function (done) {
            event.ResourceProperties.LeftFactor = 0.33;
            event.ResourceProperties.RightFactor = 0.33;
            event.ResourceProperties.DecimalPoints = 4;
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.Product).to.equal(0.1089);
                done();
            });
        });
    });

    describe('update', function () {
        it('should succeed', function (done) {
            subject.update(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.Product).to.equal(12);
                done();
            });
        });
    });

    describe('delete', function () {
        it('should succeed', function (done) {
            subject.delete(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                done();
            });
        });
    });
});
