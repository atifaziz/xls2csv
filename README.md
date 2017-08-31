# xls2csv

Node-based utility that converts an Excel worksheet in the BIFF5/BIFF8
format to CSV and sends the output to `STDOUT`.

Usage:

    xls2csv FILE [SHEETNAME]

where `FILE` is the path to the Excel workbook file and `SHEETNAME`
specifies the name of the worksheet within the workbook to be
formatted as CSV. If the workbook contains a single worksheet then
the `SHEETNAME` argument can be omitted. If the the workbook contains
more than an one worksheet then `SHEETNAME` is required.

If `FILE` is a dash (`-`) then the Excel workbook content is read from
`STDIN` in [Base64][base64].

This utility wraps a command-line interface over [xlsjs][xlsjs].


[base64]: https://en.wikipedia.org/wiki/Base64
[xlsjs]: https://www.npmjs.com/package/xlsjs
