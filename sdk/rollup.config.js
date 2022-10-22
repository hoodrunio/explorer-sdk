// rollup.config.js
import dts from 'rollup-plugin-dts'
/**
 * @type {import('rollup').RollupOptions}
 */
export default [
    {
        input: './compiled/index.js',
        output: [
            {
                file: 'bundle/index.cjs.js',
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: 'bundle/index.esm.js',
                format: 'es',
                sourcemap: true,
            },
        ],
    },

    {
        input: './compiled/index.d.ts',
        output: {
            file: './bundle/index.d.ts',
            format: 'es',
        },
        plugins: [dts()],
    },
]
