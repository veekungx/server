const hello = require('./hello');
const { expect } = require('chai');

describe('Hello', () => {
  it('should greet', () => {
    expect(hello()).to.equal('hello');
  });
});