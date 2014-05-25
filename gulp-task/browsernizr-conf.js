var test = [
    'browsernizr/lib/prefixed',
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