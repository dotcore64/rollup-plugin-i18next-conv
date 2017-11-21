/* globals expect */
import en from './locale/en/LC_MESSAGES/messages.po';
import de from './locale/de/LC_MESSAGES/messages.po';

expect(en['I have an apple']).to.equal('I have an apple');
expect(en['I have an apple_plural']).to.equal('I have {count} apples');
expect(de['I have an apple']).to.equal('Ich habe einen Apfel');
expect(de['I have an apple_plural']).to.equal('Ich habe {count} Äpfel');
