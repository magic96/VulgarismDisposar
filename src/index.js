const reservedPhrase = 'vulgarism#';

// prevent to recursive loop when disposing
const validateDictionary = target => {
  if (!Array.isArray(target)) throw new Error('Dictionary must be an array!');
  
  const hasOnlyStrings = target.every(phrase => typeof phrase === 'string');
  if (!hasOnlyStrings) throw new Error('Dictionary should contains only strings!');
  
  const hasReservedPhrase = target.some(phrase => phrase.indexOf(reservedPhrase) > -1);
  if (hasReservedPhrase) throw new Error('Dictionary cannot contains the reserved phrase!');
};

export default class VulgarismDisposar {
  setDictionary(dictionary) {
    validateDictionary(dictionary);
    this.dictionary = dictionary;
    return this;
  }
  
  encode(phrase) {
    return new Promise((resolve, reject) => {
      if (typeof phrase !== 'string') return reject(new Error('Phrase must be a string.'));
      
      this.dictionary.forEach((word, wordIndex) => {
        const caughtWords = phrase.match(new RegExp(word, 'i'));
        
        if (caughtWords) caughtWords.forEach(caughtWord => phrase = phrase.replace(caughtWord, `[${reservedPhrase}${wordIndex}]`));
      });
      
      resolve(phrase);
    });
  }
  
  decode(phrase) {
    return new Promise((resolve, reject) => {
      if (typeof phrase !== 'string') return reject(new Error('Phrase must be a string.'));
      
      const encodedPhrases = phrase.match(new RegExp(`\[${reservedPhrase}[0-9]{1,}\]`, 'g'));
      if (encodedPhrases) {
        encodedPhrases.forEach(encodedPhrase => {
          const startIndex = encodedPhrase.indexOf(reservedPhrase);
          const wordIndex = Number(encodedPhrase.slice(startIndex + reservedPhrase.length, -1));
          const decodedWord = this.dictionary[wordIndex] || '[unknown phrase]';
          
          phrase = phrase.replace(encodedPhrase, encodedPhrase.substr(0, startIndex - 1) + decodedWord);
        });
      }
      resolve(phrase);
    });
  }
  
  constructor(dictionary = []) {
    if (dictionary) this.setDictionary(dictionary);
  }
}