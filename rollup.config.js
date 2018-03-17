/**
 * @file rollup.config
 * @author Cuttle Cong
 * @date 2018/3/11
 * @description
 */
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import sourcemaps from 'rollup-plugin-sourcemaps'


const plugins = [
  babel({
    runtimeHelpers: true,
    babelrc: false,
    'presets': [
      [
        'env',
        {
          'targets': {
            'node': '6',
            'browsers': ['ie>=9']
          },
          "loose": false,
          'useBuiltIns': true,
          'modules': false
        }
      ],
      'react'
    ],
    'plugins': [
      'external-helpers'
    ]
  }),
  resolve({
    browser: true
  }),
  commonjs(),
  filesize()
]


function config({
  input,
  umdName
}) {
  return [
    {
      plugins: plugins.concat(sourcemaps()),
      input,
      output: {
        sourcemap: true,
        file: 'dist/umd.js',
        name: umdName,
        format: 'umd'
      }
    },
    {
      plugins: plugins.concat(uglify(), sourcemaps()),
      input,
      output: {
        sourcemap: true,
        file: 'dist/umd.min.js',
        name: umdName,
        format: 'umd'
      }
    },
    {
      plugins,
      input,
      output: {
        sourcemap: true,
        file: 'dist/es.js',
        format: 'es'
      }
    },
    {
      plugins,
      input,
      output: {
        sourcemap: true,
        file: 'dist/common.js',
        format: 'cjs'
      }
    }
  ]
}

const input = 'src/index.js'
export default (
  config({ input, umdName: 'mediumImageProgressive' })
    .concat({
      plugins,
      input: 'src/react.js',
      external: ['react'],
      output: {
        sourcemap: true,
        file: 'dist/react.js',
        format: 'cjs'
      }
    })
)
