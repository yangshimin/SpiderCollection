# !/usr/bin/python3
# -*- coding: utf-8 -*-
import json
import logging
import time
from urllib.parse import urlparse

import requests

from abck import AbckCookie

session = requests.Session()
client_id = None
client_secret = None


class Fedex(object):

    def __init__(self):
        self.client_id = None
        self.client_secret = None
        self.session = requests.Session()
        self.get_index()
        self.abck = AbckCookie(self.session)

    def get_index(self):
        url = "https://www.fedex.com/zh-cn/home.html"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.fedex.com",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/101.0.4951.41 Safari/537.36",
        }

        res = self.session.get(url, headers=headers)
        if res.status_code == 200:
            logging.info("請求首頁成功")

    def fedex_init(self):
        self.session = self.abck.fedex_init()

    def get_params(self):
        url = "https://www.fedex.com/etc/services/getapigconfigs.jsonp"
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.fedex.com",
            "Pragma": "no-cache",
            "Referer": "https://www.fedex.com/en-cn/home.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/98.0.4758.82 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest",
        }

        res = session.get(url, headers=headers)
        if res.status_code == 200:
            logging.info("请求clientId和clientSecret成功")
            json_data = res.json()
            self.client_id = json_data['clientID']
            self.client_secret = json_data['clientSecret']
            return res.json()
        else:
            logging.error("请求clientId和clientSecret失败")

    def get_query_config(self):
        url = "https://www.fedex.com/wtrk/trackingmodule_hp/HomepageWebComponent/properties/" \
              "HomepageProperties.json?_=-1651680000"
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.fedex.com",
            "Pragma": "no-cache",
            "Referer": "https://www.fedex.com/en-cn/home.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/98.0.4758.82 Safari/537.36",
        }

        res = session.get(url, headers=headers)
        if res.status_code == 200:
            logging.info("请求查询 config 信息成功")
            return res.json()
        else:
            logging.error("请求查询config信息失败")

    def get_token(self, data):
        url = "https://api.fedex.com/auth/oauth/v2/token"

        headers = {
            "authority": "api.fedex.com",
            "method": "POST",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "content-length": "0",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://www.fedex.com",
            "pragma": "no-cache",
            "referer": "https://www.fedex.com/en-cn/home.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/98.0.4758.82 Safari/537.36",
        }
        res = session.post(url, data=data, headers=headers)
        if res.status_code == 200:
            logging.info("请求token成功")
            json_data = res.json()
            return f"{json_data['token_type']} {json_data['access_token']}"
        else:
            logging.error("请求index token失败")

    def get_query_token(self, query_config_info):
        data = {
            "client_id": query_config_info["api"]["client_id"],
            "client_secret": query_config_info["api"]["client_secret"],
            "grant_type": "client_credentials",
            "scope": "oob",
        }
        return self.get_token(data)

    def login(self):
        url = f"https://api.fedex.com/user/v2/login"
        headers = {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Authorization": "Bearer " + self.client_id,
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Host": "api.fedex.com",
            "Origin": "https://www.fedex.com",
            "Pragma": "no-cache",
            "Referer": "https://www.fedex.com/zh-cn/home.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/101.0.4951.41 Safari/537.36",
            "X-clientid": "WCDO",
            "X-locale": "en_US",
            "X-loggedin": "true",
            "X-version": "1.0",
        }
        params = {
            "_": int(time.time())
        }

        res = self.session.get(url, json=params, headers=headers)
        print(f"login 设置_abck: {self.session.cookies.get_dict()['_abck']}")

    def get_abck_cookie(self):
        self.session = self.abck.valid_sensor_data(self.session.cookies.get_dict()['_abck'])
        self.login()

    def query(self, token, track_number_list):
        url = "https://api.fedex.com/track/v2/shipments"
        headers = {
            "authority": "api.fedex.com",
            "method": "POST",
            "path": "/track/v2/shipments",
            "scheme": "https",
            "accept": "application/json",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "authorization": token,
            "cache-control": "no-cache",
            "content-type": "application/json",
            "origin": "https://www.fedex.com",
            "pragma": "no-cache",
            "referer": "https://www.fedex.com/zh-cn/home.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/101.0.4951.41 Safari/537.36",
            # "x-clientid": "WTRK",
            # "x-locale": "zh_CN",
            "x-requested-with": "XMLHttpRequest",
            # "x-version": "1.0.0",
        }

        for track_number in track_number_list:
            query_data = {
                "appDeviceType": "WTRK",
                "appType": "WTRK",
                "supportCurrentLocation": "true",
                "trackingInfo": [
                    {"trackNumberInfo": {"trackingCarrier": "", "trackingNumber": track_number, "trackingQualifier": ""}}
                ],
                "uniqueKey": "",
            }
            self.get_abck_cookie()
            res = requests.post(url, data=json.dumps(query_data).replace(" ", ""), headers=headers,
                                cookies={"_abck": self.session.cookies.get_dict()['_abck']})
            if res.status_code == 200:
                logging.info("查询成功")
                print(res.json())
            else:
                logging.error(f"查询失败: {res.status_code}")


if __name__ == "__main__":
    fedex = Fedex()
    fedex.fedex_init()
    client_info = fedex.get_params()
    token = fedex.get_query_token(fedex.get_query_config())
    track_number_list = ["272506268384"]
    fedex.query(token, track_number_list)


