const rpc = require('../helper.js').rpc;

describe('test anyConfigRpc get', function () {
  it('应该返回数据', function (done) {
    rpc.call('koala.anyconfig.get', {key: 'agenda.notifyList'}, function (result) {
      result.code.should.be.equal(0);
      result.data.emails[0].should.be.equal('server@kalengo.com');

      done();
    });
  });
});
