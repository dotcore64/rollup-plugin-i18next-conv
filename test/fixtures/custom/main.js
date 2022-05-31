/* globals expect */
import en from './en.po';

expect(en['I have an apple']).to.equal('I have an apple');
expect(en['I have an apple_plural']).to.equal('I have {count} apples');
