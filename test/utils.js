/*global describe:true, it:true, before:true */
'use strict';
const np = require('../lib/rest-model').normalize_path;
const objToPaths = require('../lib/nested-model').objToPaths;
require('should');

describe('Utils', () => {
  describe('NormalizePath', () => {

    it('should nornalize /test/, 1', () => {
      let str = np('/test/', '1');
      str.should.equal('/test/1');
    });

    it('should nornalize /test, 1', () => {
      let str = np('/test', '1');
      str.should.equal('/test/1');
    });

    it('should nornalize /test?hello=world, 1', () => {
      let str = np('/test?hello=world', '1');
      str.should.equal('/test/1?hello=world');
    });

    it('should nornalize /test/?hello=world, 1', () => {
      let str = np('/test/?hello=world', '1');
      str.should.equal('/test/1?hello=world');
    });

  });
  
  
  const Model = require('../lib/nested-model').NestedModel;
  
  describe.only('ObjToPaths', () => {
    
    const fixture = {
      genres: [{
        id: 1,
        name:"genre 1"
      }]
    };
    
    let model = new Model({
      genres: [{
        id: 2,
        name: "Hello "
      },{
        id: 3,
        name: "Hello "
      }]
    });
    
    it('should', () => {
      let out = objToPaths(fixture, '.');
      //console.log(out)
      
      model.set(fixture, {array:false})
      console.log(model.toJSON())
    })
    
  });
})