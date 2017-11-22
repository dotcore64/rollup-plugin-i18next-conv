const env = process.env.NODE_ENV || 'production';
const targets = env === 'test' ? { node: 'current' } : { node: '6' };

module.exports = {
  presets: [['@babel/env', { targets }]],
  plugins: [
    '@babel/proposal-object-rest-spread',
    ...(env === 'test') ? ['istanbul'] : [],
  ],
};
