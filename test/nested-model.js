/* global describe:true,beforeEach,it,require */
'use strict';

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

  it('should unset a nested attribute', function () {
    this.model.set('nested.value', 'value');
    this.model.unset('nested.value', 'value');
    (this.model.get('nested.value') === undefined).should.be.true;
    this.model.get('nested').should.be.an.Object;
  });

  it('should unset an attribute on a nested model', function () {
    this.model.set('nested', new NestedModel({value:'value'}));
    this.model.unset('nested.value');
    this.model.get('nested').has('value').should.be.true;
  });

  it('should unset an attribute with a value of a model', function () {
    this.model.set('nested', new NestedModel({value:'value'}));
    this.model.unset('nested');
    Object.keys(this.model._nestedListener).length.should.equal(0);
  });
  
  
  
  it('should pick properties', () => {
    let model = new NestedModel({
      name: 'Lars',
      meta: {
        cool: 'guy',
        notcool: 'letter'  
      },
      age: 22
    });
    
    let obj = model.pick("name", "meta.cool");
    
    Object.keys(obj).length.should.equal(2)
    obj.should.be.an.Object();
    obj.should.have.property('name', 'Lars');
    obj.should.have.property('meta', {cool: 'guy'});
  });

});