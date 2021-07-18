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
import time

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
        self.need_verify = None
        self.verify_data = None
        self.s = requests.Session()

    def get_index(self):
        index_url = "https://www.douyin.com"
        index_headers = {
            "authority": "www.douyin.com",
            "method": "GET",
            "path": "/",
            "scheme": "https",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "max-age=0",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }
        index_res = self.s.get(index_url, headers=index_headers)
        if index_res.status_code == 200:
            index_res.encoding = "utf-8"
            logging.info("请求首页成功")
            if "验证码中间页" in index_res.text:
                self.need_verify = True
                verify_data_pattern = re.search("const verify_data = ({.*?})", index_res.text)
                if verify_data_pattern:
                    self.verify_data = json.loads(verify_data_pattern.group(1))
                    logging.info("解析verify_data成功")
        else:
            logging.error("请求首页失败")

    def get_slide_verify_info(self):
        slide_info_url = 'https://verify.snssdk.com/captcha/get'
        params = {
            "lang": "zh",
            "app_name": "",
            "h5_sdk_version": "2.20.0",
            "sdk_version": "",
            "iid": 0,
            "did": 0,
            "device_id": 0,
            "ch": "web_text",
            "aid": "6383",
            "os_type": "2",
            "mode": "",
            "tmp": int(time.time() * 1000),
            "platform": "pc",
            "webdriver": False,
            "fp": self.verify_data['fp'],
            "type": "verify",
            "detail": self.verify_data['detail'],
            "subtype": "slide",
            "challenge_code": "3058",
            "os_name": "windows",
            "h5_check_version": "3.2.0",
        }
        headers = {
            "authority": "verify.snssdk.com",
            "method": "GET",
            "scheme": "https",
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "origin": "https://www.douyin.com",
            "referer": "https://www.douyin.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }

        slide_info_res = self.s.get(slide_info_url, params=params, headers=headers)
        if slide_info_res.status_code == 200:
            slide_info_res.encoding = "utf-8"
            logging.info("请求滑动验证码信息成功")
            return json.loads(slide_info_res.text)
        else:
            logging.error("请求滑动验证码信息失败")

    def generate_slide_data(self):
        pass

    def get_signature(self, params):
        data = {"params": json.dumps(params)}
        res = self.s.post("http://127.0.0.1:8090/get_sign_params", data=data)
        if res.status_code == 200:
            signature_pattern = re.search("_signature=(.*)", res.text)
            if signature_pattern:
                logging.info("得到signature成功")
                return signature_pattern.group(1)
            else:
                logging.error("正则匹配signature失败")

    def get_all_video(self):
        """返回所有视频信息"""
        data = {
            "device_platform": "webapp",
            "aid": "6383",
            "channel": "channel_pc_web",
            "tag_id": "",
            "count": "10",
            "version_code": "160100",
            "version_name": "16.1.0",
            "cookie_enabled": "true",
            "screen_width": "1920",
            "screen_height": "1080",
            "browser_language": "zh-CN",
            "browser_platform": "Win32",
            "browser_name": "Mozilla",
            "browser_version": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                               "Chrome/91.0.4472.164 Safari/537.36",
            "browser_online": "true",
        }
        all_video_encrypt_params = {
            "url": "/aweme/v1/web/channel/feed/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "withCredentials": True
            },
            "params": data,
            "baseURL": "",
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1
        }
        signature = self.get_signature(all_video_encrypt_params)
        data.update({"_signature": signature})
        url = "https://www.douyin.com/aweme/v1/web/channel/feed/"
        res = self.s.get(url, data=data, headers=self.DEFAULT_HEADERS)
        if res.status_code == 200:
            pass


if __name__ == "__main__":
    app = WebDouYin()
    app.get_index()
    if app.need_verify and app.verify_data:
        slide_info = app.get_slide_verify_info()
    app.get_all_video()
