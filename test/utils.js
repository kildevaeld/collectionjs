/*global describe:true, it:true, before:true */
'use strict';
const np = require('../lib/persistable-model').normalize_path;
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
})