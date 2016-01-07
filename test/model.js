require('should');
var sinon = require('sinon');
var NestedModel = require('../lib/nested-model').NestedModel;

describe('NestedModel', function () {

  beforeEach(function () {
    this.model = new NestedModel();
  });

  it('should set key:value', function () {
    this.model.set('key', 'value');

    this.model._attributes.should.have.property('key', 'value');
  });

  it('should get key', function () {
    this.model.set('key', 'value');
    this.model.get('key').should.equal('value');
  });

  it('should set nested.key:value', function () {
    this.model.set('nested.key', 'value');
    this.model._attributes.should.have.property('nested', {key: 'value'});
  });

  it('should get nested.key', function () {
    this.model.set('nested.key', 'value');
    this.model.get('nested.key').should.equal('value');
  });

  it('should set key:value on nested model', function () {
    this.model.set('key', new NestedModel());
    this.model.set('key.nested', 'value');
    this.model.get('key')._attributes.should.have.property('nested', 'value');
    this.model.set('key.deep.nested', 'value');
    this.model.get('key')._attributes.deep.should.have.property('nested', 'value');
    
  });

  it('should get key on nested model', function () {
    this.model.set('key.deep', new NestedModel());
    this.model.set('key.deep.nested', 'value');
    this.model.get('key.deep.nested').should.equal('value');
  });
  
  it('should trigger change on nested.key', function () {
    var callback = sinon.spy();
    this.model.on('change', callback);
    this.model.on('change:nested.key', callback);
    this.model.set('nested.key', 'value');
    callback.callCount.should.be.equal(2);
  });
  
  it('should trigger change on parent model with set at nested attribute', function () {
    var callback = sinon.spy();
    this.model.set('nested', new NestedModel());
    this.model.on('change', callback);
    this.model.on('change:nested.key', callback);
    
    this.model.get('nested').set('key', 'value');
    
    callback.callCount.should.be.equal(2);
  
  });

});