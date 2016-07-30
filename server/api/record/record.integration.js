'use strict';

var app = require('../..');
import request from 'supertest';

var newRecord;

describe('Record API:', function() {

  describe('GET /api/records', function() {
    var records;

    beforeEach(function(done) {
      request(app)
        .get('/api/records')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          records = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      records.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/records', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/records')
        .send({
          name: 'New Record',
          info: 'This is the brand new record!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newRecord = res.body;
          done();
        });
    });

    it('should respond with the newly created record', function() {
      newRecord.name.should.equal('New Record');
      newRecord.info.should.equal('This is the brand new record!!!');
    });

  });

  describe('GET /api/records/:id', function() {
    var record;

    beforeEach(function(done) {
      request(app)
        .get('/api/records/' + newRecord._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          record = res.body;
          done();
        });
    });

    afterEach(function() {
      record = {};
    });

    it('should respond with the requested record', function() {
      record.name.should.equal('New Record');
      record.info.should.equal('This is the brand new record!!!');
    });

  });

  describe('PUT /api/records/:id', function() {
    var updatedRecord;

    beforeEach(function(done) {
      request(app)
        .put('/api/records/' + newRecord._id)
        .send({
          name: 'Updated Record',
          info: 'This is the updated record!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedRecord = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRecord = {};
    });

    it('should respond with the updated record', function() {
      updatedRecord.name.should.equal('Updated Record');
      updatedRecord.info.should.equal('This is the updated record!!!');
    });

  });

  describe('DELETE /api/records/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/records/' + newRecord._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when record does not exist', function(done) {
      request(app)
        .delete('/api/records/' + newRecord._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
