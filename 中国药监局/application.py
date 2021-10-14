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

    def extract_javascript(self, page_html):
        page_lxml = self.get_lxml_obj(page_html)
        first_script_src_selector = page_lxml.xpath(".//*/script[1]/@src")
        execute_script_selector = page_lxml.xpath(".//head/script[2]/text()")
        if not first_script_src_selector:
            raise Exception("解析第一次请求的第一个script标签的src链接失败")
        else:
            first_script_src = first_script_src_selector[0]

        if not execute_script_selector:
            raise Exception("解析head标签下最后一个script的自执行函数失败")
        else:
            execute_script = execute_script_selector[-1]
        return first_script_src, execute_script

    def get_page(self, page_url):
        """公告通告"""
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

        res = self.s.get(page_url, headers=headers)
        if res.status_code in [200, 202]:
            logging.info("请求页面第一次成功")
            with open("first_index.html", 'wb') as f:
                f.write(res.content)
                logging.info("保存第一次请求的html成功")

            page_lxml = self.get_lxml_obj(res.text)
            script_selectors = page_lxml.xpath("//script[@r='m']/text()")
            if len(script_selectors) >= 3:
                script_text = script_selectors[-2] + "\n" + script_selectors[-1]
                if script_text.strip():
                    with open("1.js", "w", encoding="utf-8") as f:
                        f.write(script_text)
                        logging.info("写0号js文件成功")
                else:
                    logging.error("提取0号js文件内容失败")

            return self.extract_javascript(res.text)
        else:
            logging.error("请求页面第一次失败")

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

    def get_gmp_cookie(self, code, cookie_str=None):
        url = "http://127.0.0.1:8090/cookie"

        if not cookie_str:
            session_cookie = self.s.cookies.get_dict()
        else:
            session_cookie = cookie_str
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
            cookie_value_pattern = re.search("neCYtZEjo8GmP=(.*?);", res.text)
            if not cookie_value_pattern:
                raise Exception("正則匹配cookie失敗")
            return {"neCYtZEjo8GmP": cookie_value_pattern.group(1)}

    def generate_cookie(self, page_url_or_response_text, cookie_str=None):
        if page_url_or_response_text.startswith("https://www.nmpa.gov.cn"):
            script_src, execute_script = self.get_page(page_url_or_response_text)
        else:
            script_src, execute_script = self.extract_javascript(page_url_or_response_text)
        script_url = urljoin("https://www.nmpa.gov.cn", script_src)
        self.save_first_script(script_url)

        cookie = self.get_gmp_cookie(execute_script, cookie_str)
        cookie_dict = copy.deepcopy(self.s.cookies.get_dict())
        cookie_dict.update(cookie)
        return cookie_dict

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
            with open("first_index.html", 'wb') as f:
                f.write(res.content)
                logging.info("保存首页请求的html成功")
            return res.text
        else:
            raise Exception("请求首页html失败")

    @staticmethod
    def check_detail_page(cookie):
        url = "https://www.nmpa.gov.cn/xxgk/ggtg/qtggtg/20210930161420143.html"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.nmpa.gov.cn",
            "Referer": "https://www.nmpa.gov.cn/xxgk/ggtg/index.html",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/94.0.4606.71 Safari/537.36",
        }

        page_detail_res = requests.get(url, headers=headers, cookies=cookie)
        if page_detail_res.status_code == 200:
            page_detail_res.encoding = "utf-8"
            print(page_detail_res.text)
            return page_detail_res.text
        else:
            raise Exception("请求详情页失败")


    def scheduler(self):
        cookie_dict = self.generate_cookie("https://www.nmpa.gov.cn/xxgk/ggtg/index.html")
        page_html = self.check(cookie_dict)
        new_cookie_dict = self.generate_cookie(page_html, cookie_dict)

        page_detail_cookie_dict = self.generate_cookie("https://www.nmpa.gov.cn/xxgk/ggtg/qtggtg/20210930161420143.html",
                                                       cookie_str=new_cookie_dict)
        page_detail_html = self.check_detail_page(page_detail_cookie_dict)
        new_cookie_dict = self.generate_cookie(page_detail_html, page_detail_cookie_dict)

        page_detail_cookie_dict = self.generate_cookie(
            "http://www.ccgp.gov.cn/cggg/zygg/gkzb/202109/t20210930_16966761.htm",
            cookie_str=new_cookie_dict)
        page_detail_html = self.check_detail_page(page_detail_cookie_dict)
        new_cookie_dict = self.generate_cookie(page_detail_html, page_detail_cookie_dict)




if __name__ == "__main__":
    app = Application()
    app.scheduler()
