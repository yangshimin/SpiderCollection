### Reading data from database to generate Excel
#### Write excel
You can use pandas or openpyxl or xlwt to generate Excel files
##### Pandas
```Python
from pandas import DataFrame


EXCEL_KEYWORD = ['columnName_1', 'columnName_2']

def generate_excel(data_contains, save_path):
    """
    :param data_contains: Data to be saved as Excel,
    :param save_path:  Path to save the file
    
    Examples
    --------
    >>> d = [{'col1': 'a', 'col2': 'b'}, {'col1': 'c', 'col2': 'd'}]
    >>> df = pd.DataFrame(data=d)
    """
    data_frame = DataFrame(data_contains, columns=EXCEL_KEYWORD)
    data_frame.to_excel(save_path, index=False)
```
* advantages: Both XLSX and XLS excel formats are supported

##### xlwt
```python
import xlwt

"""
Examples
--------
>>> ew = ExcelWriter()
>>> sheet = ew.add_sheet(ew.workbook, 'sheet1')
>>> headers = ['column1', 'column2']
>>> data_container = [['a', 'b'], ['c', 'd']]
>>> ew.padding(sheet, data_container, headers)
>>> ew.save(ew.workbook, 'excel save path')
"""


class ExcelWriter(object):

    def __init__(self):
        self._workbook = xlwt.Workbook()

    @property
    def workbook(self):
        return self._workbook

    @property
    def default_header_style(self):
        style = xlwt.XFStyle()
        style.font = self.default_header_fstyle
        style.alignment.horz = xlwt.Alignment.HORZ_CENTER
        style.alignment.vert = xlwt.Alignment.VERT_CENTER
        return style

    @property
    def default_style(self):
        style = xlwt.XFStyle()
        style.font = self.default_fstyle
        return style

    @property
    def default_header_fstyle(self):
        fstyle = xlwt.Font()
        fstyle.bold = True
        # fstyle.charset = 'utf8'
        return fstyle

    @property
    def default_fstyle(self):
        fstyle = xlwt.Font()
        # fstyle.charset = 'utf8'
        return fstyle

    def add_sheet(self, workbook, sheetname, cell_overwrite_ok=True):
        if isinstance(workbook, xlwt.Workbook):
            return workbook.add_sheet(sheetname, cell_overwrite_ok)

    def create_workbook(self):
        return xlwt.Workbook()

    def padding(self, sheet, data, headers, header_style=None, style=None):
        if not isinstance(sheet, xlwt.Worksheet) \
                or not isinstance(data, list) \
                or not isinstance(headers, list):
            raise TypeError('argument type error')
        if not data:
            raise ValueError('data is empty')
        if headers and len(headers) != len(data[0]):
            raise ValueError('column error.')
        table_data = data
        if headers:
            table_data.insert(0, headers)
        rs, cs = len(table_data), len(table_data[0])
        header_style = header_style or self.default_header_style
        style = style or self.default_style
        for r in range(rs):
            for c in range(cs):
                _style = header_style if r == 0 and headers else style
                sheet.write(r, c, table_data[r][c], _style)

    def save(self, workbook, filePath):
        if isinstance(workbook, xlwt.Workbook):
            workbook.save(filePath)
```
* disadvantages: Only Excel files in XLS format are supported

##### openpyxl
```python
import openpyxl


class ExcelWriter(object):

    def __init__(self):
        self._workbook = openpyxl.Workbook()

    @property
    def workbook(self):
        return self._workbook

    @staticmethod
    def add_sheet(workbook, sheetname, cell_overwrite_ok=True):
        if isinstance(workbook, openpyxl.Workbook):
            return workbook.create_sheet(sheetname, cell_overwrite_ok)

    @staticmethod
    def create_workbook():
        return openpyxl.Workbook()

    @staticmethod
    def padding(sheet, data, headers, header_style=None, style=None):
        if not isinstance(data, list) \
                or not isinstance(headers, list):
            raise TypeError('argument type error')
        if not data:
            raise ValueError('data is empty')
        if headers and len(headers) != len(data[0]):
            raise ValueError('column error.')
        table_data = data
        if headers:
            table_data.insert(0, headers)
        rs, cs = len(table_data), len(table_data[0])
        for r in range(rs):
            for c in range(cs):
                sheet.cell(row=r+1, column=c+1).value = table_data[r][c]

    def save(self, workbook, filePath):
        if isinstance(workbook, openpyxl.Workbook):
            workbook.save(filePath)
```

* disadvantages: Only Excel files in XLSX format are supported


#### Read excel
You can use pandas or openpyxl or xlwt to read Excel data
##### Pandas
```python
import numpy
import pandas as pd


def read_to_dict(excel_path, sheet_name, headers_list=None):
    """
    :param excel_path: The path to the Excel file to read.
    :param sheet_name:  The name of the Excel sheet to read.
    :param headers_list: Name of the Excel column to read. 
                        If headers_list is None all columns in Excel will be read by default
    """
    try:
        excel_data = pd.read_excel(excel_path, sheet_name=sheet_name)
    except Exception as e:
        excel_data = pd.read_table(excel_path, error_bad_lines=False)
    excel_data.fillna("", inplace=True)

    # 选取特定列
    if headers_list:
        excel_data = excel_data[headers_list]
    data_contains = []
    for index in excel_data.index.values:
        line_data = excel_data.loc[index]
        # 过滤掉Excel中的空行
        if any(line_data) is not False:
            df_line = line_data.to_dict()

            for key, value in df_line.items():
                if isinstance(value, numpy.bool_):
                    df_line[key] = bool(value)
                elif type(value) in [numpy.int64, numpy.int32]:
                    df_line[key] = int(value)

            data_contains.append(df_line)
    return data_contains
```
* advantages: Both XLSX and XLS excel formats are supported
* disadvantages: Reading files in read-only mode is not supported and complex Excel styles cannot be set

##### xlrd
```python
import xlrd
from datetime import datetime

"""
Examples
--------
>>> data_contains = list()
>>> er = ExcelReader('excel file path')
>>> sheet_names = er.sheet_names
>>> for sheet_name in sheet_names:
        _, data = er.read_cols_data_by_headers(sheet_name, *["column1", "column2"])
        data_contains.append({sheet_name: data})
"""


class ExcelReader(object):

    def __init__(self, excel_path):
        self.excel = xlrd.open_workbook(excel_path)

    @property
    def sheet_names(self):
        return self.excel.sheet_names()

    def sheet_by_name(self, sheet_name):
        return self.excel.sheet_by_name(sheet_name)

    def number2datetime(self, num, format=0):
        d = datetime(*xlrd.xldate_as_tuple(num, 0))
        if format > 0:
            d = d.strftime('%Y-%m-%d')
        return d

    def isnumber(self, s):
        try:
            s = float(s)
        except:
            return False
        return True

    def read_sheet(self, sheet_name, has_header=True):
        sheet = self.sheet_by_name(sheet_name)
        nrows = sheet.nrows
        # ncols = sheet.ncols
        if (has_header and nrows == 1) or nrows == 0:
            raise Warning('%s is empty.' % sheet_name)
        headers, data = [], []
        for r in range(nrows):
            row_data = sheet.row_values(r)
            if has_header and r == 0:
                headers = row_data
            else:
                data.append(row_data)
        return headers, data

    def read_cols_data(self, sheet_name, has_headers=True, *cindexs):
        _headers, _data = self.read_sheet(sheet_name, has_headers)
        headers, data = [], []
        for i in cindexs:
            headers.append(_headers[i])
        for rd in _data:
            r = []
            for ci in cindexs:
                r.append(rd[ci])
            data.append(r)
        return headers, data

    def read_cols_data_by_headers(self, sheet_name, *headers):
        _headers, _data = self.read_sheet(sheet_name, True)
        if not _headers:
            raise ValueError('headers is null.')
        cindexs = []
        for header in headers:
            idx = _headers.index(header)
            if idx > -1:
                cindexs.append(idx)
            else:
                raise ValueError('cannot found header: %s in %s' % (header, _headers))
        headers, data = [], []
        for i in cindexs:
            headers.append(_headers[i])
        for rd in _data:
            r = []
            for ci in cindexs:
                r.append(rd[ci])
            data.append(r)
        return headers, data
```
* disadvantages: Only Excel files in XLS format are supported

##### openpyxl
```python
import openpyxl


def read_excel_by_openpyxl(file_path, sheet_name, header_list=None):
    """
    :param file_path: The path to the Excel file to read
    :param sheet_name: The name of the Excel file to read
    :param header_list: Name of the Excel column to read. 
                        If headers_list is None all columns in Excel will be read by default
    """
    wb = openpyxl.load_workbook(file_path, read_only=True)
    ws = wb[sheet_name]

    if ws.calculate_dimension() == "A1:A1":
        ws.reset_dimensions()

    data_contains = list()
    headers = list()
    for index, row in enumerate(ws.rows):
        if index == 0:
            headers.extend([cell.value for cell in row])
        else:
            if not header_list:
                line_data = [int(cell.value) if isinstance(cell.value, float) else cell.value for cell in row]
                zip_data = zip(headers, line_data)
            else:
                line_data = [row[headers.index(field)].value for field in header_list]
                zip_data = zip(header_list, line_data)
            dict_data = {item[0]: item[1] for item in zip_data}
            data_contains.append(dict_data)

    wb.close()
    return data_contains
```
* advantages: Support for fast reading of large Excel files in a readable manner
* disadvantages: Only Excel files in XLSX format are supported


### Upload and download files through FTP
##### upload
```python
import os
import paramiko


FTP_CONFIG = {
    "address": 'ftp2.synnex.com',
    "port": 22,
    "user": "ftp login user",
    "pwd": "ftp login pwd",
    "receive_file_path": "The path to the file to download",
    "upload_path": "Path for storing uploaded files"
}



def upload_to_ftp(file_or_path):
    """
    :param file_or_path: Path to the file to upload
    """
    transport = paramiko.Transport((FTP_CONFIG['address'], FTP_CONFIG['port']))
    transport.banner_timeout = 60

    transport.connect(username=FTP_CONFIG['user'], password=FTP_CONFIG['pwd'])
    sftp = paramiko.SFTPClient.from_transport(transport)
    if os.path.isdir(file_or_path):
        for entry in os.scandir(file_or_path):
            file_path = entry.path
            file_name = os.path.split(file_path)[-1]
            sftp.put(file_path, FTP_CONFIG['upload_path'] + file_name)
    else:
        file_name = os.path.split(file_or_path)[-1]
        sftp.put(file_or_path, FTP_CONFIG['upload_path'] + file_name)
    sftp.close()
```


##### download
```python
import os
import time
import paramiko
import datetime


FTP_CONFIG = {
    "address": 'ftp2.synnex.com',
    "port": 22,
    "user": "ftp login user",
    "pwd": "ftp login pwd",
    "receive_file_path": "The path to the file to download",
    "upload_path": "Path for storing uploaded files"
}

def get_week_period():
    """
    Returns the start and end times of the current week
    """
    today = datetime.datetime.date(datetime.datetime.now())
    this_week_start = today - datetime.timedelta(days=today.weekday())
    this_week_end = today + datetime.timedelta(days=6 - today.weekday())

    start_time_tuple = int(time.mktime(this_week_start.timetuple()))
    end_time_tuple = int(time.mktime(this_week_end.timetuple())) + 24 * 3600 - 10
    return start_time_tuple, end_time_tuple


def receive_init_file_from_ftp(save_dir):
    """
    Pull up the new files on the FTP server in the current week
    :param save_dir: The path to the Excel file to save
    """
    transport = paramiko.Transport((FTP_CONFIG['address'], FTP_CONFIG['port']))
    transport.banner_timeout = 60

    transport.connect(username=FTP_CONFIG['user'], password=FTP_CONFIG['pwd'])
    sftp = paramiko.SFTPClient.from_transport(transport)
    start_timestamp, end_timestamp = get_week_period()
    save_path = None

    for file in sftp.listdir_attr(FTP_CONFIG['receive_file_path']):
        file_mtime = file.st_mtime
        if start_timestamp <= file_mtime <= end_timestamp and '.xls' in file.filename.lower():
            save_path = os.path.join(save_dir, file.filename)
            sftp.get(os.path.join(FTP_CONFIG['receive_file_path'], file.filename), save_path)
            break

    sftp.close()
    return save_path
```
