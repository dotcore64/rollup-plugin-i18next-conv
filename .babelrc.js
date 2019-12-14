module.exports = api => ({
  presets: [
    ['@babel/env', {
      targets: api.env() === 'test' ? { node: 'current' } : { node: '8' },
    }]
  ],
  plugins: (api.env() === 'test') ? ['istanbul'] : [],
});
