import { default as VD } from '../src/index.js';


// some fake objects to test :D
const someNumber = Math.round(Math.random() * 100000);
const someObject = {};
const someArray = [];
const someBool = !Math.floor(Math.random() * 2);
const someString = Math.random().toString(36).substr(2);

describe('VulgarismDisposar', () => {
  it('should be a function', () => expect(VD).to.be.a('function'));
  
  it('calls setDictionary with first argument if passed', () => {
    const someInstance = new VD(someArray);
    
    expect(someInstance.dictionary).to.equal(someArray);
  });
  
  it('sets dictionary as an empty array if argument not passed', () => {
    const someInstance = new VD();
    
    expect(someInstance.dictionary).to.be.an('array');
    expect(someInstance.dictionary).to.be.empty;
  });
});

describe('VulgarismDisposar#setDictionary', () => {
  it('requires an array as argument', () => {
    const someInstance = new VD();
    const errorData = [Error, 'Dictionary must be an array!'];
    
    expect(() => someInstance.setDictionary()).to.throw(...errorData);
    expect(() => someInstance.setDictionary(someNumber)).to.throw(...errorData);
    expect(() => someInstance.setDictionary(someObject)).to.throw(...errorData);
    expect(() => someInstance.setDictionary(someBool)).to.throw(...errorData);
    expect(() => someInstance.setDictionary(someString)).to.throw(...errorData);
    expect(() => someInstance.setDictionary(someArray)).not.to.throw(...errorData);
  });
  
  it('requires an array with strings values', () => {
    const someInstance = new VD();
    const errorData = [Error, 'Dictionary should contains only strings!'];
    
    expect(() => someInstance.setDictionary([1, 'a', 'a'])).to.throw(...errorData);
    expect(() => someInstance.setDictionary([someBool])).to.throw(...errorData);
    expect(() => someInstance.setDictionary([someArray])).to.throw(...errorData);
    expect(() => someInstance.setDictionary([])).to.not.throw(...errorData);
    expect(() => someInstance.setDictionary(['a'])).to.not.throw(...errorData);
  });
  
  it('requires an array without reserved phrase', () => {
    const reservedPhrase = 'vulgarism#';
    const someInstance = new VD();
    const errorData = [Error, 'Dictionary cannot contains the reserved phrase!'];
    
    expect(() => someInstance.setDictionary([])).not.to.throw(...errorData);
    expect(() => someInstance.setDictionary([reservedPhrase])).to.throw(...errorData);
  });
});

describe('VulgarismDisposar#encode', () => {
  const someDictionary = ['usun', 'konto', 'mireczku'];
  const someInstance = new VD(someDictionary);
  
  it('returns a promise', () => {
    expect(someInstance.encode()).to.be.an.instanceof(Promise);
  });
  
  it('requires some string as argument', () => {
    const errorData = [Error, 'Phrase must be a string.'];
    
    return Promise.all([
      someInstance.encode(someNumber).should.be.rejectedWith(...errorData),
      someInstance.encode(someArray).should.be.rejectedWith(...errorData),
      someInstance.encode(someObject).should.be.rejectedWith(...errorData),
      someInstance.encode(someBool).should.be.rejectedWith(...errorData),
      someInstance.encode(someString).should.become(someString),
    ]);
  });
  
  it('gives correct result', () => {
    const pairs = [
      ['usun konto mireczku', '[vulgarism#0] [vulgarism#1] [vulgarism#2]'],
      ['bdlsabdlausun', 'bdlsabdla[vulgarism#0]'],
      ['', ''],
      ['___konto___', '___[vulgarism#1]___'],
      ['USUN KONTO', '[vulgarism#0] [vulgarism#1]'],
    ];
    
    return Promise.all(pairs.map(pair => {
      const phrase = pair[0];
      const expectedOutput = pair[1];
            
      return someInstance.encode(phrase).should.become(expectedOutput);
    }));
  });
});

describe('VulgarismDisposar#decode', () => {
  const someDictionary = ['usun', 'konto', 'mireczku'];
  const someInstance = new VD(someDictionary);
  
  it('returns a promise', () => {
    expect(someInstance.encode()).to.be.an.instanceof(Promise);
  });
  
  it('requires some string as argument', () => {
    const errorData = [Error, 'Phrase must be a string.'];
    
    return Promise.all([
      someInstance.encode(someNumber).should.be.rejectedWith(...errorData),
      someInstance.encode(someArray).should.be.rejectedWith(...errorData),
      someInstance.encode(someObject).should.be.rejectedWith(...errorData),
      someInstance.encode(someBool).should.be.rejectedWith(...errorData),
      someInstance.encode(someString).should.become(someString),
    ]);
  });
  
  it('gives correct result', () => {  
    const pairs = [
      ['usun konto mireczku', '[vulgarism#0] [vulgarism#1] [vulgarism#2]'],
      ['bdlsabdlausun', 'bdlsabdla[vulgarism#0]'],
      ['', ''],
      ['___konto___', '___[vulgarism#1]___'],
      ['usun konto', '[vulgarism#0] [vulgarism#1]'],
      ['[unknown phrase]', '[vulgarism#10]']
    ];

    return Promise.all(pairs.map(pair => {
      const phrase = pair[1];
      const expectedOutput = pair[0];

      return someInstance.decode(phrase).should.become(expectedOutput);
    }));
  });
});