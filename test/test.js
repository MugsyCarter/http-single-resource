const server = require('../lib/server');
const router = require('../lib/router');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('HTML webapp that has a persistent data store', function(){

    it('loads the webpage', function(done){
        server.start(router.route);
        chai.request('http://localhost:8080')
        .get('/')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert.ok(res);
            done();
        });
    });

    it('does not take data that already exists in the store' , function(done){
        chai.request('http://localhost:8080')
        .get('/?country-entry=Spain&capital-entry=Madrid')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert.equal(res.text,'The database already contains an entry for Spain');
            done();
        });
    });

    it('lets the user add data to the store', function(done){
        chai.request('http://localhost:8080')
        .get('/?country-entry=Finland&capital-entry=Helsinki')
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Helsinki/g;
            assert(patt.test(res.text) === true);
            done();
        });
    });

    it('creates persistent data', function(done){
        chai.request('http://localhost:8080')
        .get('/')
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Helsinki/g;
            assert(patt.test(res.text) === true);
            done();
        });
    });

    it('deletes data on command', function(done){
        chai.request('http://localhost:8080')
        .get('/nuke')
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Helsinki/g;
            assert(patt.test(res.text) === false);
            done();
        });
    });

    it('lets the user add more data', function(done){
        chai.request('http://localhost:8080')
        .get('/?country-entry=Spain&capital-entry=Madrid')
        .end(function (err, res) {
            expect(err).to.be.null;
            var patt = /Madrid/g;
            assert(patt.test(res.text) === true);
            done();
        });
    });
});








