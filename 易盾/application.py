# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 12/17/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import os
import re
import sys
import logging
from urllib.parse import urljoin, urlparse

import requests


formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Application(object):

    def __init__(self):
        self.domain = "https://dun.163.com"
        self.static_dir = os.path.join(os.getcwd(), 'static')
        self.session = requests.Session()
        self.create_static()

    def create_static(self):
        if not os.path.exists(self.static_dir):
            os.makedirs(self.static_dir)

    def get_index(self):
        """请求demo使用页面得到captchaId"""
        url = "https://dun.163.com/trial/jigsaw"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,"
                      "image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "dun.163.com",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/96.0.4664.110 Safari/537.36",
        }

        res = self.session.get(url=url, headers=headers)
        if res.status_code == 200:
            logging.info("请求demo页面成功")
            load_min_js_pattern = re.search(r'src="(.*?load.min.js)"', res.text)
            captcha_drag_pattern = re.search(r'src="(.*?pt_experience_captcha_drag.*?)"', res.text)
            if captcha_drag_pattern and load_min_js_pattern:
                load_min_js_url = load_min_js_pattern.group(1)
                pt_experience_captcha_drag_js_url = urljoin(self.domain, captcha_drag_pattern.group(1))
                return load_min_js_url, pt_experience_captcha_drag_js_url
            else:
                logging.error("请求pt_experience_captcha_drag_js文件失败")
        else:
            logging.error(f"请求demo页面状态码异常: {res.status_code}")

    def save_download_file(self, url, file_name):
        if not url:
            return
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": urlparse(url).netloc,
            "Pragma": "no-cache",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/96.0.4664.110 Safari/537.36",
        }

        download_res = self.session.get(url, headers=headers)
        if download_res.status_code == 200:
            logging.info("请求下载文件成功")

            file_path = os.path.join(self.static_dir, file_name)
            with open(file_path, 'w', encoding="utf-8") as f:
                f.write(download_res.text)
                logging.info(f"保存下载文件成功: {file_path}")
            return file_path
        else:
            logging.error("请求下载文件失败")

    @staticmethod
    def get_captcha_id(file):
        if not os.path.exists(file):
            return
        file_content = open(file, 'r', encoding="utf-8").read()
        pattern = re.search(r'captchaId:"(.*?)",', file_content)
        if pattern:
            captcha_id = pattern.group(1)
            return captcha_id
        else:
            logging.error("解析captcha_id失败")

    def scheduler(self):
        load_min_js_url, pt_experience_captcha_drag_js_url = self.get_index()
        load_min_js = self.save_download_file(load_min_js_url, "load_min.js")
        pt_experience_captcha_drag_js_file = self.save_download_file(pt_experience_captcha_drag_js_url,
                                                                     "captcha_drag_js.js")
        captcha_id = self.get_captcha_id(pt_experience_captcha_drag_js_file)
        print(captcha_id)


if __name__ == "__main__":
    app = Application()
    app.scheduler()
