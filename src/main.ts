import * as JSZip from 'jszip';
import contentTypesTemplate from './templates/[Content_Types].xml';
import rels from './templates/_rels/.rels';
import workbookTemplate from './templates/xl/workbook.xml';
import workbookRelsTemplate from './templates/xl/_rels/workbook.xml.rels';
import worksheetTemplate from './templates/xl/worksheets/sheet.xml';

export interface Sheet {
  name: string;
  data: any[][];
}

export interface ExportOptions {
  type: 
    'base64' |
    'binarystring' |
    'array' |
    'uint8array' |
    'arraybuffer' |
    'blob' |
    'nodebuffer';
}

export const indexToLocation = (row: number, column: number) => {
  const base = 'A'.charCodeAt(0);
  const rowPart = row + 1;
  const columnPart = String.fromCharCode(base + column);
  return `${columnPart}${rowPart}`;
}

export const createStringCell = (value: string, row: number, column: number) => `
  <c r="${indexToLocation(row, column)}" t="inlineStr">
    <is>
      <t>${value}</t>
    </is>
  </c>
`;

export const createNumberCell = (value: number, row: number, column: number) => `
  <c r="${indexToLocation(row, column)}">
    <v>${value}</v>
  </c>
`;

export const createCell = (value: any, row: number, column: number) => (
  typeof value === 'number'
    ? createNumberCell(value, row, column)
    : createStringCell(value.toString(), row, column)
);

export const createRow = (values: any[], row: number): string => `
  <row r="${row + 1}">
    ${values.map((value, column) => 
      createCell(value, row, column)).join('')}
  </row>
`;

export const createSheetContentType = (index: number) => `
  <Override 
    ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" 
    PartName="/xl/worksheets/${index}.xml" />
`;

export const createSheetRelationship = (index: number) => `
  <Relationship 
    Id="sheet${index}" 
    Target="worksheets/${index}.xml" 
    Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" />
`;

export const createSheet = (name: string, index: number) => `
  <sheet 
    name="${name}" 
    sheetId="${index}" 
    r:id="sheet${index}" />
`;

export const exportWorkbook = (sheets: Sheet[], options: ExportOptions) => {

  const workbook = workbookTemplate.replace('<placeholder />', 
    sheets.map((sheet, index) => createSheet(sheet.name, index + 1)).join('')
  );

  const workbookRels = workbookRelsTemplate.replace('<placeholder />',
    sheets.map((sheet, index) => createSheetRelationship(index + 1)).join('')
  );

  const contentTypes = contentTypesTemplate.replace('<placeholder />',
    sheets.map((sheet, index) => createSheetContentType(index + 1)).join('')
  );
  
  const zip = new JSZip();
  zip.file('_rels/.rels', rels);
  zip.file('[Content_Types].xml', contentTypes);
  zip.file('xl/workbook.xml', workbook);
  zip.file('xl/_rels/workbook.xml.rels', workbookRels);

  sheets.forEach((sheet, index) => {
    const rows = sheet.data.map(createRow).join('');
    const worksheet = worksheetTemplate.replace('<placeholder />', rows);
    zip.file(`xl/worksheets/${index + 1}.xml`, worksheet);
  });

  return zip.generateAsync({type: options ? options.type : 'blob'});
}

global['exportWorkbook'] = exportWorkbook;