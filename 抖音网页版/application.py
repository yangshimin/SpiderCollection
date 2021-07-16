# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 07/16/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import random
import re
import sys
import json
import logging

import requests
from urllib.parse import urlparse

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class WebDouYin(object):
    DEFAULT_HEADERS = {
        "authority": "www.douyin.com",
        "method": "GET",
        "scheme": "https",
        "accept": "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "referer": "https://www.douyin.com/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/91.0.4472.124 Safari/537.36",
        "withcredentials": "true",
    }

    def __init__(self):
        self.s = requests.Session()

    def get_all_video(self):
        """返回所有视频信息"""
        all_video_encrypt_params = {
            "url": "/aweme/v1/web/channel/feed/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "withCredentials": True
            },
            "params": {
                "device_platform": "webapp",
                "aid": 6383,
                "channel": "channel_pc_web",
                "tag_id": "",
                "count": 10,
                "version_code": "160100",
                "version_name": "16.1.0",
                "cookie_enabled": True,
                "screen_width": 1920,
                "screen_height": 1080,
                "browser_language": "zh-CN",
                "browser_platform": "Win32",
                "browser_name": "Mozilla",
                "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                                   "Chrome/91.0.4472.124 Safari/537.36",
                "browser_online": True
            },
            "baseURL": "",
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1
        }

