
var pm2         = require('../..');
var should      = require('should');
var Modularizer = require('../../lib/Modularizer');

describe('Modularizer programmatic tests', function() {

  before(function(done) {
    process.env.PM2_WORKER_INTERVAL = 1000;

    pm2.connect(function() {
      pm2.delete('all', function() {
        done();
      });
    });
  });

  it('should have methods', function() {
    Modularizer.should.have.property('getAdditionalConf');
  });

  it('should uninstall modules', function(done) {
    Modularizer.uninstall('all', done);
  });

  it('should list 0 module', function() {
    var ret = Modularizer.listModules();
    ret.length.should.eql(0);
  });

  it('should install a module', function(done) {
    Modularizer.install('.', done);
  });

  it('should list 1 module', function(done) {
    pm2.list(function(err, procs) {
      procs.length.should.eql(1);
      done()
    });
  });

  it('should uninstall a module', function(done) {
    Modularizer.uninstall('pm2', done);
  });

  it('should list 0 module', function(done) {
    pm2.list(function(err, procs) {
      procs.length.should.eql(0);
      done()
    });
  });

});
