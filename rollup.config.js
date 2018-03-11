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
      ]
    ],
    // 'plugins': [
    //   'external-helpers'
    // ]
  }),
  resolve({
    browser: true
  }),
  commonjs(),
  filesize()
]

const input = 'src/index.js'

export default [
  {
    plugins: plugins.concat(sourcemaps()),
    input,
    sourceMap: true,
    output: {
      file: 'dist/umd.js',
      name: 'mediumImageProgressive',
      format: 'umd'
    }
  },
  {
    plugins: plugins.concat(uglify(), sourcemaps()),
    input,
    sourceMap: true,
    output: {
      file: 'dist/umd.min.js',
      name: 'mediumImageProgressive',
      format: 'umd'
    }
  },
  {
    plugins,
    input,
    output: {
      file: 'dist/es.js',
      format: 'es'
    }
  },
  {
    plugins,
    input,
    output: {
      file: 'dist/common.js',
      format: 'cjs'
    }
  }
]
