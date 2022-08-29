module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: [`eslint-recommended`, `plugin:@typescript-eslint/recommended`],
    parser: `@typescript-eslint/parser`,
    plugins: [`@typescript-eslint`],
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    rules: {
        quotes: [`error`, `backtick`],
        semi: [`error`, `always`],
    }
};
