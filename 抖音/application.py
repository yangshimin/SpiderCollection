# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 02/24/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import random
import re
import sys
import json
import logging

import execjs
import requests
from urllib.parse import urlparse

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class DouYin(object):

    def __init__(self, share_url):
        # https://v.douyin.com/e1Xk3Nq/

        self.index_js_url = None
        self.config_info = None
        self.s = requests.Session()
        self.share_url = share_url

    def get_share_url_response(self):
        """
        返回重定向的url进行解析
        :return:
        """
        headers = {
            "authority": "v.douyin.com",
            "method": "GET",
            "path": urlparse(self.share_url).path,
            "scheme": "https",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36"
                          " (KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36",
        }

        res = self.s.get(self.share_url, headers=headers)
        if res.status_code == 200:
            js_url_pattern = re.search(r'></script><script type="text/javascript" '
                                       r'src="(https://(.*?).pstatp.com/ies/fe_app_new/pages/'
                                       r'reflow_user/index(.*?)js)"></script>',
                                       res.text)
            if js_url_pattern:
                self.index_js_url = js_url_pattern.group(1)
            return res.url
        else:
            logging.error("请求分享页面失败")

    @staticmethod
    def parse_redirect_url(redirect_url):
        """解析必要的参数 后面可能会用到"""
        # user_id
        user_id_pattern = re.search(r"/user/(\d+)\?", redirect_url)
        if not user_id_pattern:
            raise Exception("解析user_id失败")
        user_id = user_id_pattern.group(1)

        # iid
        iid_pattern = re.search(r'iid=(\d+)&', redirect_url)
        if not iid_pattern:
            raise Exception("解析iid失败")
        iid = iid_pattern.group(1)

        # sec_uid
        sec_uid_pattern = re.search(r'sec_uid=(.*?)&', redirect_url)
        if not sec_uid_pattern:
            raise Exception("解析sec_uid失败")
        sec_uid = sec_uid_pattern.group(1)

        # u_code
        u_code_pattern = re.search(r'u_code=(.*?)&', redirect_url)
        if not u_code_pattern:
            raise Exception("解析u_code失败")
        u_code = u_code_pattern.group(1)

        # did
        did_pattern = re.search(r'did=(.*?)&', redirect_url)
        if not did_pattern:
            raise Exception("解析did失败")
        did = did_pattern.group(1)

        config_info = {
            "user_id": user_id,
            "iid": iid,
            "sec_uid": sec_uid,
            "u_code": u_code,
            "did": did
        }
        return config_info

    def get_sign(self):
        """返回签名"""
        js_path = "node_douyin_signature.js"
        ctx = execjs.compile(open(js_path, 'r', encoding="utf-8").read())
        signature = ctx.call("res", self.config_info["user_id"])
        return signature

    def get_aid(self):
        aid_headers = {
            "authority": "sf1-scmcdn2-tos.pstatp.com",
            "method": "GET",
            "path": urlparse(self.index_js_url).path,
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.iesdouyin.com/",
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36",
        }

        res = self.s.get(self.index_js_url, headers=aid_headers)
        if res.status_code == 200:
            aid_pattern = re.search(r"aid: (\d+)", res.text)
            if aid_pattern:
                return aid_pattern.group(1)

    def parse_user_info(self, redirect_url):
        sec_uid = self.config_info.get('sec_uid')
        if not sec_uid:
            raise Exception("获取sec_uid失败")
        user_info_url = f'https://www.iesdouyin.com/web/api/v2/user/info/?sec_uid={sec_uid}'
        user_info_headers = {
            "authority": "www.iesdouyin.com",
            "method": "GET",
            "path": urlparse(user_info_url).path,
            "scheme": "https",
            "accept": "application/json",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": redirect_url,
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
        }

        user_info_res = self.s.get(user_info_url, headers=user_info_headers)
        if user_info_res.status_code == 200:
            user_infos = user_info_res.json()
            items = dict()

            user_info = user_infos.get("user_info", {})
            # 作品数
            items["post_total"] = user_info.get("aweme_count")
            # 喜欢的视频数
            items["like_total"] = user_info.get("favoriting_count")
            # 粉丝数
            items["follower_count"] = user_info.get("follower_count")
            # 关注数
            items["following_count"] = user_info.get("following_count")
            # 点赞数
            items["total_favorited"] = user_info.get("total_favorited")
            # 昵称
            items["name"] = user_info.get("nickname")
            # 简介
            items["desc"] = user_info.get("signature")
            # 抖音id
            items["unique_id"] = user_info.get("unique_id")
            print(items)
            return items
        else:
            logging.error("解析用户信息失败")

    def parse_video_info(self, redirect_url, video_contains=None, cursor=0):
        """返回视频信息"""
        if video_contains is None:
            video_contains = []
        video_info_url = f"https://www.iesdouyin.com/web/api/v2/aweme/post/?sec_uid={self.config_info['sec_uid']}&" \
                         f"count=21&max_cursor={cursor}&aid={self.get_aid()}&_signature={self.get_sign()}"

        headers = {
            "authority": "www.iesdouyin.com",
            "method": "GET",
            "path": urlparse(video_info_url).path,
            "scheme": "https",
            "accept": "application/json",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": redirect_url,
            "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36",
            "x-requested-with": "XMLHttpRequest",
        }
        res = self.s.get(video_info_url, headers=headers)
        if res.status_code == 200:
            logging.info("解析视频信息成功")
            video_infos = res.json()

            video_info_list = video_infos.get("aweme_list", {})
            for video_info in video_info_list:
                item = dict()

                item["author"] = video_info.get("author", {}).get("nickname")
                item["desc"] = video_info.get("desc")

                statistics = video_info.get("statistics", {})
                item["comment_count"] = statistics.get("comment_count", 0)
                # 点赞数
                item["digg_count"] = statistics.get("digg_count", 0)
                item["forward_count"] = statistics.get("forward_count", 0)
                item["play_count"] = statistics.get("play_count", 0)
                item["share_count"] = statistics.get("share_count", 0)

                video = video_info.get("video", {})
                item["video_ratio"] = video.get("ratio")
                item["video_duration"] = video.get("duration")
                item["video_download_url"] = random.choice(video.get("download_addr", {}).get("url_list", []))
                video_contains.append(item)

            # 翻页
            max_cursor = video_infos.get("max_cursor", 0)
            now_cursor = video_infos.get("extra", {}).get("now")
            has_more = video_infos.get("has_more", False)
            if now_cursor > max_cursor and has_more:
                self.parse_video_info(redirect_url, video_contains, max_cursor)
            else:
                return video_contains

    def start(self):
        redirect_url = self.get_share_url_response()
        self.config_info = self.parse_redirect_url(redirect_url)
        user_info = self.parse_user_info(redirect_url)
        video_info = self.parse_video_info(redirect_url)
        print(video_info)


if __name__ == "__main__":
    url = "https://v.douyin.com/e17CU77/"
    douyin = DouYin(url)
    douyin.start()
