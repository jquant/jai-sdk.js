const config = {
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(t|j)s$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    verbose: true,
    testEnvironment: "node",
    testTimeout: 30000,

};

module.exports = config;