# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 09/14/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import copy
import re
import logging
import sys
from urllib.parse import urljoin

from lxml.html import etree
import requests


formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Application(object):

    def __init__(self):
        self.s = requests.Session()

    @staticmethod
    def get_lxml_obj(html):
        lxml_obj = etree.HTML(html)
        return lxml_obj

    def get_index(self):
        """公告通告"""
        url = "https://www.nmpa.gov.cn/xxgk/ggtg/index.html"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.nmpa.gov.cn",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
        }

        res = self.s.get(url, headers=headers)
        if res.status_code in [200, 202]:
            logging.info("请求公告通告首页成功")
            with open("first_index.html", 'wb') as f:
                f.write(res.content)
                logging.info("保存第一次请求的html成功")

            page_lxml = self.get_lxml_obj(res.text)
            first_script_src_selector = page_lxml.xpath(".//*/script[1]/@src")
            execute_script_selector = page_lxml.xpath(".//head/script/text()")
            if not first_script_src_selector:
                raise Exception("解析第一次请求的第一个script标签的src链接失败")
            else:
                first_script_src = first_script_src_selector[0]

            if not execute_script_selector:
                raise Exception("解析head标签下最后一个script的自执行函数失败")
            else:
                execute_script = execute_script_selector[-1]
            return first_script_src, execute_script
        else:
            logging.error("请求公告通告首页失败")

    def save_first_script(self, url):
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.nmpa.gov.cn",
            "Pragma": "no-cache",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
        }

        script_res = self.s.get(url, headers=headers)
        if script_res.status_code == 200:
            with open("first_script.js", 'w', encoding='utf-8') as f:
                f.write(script_res.text)
                logging.info("保存script文件成功")
        else:
            logging.error("请求script文件失败")

    def get_gmp_cookie(self, code):
        url = "http://127.0.0.1:8090/cookie"

        session_cookie = self.s.cookies.get_dict()
        cookie = ""
        for name, value in session_cookie.items():
            cookie += f"{name}={value}; "
        cookie = cookie.rsplit(";", 1)[0]
        data = {
            "code": code,
            "cookie": cookie
        }
        res = requests.post(url, data=data)
        if res.status_code == 200:
            cookie_info = res.text.split(";", 1)[0].strip().split("=")
            return {cookie_info[0]: cookie_info[1]}

    @staticmethod
    def check(cookie):
        # 公告通告url
        url = "https://www.nmpa.gov.cn/xxgk/ggtg/index.html"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.nmpa.gov.cn",
            "Pragma": "no-cache",
            "Referer": "https://www.nmpa.gov.cn/xxgk/ggtg/index.html",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:92.0) Gecko/20100101 Firefox/92.0",
        }
        res = requests.get(url, headers=headers, cookies=cookie)
        if res.status_code == 200:
            res.encoding = "utf-8"
            print(res.text)

    def scheduler(self):
        script_src, execute_script = self.get_index()
        script_url = urljoin("https://www.nmpa.gov.cn", script_src)
        self.save_first_script(script_url)

        cookie = self.get_gmp_cookie(execute_script)
        cookie_dict = copy.deepcopy(self.s.cookies.get_dict())
        cookie_dict.update(cookie)
        self.check(cookie_dict)



if __name__ == "__main__":
    app = Application()
    app.scheduler()
