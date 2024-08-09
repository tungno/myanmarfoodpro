module.exports = {
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(axios)/)', // Allow transformation for axios module
    ],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'], // Ensure Jest looks for test files
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy', // Handle CSS imports
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': 'jest-transform-stub', // Handle image imports
    },
};
