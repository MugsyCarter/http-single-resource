const server = require('../server');
const router = require('../router');
const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('HTML webapp that has routes', function(){

    it('loads the webpage', function(done){
        server.start(router.route);
        chai.request('http://localhost:8080')
        .get('/')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert(res.text ==='Which language would you like to be greeted in: \n English, Spanish, French, German, Swahili, or Mandarin?\n \n  To add your own enter "new" as the url and then query your language and greeting as a querystring.  \n\n   Example: /new?samoan=Talofa, le Lalolagi.');
            done();
        });
    });
    it('routes to different pages', function(done){
        console.log('in 2nd test');
        chai.request('http://localhost:8080')
        .get('/Swahili')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert(res.text ==='Salamu, Dunia.');
            done();
        });
    });
    it('displays different messages on different pages', function(done){
        console.log('in 2nd test');
        chai.request('http://localhost:8080')
        .get('/French')
        .end(function (err, res) {
            expect(err).to.be.null;
            assert(res.text ==='Bonjour le monde.');
            done();
        });
    });

    it('sends back special text with time of day in the Spanish query string', function(done){
        chai.request('http://localhost:8080/Spanish')
            .get('?time=evening')
            .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.type, 'text/plain');
                assert.equal(res.text, 'Buenos noches, Mundo');
                done();
            });
    });
});








