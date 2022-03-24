# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 03/21/22
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import base64

import ddddocr
import json
import cv2
import os
import re
import time
import sys
import random
import logging
import requests
from retrying import retry
from urllib.parse import urlparse

from config import IMAGE_DIR
from track import get_track, get_click_track
from chinese_select.yolo.mode_one import generate_click_points, run_click
from public_func import get_md5, resize_img_keep_ratio

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class JiYanTextSelect(object):

    def __init__(self, session):
        if session is None:
            self.s = requests.Session()
        else:
            self.s = session
        self.gt = None
        self.w = None
        self.check_w = None
        self.challenge = None
        self.type_config = None
        self.params_s = None
        self.type = None
        self.image_url = None
        self.token = None

    def get_gt_challenge(self):
        url = f"https://passport.bilibili.com/x/passport-login/captcha?source=main_mini&t={random.random()}"
        headers = {
            "authority": "passport.bilibili.com",
            "method": "GET",
            "scheme": "https",
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "origin": "https://www.bilibili.com",
            "pragma": "no-cache",
            "referer": "https://www.bilibili.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/98.0.4758.102 Safari/537.36",
        }

        res = self.s.get(url, headers=headers)
        if res.status_code == 200:
            logging.info("请求gt和challenge成功")
            infos = res.json()
            self.gt = infos.get("data", {}).get("geetest", {}).get("gt")
            self.challenge = infos.get("data", {}).get("geetest", {}).get("challenge")
            self.token = infos.get("data", {}).get("token")
        else:
            logging.error("请求gt和challenge失败")

    def get_type(self):
        url = f"https://api.geetest.com/gettype.php?gt={self.gt}&callback=geetest_{int(time.time()) * 1000}"
        headers = {
            "authority": "api.geetest.com",
            "method": "GET",
            "path": urlparse(url).path,
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "zh,en-GB;q=0.9,en;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.bilibili.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                          " Chrome/98.0.4758.102 Safari/537.36",
        }

        type_res = self.s.get(url, headers=headers)
        if type_res.status_code == 200:
            config_infos = re.search(r"geetest_\d+\((.*)\)", type_res.text)
            if config_infos:
                type_config_infos = json.loads(config_infos.group(1))
                if type_config_infos["status"] == "success":
                    logging.info("请求验证码文件类型和文件名成功")
                    self.type_config = json.loads(config_infos.group(1))["data"]
                else:
                    logging.info("请求验证码文件类型和文件名失败")
            else:
                logging.error("正则匹配文件类型信息时失败")
        else:
            logging.error("请求验证码文件类型和文件名失败")

    def get_w(self):
        url = "http://127.0.0.1:8090/get_init_w"
        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "config": self.type_config
        }
        res = requests.post(url, data=data)
        if res.status_code == 200:
            logging.info("请求w参数成功")
            self.w = res.text
        else:
            logging.error("请求w参数失败")

    def get_init_info(self):
        url = "https://api.geetest.com/get.php"
        headers = {
            "authority": "api.geetest.com",
            "method": "GET",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate",
            "accept-language": "en-GB,en;q=0.9,zh;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.bilibili.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                          " Chrome/98.0.4758.102 Safari/537.36",
        }

        body = {
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "pt": 0,
            "client_type": "web",
            "w": self.w,
            "callback": f"geetest_{int(time.time()) * 1000}"
        }

        res = self.s.get(url, params=body, headers=headers)
        if res.status_code == 200:
            init_infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if init_infos:
                init_infos = json.loads(init_infos.group(1))
                if init_infos['status'] == 'success':
                    logging.info("获取点选验证码初始信息成功")
                    self.params_s = init_infos['data']['s']
                else:
                    logging.info("获取点选验证码初始信息失败")
            else:
                logging.error("正则匹配点选验证码信息失败")
        else:
            logging.error("请求点选验证码初始信息失败")

    def get_check_w(self):
        url = "http://127.0.0.1:8090/get_check_w"

        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "config": self.type_config,
            "s": self.params_s,
            "tracks": json.dumps(get_track([(140, 595), (436, 630)]))
        }

        res = requests.post(url, data=data)
        if res.status_code == 200:
            logging.info("请求点击验证的w参数成功")
            self.check_w = res.text
        else:
            logging.error("请求点击验证的w参数失败")

    def get_check_info(self):
        url = f"https://api.geetest.com/ajax.php?gt={self.gt}&challenge={self.challenge}&" \
            f"lang=zh-cn&pt=0&client_type=web&w={self.check_w}&callback=geetest_{int(time.time()) * 1000}"
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-GB,en;q=0.9,zh;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "api.geetest.com",
            "Pragma": "no-cache",
            "Referer": "https://www.bilibili.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        }

        res = self.s.get(url, headers=headers)
        if res.status_code == 200:
            check_infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if check_infos:
                check_infos = json.loads(check_infos.group(1))
                if check_infos['status'] == 'success':
                    self.type = check_infos.get("data", {}).get("result")
                    logging.info("无感验证返回信息成功")
                else:
                    raise Exception("无感验证返回信息异常")
            else:
                raise Exception("正则匹配无感验证信息失败")
        else:
            raise Exception("请求无感验证信息失败")

    def get_image_info(self):
        url = "https://api.geetest.com/get.php"
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "en-GB,en;q=0.9,zh;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "api.geetest.com",
            "Pragma": "no-cache",
            "Referer": "https://www.geetest.com/show",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
        }

        data = {
            "is_next": True,
            "type": self.type,
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "https": "false",
            "protocol": "https://",
            "offline": "false",
            "product": "embed",
            "api_server": "api.geetest.com",
            "isPC": True,
            "autoReset": True,
            "width": "100%",
            "callback": f"geetest_{int(time.time()) * 1000}",
        }

        res = self.s.get(url, params=data, headers=headers)
        if res.status_code == 200:
            logging.info("请求验证码图片信息成功")
            image_infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if image_infos:
                image_infos = json.loads(image_infos.group(1))
                if image_infos["status"] == "success":
                    # self.params_s = image_infos["data"]["s"]
                    self.image_url = f"https://static.geetest.com{image_infos['data']['pic']}"
                    return image_infos.get("data", {})
                else:
                    logging.error("请求验证码图片失败")
            else:
                logging.error("正则匹配验证码图片信息失败")
        else:
            logging.error("请求验证码图片信息失败")

    def save_image(self):
        headers = {
            "authority": "static.geetest.com",
            "method": "GET",
            "scheme": "https",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,"
                      "*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate",
            "accept-language": "en-GB,en;q=0.9,zh;q=0.8,zh-CN;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/98.0.4758.102 Safari/537.36",
        }

        image_res = requests.get(self.image_url, headers=headers)
        if image_res.status_code == 200:
            image_dir = os.path.join(os.getcwd(), IMAGE_DIR)
            if not os.path.exists(image_dir):
                os.makedirs(image_dir)

            image_path = os.path.join(image_dir, f"{get_md5(image_res.content)}.jpg")
            # image_path = f"{get_md5(image_res.content)}.jpg"
            resize_img = resize_img_keep_ratio(image_res.content, (288, 258))
            cv2.imwrite(image_path, resize_img)
            return image_path
            # with open(image_path, "wb") as f:
            #     try:
            #         f.write(image_res.content)
            #     except Exception as e:
            #         logging.error(f"保存验证码图片失败: {e.args}")
            #     else:
            #         logging.info(f"保存验证码图片成功: {image_path}")
            #         return image_path
        else:
            logging.error('请求验证码图片失败')

    def get_click_w(self, image_infos, image_path):
        url = "http://127.0.0.1:8090/get_click"
        click_list, points = generate_click_points(run_click(image_path))
        track_list = get_click_track(click_list)

        data = {
            "gt": self.gt,
            "challenge": self.challenge,
            "call_infos": json.dumps(image_infos),
            "tracks": json.dumps(track_list),
            "points": json.dumps(points)
        }

        res = requests.post(url, data=data)
        if res.status_code == 200:
            logging.info("请求点击汉字的w参数成功")
            return res.text
        else:
            logging.error("请求点击汉字的w参数失败")

    def get_validate(self, image_infos, image_path):
        url = "https://api.geetest.com/ajax.php?gt={gt}&challenge={challenge}&lang=zh-cn&" \
              "pt=0&client_type=web&w={w}&&callback=geetest_{t}"
        header = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "api.geetest.com",
            "Pragma": "no-cache",
            "Referer": "https://www.geetest.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/86.0.4240.183 Safari/537.36",
        }

        try:
            validate_w = self.get_click_w(image_infos, image_path)
        except Exception as e:
            logging.error(e.args)
            raise Exception("识别图片位置出现异常")
        url = url.format(gt=self.gt, challenge=self.challenge, w=validate_w, t=int(time.time()) * 1000)
        res = self.s.get(url, headers=header)
        if res.status_code == 200:
            logging.info("请求点击验证成功")
            infos = re.search(r"geetest_\d+\((.*)\)", res.text)
            if infos:
                validate_infos = json.loads(infos.group(1))
                print(validate_infos)
                if validate_infos["status"] == "success" and validate_infos["data"]["result"] == "success":
                    logging.info("点击验证成功")
                    return validate_infos["data"]["validate"]
                else:
                    logging.error("点击验证失败")
            else:
                logging.error("正则匹配点击验证信息失败")
        else:
            logging.error("提交验证请求失败")

    @retry(stop_max_attempt_number=10, wait_fixed=10000)
    def scheduler(self):
        self.get_gt_challenge()
        self.get_type()
        self.get_w()
        self.get_init_info()
        self.get_check_w()
        self.get_check_info()
        image_infos = self.get_image_info()
        image_path = self.save_image()
        validate = self.get_validate(image_infos, image_path)
        if not validate:
            raise Exception("validate value异常")
        validate_info = {
            "gt": self.gt,
            "challenge": self.challenge,
            "token": self.token,
            "validate": validate
        }
        print(validate_info)
        return validate_info


if __name__ == "__main__":
    app = JiYanTextSelect()
    app.scheduler()

    # image_path = r'E:\person code\SpiderCollection\bilibili\image\c4cfc41d5284524ecdae85f5a625e078.jpg'
    # click_list, points = generate_click_points(run_click(image_path))
    # track_list = get_click_track(click_list)
    # print(track_list)
    # print(points)
