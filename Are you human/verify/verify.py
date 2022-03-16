# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 03/16/22
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : verify.py
# @Software: PyCharm
import re
import time
import json
import logging
import execjs
import requests


logging.getLogger("main")


class Verify(object):

    def __init__(self, url):
        self.s = requests.Session()
        self.block_page_url = url
        self.base_timestamp = int(time.time() * 1000)
        self.uuid = self.get_uuid()
        self.tag = "v7.2.4"
        self.ftag = "245"
        self.app_id = 'PXnp9B16Cq'

    @staticmethod
    def execute_javascript(js_code, call_params):
        ctx = execjs.compile(js_code)
        return ctx.call(call_params['call_name'], call_params['call_arguments'])

    def get_uuid(self):
        uuid_pattern = re.search(r'uuid=(.*?)&?', self.block_page_url)
        if not uuid_pattern:
            raise Exception("解析uuid失败")
        return uuid_pattern.group(1)

    def get_captcha_page(self):
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.walmart.ca",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.51 Safari/537.36",
        }

        res = self.s.get(self.block_page_url, headers=headers)
        if res.status_code == 200:
            logging.info("请求验证码页面成功")
        else:
            logging.error("请求验证码页面失败")

    def request_buddle1(self):
        default_post_data = [{
            "t": "PX10816",
            "d": {
                "PX10041": None,
                "PX10088": True,
                "PX10094": self.base_timestamp,
                "PX10206": self.uuid,
                "PX10987": None,
                "PX10970": 3600,
                "PX11004": self.base_timestamp + 3,
                "PX10360": self.block_page_url,
                "PX10929": 0,
                "PX11186": "Win32",
                "PX10622": 0,
                "PX11031": "PX10463",
                "PX11073": False,
                "PX10384": "pxhc",
                "PX10272": 3211   # 该对象表示从某一时刻（某一时刻通常是 navigationStart 事件发生时刻）到调用该方法时刻的毫秒数。
            },
        }]
        js_code = open("pc.js").read()
        pc_value = self.execute_javascript(js_code, {
            "call_name": "qn",
            "call_arguments": (json.dumps(default_post_data), ":".join([self.uuid, self.tag, self.ftag]))
        })
        payload_value = self.execute_javascript(js_code, {
            "call_name": "xp",
            "call_arguments": (default_post_data, {
                    "vid": "",
                    "tag": self.tag,
                    "appID": self.app_id,
                    "cu": self.uuid,
                    "cs": None,
                    "pc": pc_value
                }, self.uuid)
        })

