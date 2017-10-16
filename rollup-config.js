import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'src/main.ts',
  dest: 'src/build.ts', // output a single application bundle
  sourceMap: false,
  format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
  },
  plugins: [
      nodeResolve({jsnext: true, module: true}),
      commonjs({
        include: [
                'node_modules/rxjs/**',
                'node_modules/ng2-toastr/**'
             ],
         namedExports : { 
            'node_modules/ng2-toastr/ng2-toastr.js': [ 'ToastModule', 'ToastsManager' ]
         }
      }),
      uglify()
  ]
}
