// Expose this here
// As in the front-end app we need to access those properties
var test = [
    'browsernizr/lib/prefixed',
    // 'browsernizr/lib/hasEvent ',
    'browsernizr/test/elem/progress-meter',
    'browsernizr/test/css/animations',
    'browsernizr/test/css/transitions',
    'browsernizr/test/css/transforms',
    'browsernizr/test/css/transforms3d',
    'browsernizr/test/css/target',
    'browsernizr/test/json'
];

module.exports = {
  test: test,
  all: test.slice().concat(['browsernizr'])
};