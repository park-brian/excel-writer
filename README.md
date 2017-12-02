# excel-writer
A simple excel writer for the browser and node.js


## Getting Started

```typescript
import { exportWorkbook } from 'excel-writer';
// or const exportWorkbook = require('excel-writer').exportWorkbook;

const sheets = [
  {
    name: 'Sheet 1',
    data: [
      ['a', 'b', 'c', 'd'],
      [1, 2, 3, 4]
    ]
  },

  {
    name: 'Sheet 2',
    data: [
      ['e', 'f', 'g', 'h'],
      [5, 6, 7, 8]
    ]
  }
];

/** 
  * Export in browser using file-saver:
  *  
  * import saveAs from 'file-saver';
  *
  * const data = await exportWorkbook(sheets, {type: 'blob'});
  * saveAs(data, 'data.xlsx');
  */

/** 
  * Export in node.js: 
  *
  * const fs = require('fs');
  *
  * const data = await exportWorkbook(sheets, {type: 'nodebuffer'});
  * fs.writeFile('data.xlsx', data);
  */
```