# excel-writer
A simple excel writer for the browser and node.js


## Getting Started

```typescript
import export from 'excel-writer';

const sheets = [
  {
    title: 'Sheet 1',
    data: [
      ['A1', 'A2', 'A3', 'A4'],
      [1, 2, 3, 4]
    ]
  }
];

const data: UInt8Array = export(sheets);

/** 
  * Export in browser using file-saver:
  *  
  * import saveAs from 'file-saver';
  * const blob = new Blob([data], {type: 'application/octet-stream'});
  * saveAs(blob, 'data.xlsx');
  */

/** 
  * Export in node.js: 
  *
  * const fs = require('fs');
  * fs.appendFileSync('data.xlsx', new Buffer(data));
  */
```