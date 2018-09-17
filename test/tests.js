const expect = chai.expect

describe('calculator', function () {
  it('is an object', function () {
    expect(calculator).to.be.a('object')
  })

  describe('#add', function () {
    it('should be a function', function () {
      expect(calculator.add).to.be.a('function')
    })

    it('should add two numbers together', function () {
      expect(calculator.add(10,20)).to.equal(30)
    })
  })

  describe('#subtract', function () {
    it('should be a function', function () {
      expect(calculator.add).to.be.a('function')
    })

    it('should subtract the second number from the first', function () {
      expect(calculator.subtract(13,7)).to.equal(6)
    })
  })

})
