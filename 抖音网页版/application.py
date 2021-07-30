# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 07/16/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import copy
import random
import re
import sys
import json
import logging
import time

import requests
from lxml import etree
from urllib.parse import urlparse, unquote, urljoin

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
                      "Chrome/92.0.4515.107 Safari/537.36",
        "withcredentials": 'true',
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
                          "Chrome/92.0.4515.107 Safari/537.36",
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

            with open('douyin.html', 'wb') as f:
                f.write(index_res.content)
                logging.info("写入index成功")

            page_lxml_obj = etree.HTML(index_res.text)
            selector = page_lxml_obj.xpath(".//*/script[@id='RENDER_DATA']/text()")
            if selector:
                logging.info('解析render_data成功')
                render_json_data = json.loads(unquote(selector[0]))
                return render_json_data.get("C_0", {}).get("odin")
        else:
            logging.error("请求首页失败")

    def get_sdk_setting(self):
        url = "https://i.snssdk.com/slardar/sdk_setting?bid=douyin_website"
        headers = {
            "authority": "i.snssdk.com",
            "method": "GET",
            "path": "/slardar/sdk_setting?bid=douyin_website",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "origin": "https://www.douyin.com",
            "referer": "https://www.douyin.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/92.0.4515.107 Safari/537.36",
        }
        res = self.s.get(url, headers=headers)
        if res.status_code == 200:
            logging.info("请求sdk setting成功")
            return res.json()['data']['cookieid']
        else:
            logging.error("请求sdk setting失败")

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
                          "Chrome/92.0.4515.107 Safari/537.36",
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

    def get_web_id(self):
        url = "https://mcs.snssdk.com/v1/user/webid"
        data = {
            "app_id": 6383,
            "url": "https://www.douyin.com/",
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36",
            "referer": "",
            "user_unique_id": ""
        }
        headers = {
            "authority": "mcs.snssdk.com",
            "method": "POST",
            "path": "/v1/user/webid",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "content-type": "application/json; charset=UTF-8",
            "origin": "https://www.douyin.com",
            "referer": "https://www.douyin.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/92.0.4515.107 Safari/537.36",
        }
        res = self.s.post(url, json=data, headers=headers)
        if res.status_code == 200:
            logging.info("获取web id 成功")
            return res.text
        else:
            logging.error("获取web id 失败")

    def post_ssid(self, web_id, user_unique_id):
        url = "https://mcs.snssdk.com/v1/user/ssid"
        data = {
            "app_id": 6383,
            "web_id": web_id,
            "user_unique_id": user_unique_id
        }
        headers = {
            "authority": "mcs.snssdk.com",
            "method": "POST",
            "path": "/v1/user/ssid",
            "scheme": "https",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Connection": "keep-alive",
            "Content-Type": "application/json; charset=UTF-8",
            "Host": "mcs.snssdk.com",
            "Origin": "https://www.douyin.com",
            "Referer": "https://www.douyin.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/92.0.4515.107 Safari/537.36",
        }

        res = self.s.post(url, data=json.dumps(data), headers=headers)
        if res.status_code == 200:
            logging.info("post render info 成功")
            return res.json()
        else:
            logging.error("post render info 失败")

    def get_qrcode(self):
        url = "https://sso.douyin.com/get_qrcode"
        params = {
            "service": "https://www.douyin.com/",
            "need_logo": "false",
            "aid": "6383",
        }
        headers = {
            "authority": "sso.douyin.com",
            "method": "GET",
            "path": urlparse(url).path,
            "scheme": "https",
            "accept": "application/json, text/javascript",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://www.douyin.com",
            "referer": "https://www.douyin.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/92.0.4515.107 Safari/537.36",
            "x-tt-passport-csrf-token": ""
        }

        res = self.s.get(url, params=json.dumps(params), headers=headers)
        if res.status_code == 200:
            logging.info("请求qrcode 成功")
            return res.json()
        else:
            logging.error("请求qrcode 失败")

    def get_signature(self, params):
        data = {"params": json.dumps(params)}
        res = self.s.post("http://127.0.0.1:8090/get_sign_params", data=data)
        if res.status_code == 200 and re.search("_signature=(.*)", res.text):
            return res.text

    def get_all_video(self):
        """请求首页视频信息"""
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
            "browser_version": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                               "Chrome/92.0.4515.107 Safari/537.36",
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
        url_params_with_signature = self.get_signature(all_video_encrypt_params)
        url = f"https://www.douyin.com"
        headers = copy.deepcopy(self.DEFAULT_HEADERS)
        headers['path'] = urlparse(url).path
        time.sleep(3)
        res = self.s.get(urljoin(url, url_params_with_signature), headers=headers)
        if res.status_code == 200:
            json_data = res.json()
            if json_data.get("status_code") == 0:
                logging.info("请求首页视频数据成功")
                return json_data

    def get_user_video(self, user_name, offset=0, data_constain=[]):
        # 如果没有登录 貌似只能请求36条数据
        """
        请求某个人的视频信息
        :param user_name:
        :param offset:
        :return:
        """
        user_video_params = {
            "device_platform": "webapp",
            "aid": "6383",
            "channel": "channel_pc_web",
            "search_channel": "aweme_video_web",
            "sort_type": "0",
            "publish_time": "0",
            "keyword": user_name,
            "search_source": "search_sug",
            "query_correct_type": "1",
            "is_filter_search": "0",
            "offset": str(offset),
            "count": "24",
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
        user_video_data = {
            "url": "/aweme/v1/web/search/item/",
            "method": "get",
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "withCredentials": True
            },
            "params": user_video_params,
            "baseURL": "",
            "transformRequest": [None],
            "transformResponse": [None],
            "timeout": 0,
            "xsrfCookieName": "XSRF-TOKEN",
            "xsrfHeaderName": "X-XSRF-TOKEN",
            "maxContentLength": -1,
            "maxBodyLength": -1
        }

        url_params_with_signature = self.get_signature(user_video_data)
        url = urljoin("https://www.douyin.com", url_params_with_signature)
        headers = copy.deepcopy(self.DEFAULT_HEADERS)
        headers['path'] = urlparse(url).path
        time.sleep(3)
        res = self.s.get(url, headers=headers)
        if res.status_code == 200:
            json_data = res.json()
            if json_data.get("status_code") == 0:
                offset = json_data["cursor"]
                page, _remain = divmod(offset, 21)
                logging.info(f"请求视频数据成功, 第{page + 1 if _remain > 0 else page}页: {user_name}")
                data_constain.extend(json_data.get("data"))

                # 翻页
                has_more = json_data.get("has_more")
                if has_more:
                    self.get_user_video(user_name, offset, data_constain)
                else:
                    return data_constain
        else:
            logging.error(f"请求用户的视频信息失败: {user_name}")


if __name__ == "__main__":
    app = WebDouYin()
    render_data = app.get_index()
    sdk_setting_info = app.get_sdk_setting()
    print(f"sdk setting info: {sdk_setting_info}")
    web_id_info = app.get_web_id()
    print(f"web id info: {web_id_info}")
    ssid_info = app.post_ssid(json.loads(web_id_info)['web_id'], render_data['user_unique_id'])
    print(f"sdk info: {ssid_info}")
    # qrcode_info = app.get_qrcode()
    # print(f"qrcode info: {qrcode_info}")
    if app.need_verify and app.verify_data:
        logging.warning("出现了验证码")
        slide_info = app.get_slide_verify_info()

    # index_video = app.get_all_video()
    user_video = app.get_user_video("古道说剧", data_constain=[])
    print(user_video)
