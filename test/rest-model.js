/*global describe:true, it:true, before:true */
'use strict';
const Model = require('../lib/rest-model').RestModel;
const ps = require('../lib/persistence');

require('should');
var sinon = require('sinon');


describe('RestfulModel', () => {

  describe('Fetch', () => {

    it('should throw exception, when no url is defined', (done) => {
      var model = new Model();
      model.fetch().then(done).catch((e) => {
        (e == null).should.be.false;
        e.message.should.equal('Url or rootURL no specified');
        done();
      });
    });

    it('should trigger before:fetch event', () => {
      var model = new Model(null, {
        url: '/test'
      });
      model.sync = () => Promise.resolve([]);
      var spy = sinon.spy();
      model.on('before:fetch', spy);
      model.fetch()
      spy.callCount.should.equal(1);
    });

    it('should trigger fetch', (done) => {
      var model = new Model(null, {
        url: '/test'
      });
      model.sync = () => Promise.resolve([]);

      var spy = sinon.spy();
      model.on('fetch', spy);
      model.fetch().then(() => {
        spy.callCount.should.equal(1);
        done();
      }).catch(done)

    });

    it('should fetch', (done) => {

      var model = new Model(null, {
        url: '/test'
      });
      var options = {};

      model.sync = function(method, s, o) {
        method.should.equal(ps.RestMethod.Read);
        s.should.equal(model);
        return Promise.resolve({
          method: method,
          content: {
            name: 'MC Hammer',
            id: 200
          }
        });
      }



      model.fetch(options).then((m) => {
        m.should.equal(model);
        m.id.should.equal(200);
        m.get('name').should.equal('MC Hammer');
        done();
      }).catch(done);


    });



  });




  it('should create', (done) => {

    var model = new Model({
      name: 'Jack McGee'
    }, {
      url: '/test'
    });

    model.sync = function(method, s, o) {
      method.should.equal(ps.RestMethod.Create);
      o.url.should.equal('/test');
      s.should.equal(model);
      model.set('id', 100);
      return Promise.resolve({
        method: method,
        content: s.toJSON()
      });
    }

    model.save().then((m) => {
      m.should.equal(model);
      m.id.should.equal(100);
      m.get('name').should.equal('Jack McGee');
      done();
    }).catch(done);

  });

  it('should update', (done) => {

    var model = new Model({
      name: 'Jack McGee',
      id: 100
    }, {
      url: '/test'
    });

    model.sync = function(method, s, o) {
      method.should.equal(ps.RestMethod.Update);
      s.should.equal(model);
      o.url.should.equal('/test/100')
      return Promise.resolve(s.toJSON());
    }

    model.save().then((m) => {
      m.should.equal(model);
      m.id.should.equal(100);
      m.get('name').should.equal('Jack McGee');
      done();
    }).catch(done);

  });

  it('save should throw when no url i specified', (done) => {
    var model = new Model();
    model.save().then(done).catch((e) => {
      (e == null).should.be.false;
      e.message.should.equal('Url or rootURL no specified');
      done();
    });

  });


  it('should remove', (done) => {

    var model = new Model({
      name: 'Jack McGee',
      id: 100
    }, {
      url: '/test'
    });

    model.sync = function(method, s, o) {
      method.should.equal(ps.RestMethod.Delete);
      s.should.equal(model);
      o.url.should.equal('/test/100')
      return Promise.resolve(s.toJSON());
    }

    model.remove().then((m) => {
      done();
    }).catch(done);

  });



});