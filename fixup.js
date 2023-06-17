const fs = require('fs')
fs.writeFileSync('lib/cjs/package.json', JSON.stringify({ type: 'commonjs' }, null, 2))
fs.writeFileSync('lib/esm/package.json', JSON.stringify({ type: 'module' }, null, 2))
