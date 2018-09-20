const expect = chai.expect

describe('check tests are running', () => {
  it('Check Tests running', () => {
    expect(true).to.equal(true);
  })
})

describe('main', () => {
  if (console) console.log('testing main')
})

describe('navbar', function() {
  it('is a div', function() {
    expect(navbar).to.be.a('div')
  })
})

describe('form', function() {
  it('is a form', function() {
    expect(form).to.be.a('form')
  })
})

describe('Latitude', function() {
  it('is a form Item', function() {
    expect(lat).to.be.a('form')
  })

  it('is a string', function() {
    expect(lat.type).to.be.a('string')
  })

  describe('setLat', function() {
    it('is a function', function() {
      expect(setLat).to.be.a('function')
    })
    it('does return a div dom element', function() {
      let div = setLat('lat')
      expect(div.tagName).to.equal('DIV')
    })
  })

  describe('renderLat', function() {
    it('is a function', function() {
      expect(renderLat).to.be.a('function')
    })
  })
})

describe('Longitude', function() {
  it('is a form Item', function() {
    expect(lon).to.be.a('input')
  })

  it('is a string', function() {
    expect(lon.type).to.be.a('string')
  })

  describe('setLon', function() {
    it('is a function', function() {
      expect(setLon).to.be.a('function')
    })
  })

  describe('renderLon', function() {
    it('is a function', function() {
      expect(renderLon).to.be.a('function')
    })
  })
})

describe('Distance Radius', function() {
  it('is a form Item', function() {
    expect(dist).to.be.a('input')
  })

  it('is a number', function() {
    expect(dist.type).to.be.a('number')
  })

  describe('setDist', function() {
    it('is a function', function() {
      expect(setDist).to.be.a('function')
    })
  })

  describe('renderDist', function() {
    it('is a function', function() {
      expect(renderDist).to.be.a('function')
    })
  })
})

describe('Min Trail Length', function() {
  it('is a form Item', function() {
    expect(lon).to.be.a('input')
  })

  it('is a number', function() {
    expect(min.type).to.be.a('number')
  })

  describe('setMin', function() {
    it('is a function', function() {
      expect(setMin).to.be.a('function')
    })
  })

  describe('renderMin', function() {
    it('is a function', function() {
      expect(renderMin).to.be.a('function')
    })
  })
})
