/* global describe:true, it:true, before:true */
'use strict';
require('should');

const Collection = require('../lib/paginated-collection').PaginatedCollection;

describe('Paginated Collection', () => {
  
   it('should getNextPage', (done) => {
     
     let col = new Collection(null,{
       url: '/test',
       firstPage: 1
     });
     
     col.sync = function (method, model, options) {
       method.should.equal(2);
       options.params.should.have.property('page', 2)
       options.params.should.have.property('pageSize', 10);
       options.should.have.property('url', '/test');
       return Promise.resolve({
         method: 2,
         getResponseHeader: function () {
           return `</test?page=3>; rel="next", </test?page=10>; rel="last", </test?page=1>; rel="prev", </test?page=1>; rel="first"`
         }
       })
     }
     
     col.getNextPage().then(() => {
       
       col._link.should.have.property('1', '/test?page=1');
       col._link.should.have.property('2', '/test?page=2');
       col._link.should.have.property('3', '/test?page=3');
       col._link.should.have.property('10', '/test?page=10');
       
       done();
     }).catch(done);
     
   });  
  
  
});