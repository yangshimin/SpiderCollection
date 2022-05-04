# !/usr/bin/python3
# -*- coding: utf-8 -*-
import json
import logging
import time
from urllib.parse import urlparse

import requests

from abck import AbckCookie

session = requests.Session()


def get_params():
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
        return res.json()
    else:
        logging.error("请求clientId和clientSecret失败")


def get_token(data):
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


def get_query_config():
    url = "https://www.fedex.com/wtrk/trackingmodule_hp/HomepageWebComponent/properties/HomepageProperties.json?_=-1644768000"
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


def get_query_token(query_config_info):
    data = {
        "client_id": query_config_info["api"]["client_id"],
        "client_secret": query_config_info["api"]["client_secret"],
        "grant_type": "client_credentials",
        "scope": "oob",
    }
    return get_token(data)


def get_abck_cookie(s):
    abck = AbckCookie(s)
    s = abck.valid_sensor_data()
    return s


def query(token, track_number_list):
    url = "https://api.fedex.com/track/v2/shipments"
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
            "referer": "https://www.fedex.com/en-cn/home.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/98.0.4758.82 Safari/537.36",
            "x-clientid": "WTRK",
            "x-locale": "en_CN",
            "x-requested-with": "XMLHttpRequest",
            "x-version": "1.0.0",
        }
        s = get_abck_cookie(session)
        res = s.post(url, data=json.dumps(query_data), headers=headers)
        if res.status_code == 200:
            logging.info("查询成功")
            print(res.json())
        else:
            logging.error("查询失败")


if __name__ == "__main__":
    client_info = get_params()
    query_config_info = get_query_config()
    token = get_query_token(query_config_info)
    track_number_list = ["272506268384", "776636797161", "576544931211", "642021603463", "271958755482"]
    query(token, track_number_list)


