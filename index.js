/*
ISC License

Copyright (c) 2017, Atif Aziz

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE
OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
*/

const xlsjs = require("xlsjs");

const args = process.argv.slice(2);

const path = args.shift();
if (!path) {
    console.error('Missing input file path or dash (-) for base64 over STDIN.');
    process.exit(0xbad);
}

(cb => {
    if (path === '-') {
        const stdin = process.stdin;
        stdin.setEncoding('utf8');
        stdin.resume();
        const chunks = [];
        stdin.on('data', chunk => chunks.push(chunk));
        stdin.on('end', () => cb(xlsjs.read(Buffer.from(chunks.join(), 'base64'))));
    } else {
        cb(xlsjs.readFile(path));
    }
})((workbook) => {
    const sheetNames = workbook.SheetNames;
    const sheetName = args.shift() || (sheetNames.length === 1 ? sheetNames[0] : null);

    if (!sheetName) {
        console.error('Workbook contains more than one worksheet:');
        sheetNames.forEach(sn => console.error(`- ${sn}`));
        process.exit(1);
    }
    
    const sheet = workbook.Sheets[sheetName];
    process.stdout.write(xlsjs.utils.sheet_to_csv(sheet));
});
