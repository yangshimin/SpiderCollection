# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 09/14/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import logging
import sys

import requests


formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Application(object):

    def __init__(self):
        self.s = requests.Session()

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
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/93.0.4577.63 Safari/537.36",
        }

        res = self.s.get(url, headers=headers)
        if res.status_code in [200, 202]:
            logging.info("请求公告通告首页成功")
        else:
            logging.error("请求公告通告首页失败")


if __name__ == "__main__":
    app = Application()
    app.get_index()
