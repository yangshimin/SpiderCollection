# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 12/17/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import json
import os
import random
import re
import sys
import logging
import time
from urllib.parse import urljoin, urlparse

import execjs
import requests

from 易盾.slide import Slide
from 易盾 import easing


formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Application(object):

    def __init__(self):
        self.domain = "https://dun.163.com"
        self.index_url = "https://dun.163.com/trial/jigsaw"
        self.static_dir = os.path.join(os.getcwd(), 'static')
        self.session = requests.Session()
        self.create_static()

    def create_static(self):
        if not os.path.exists(self.static_dir):
            os.makedirs(self.static_dir)

    def get_index(self):
        """请求demo使用页面得到captchaId"""
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

        res = self.session.get(url=self.index_url, headers=headers)
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

    @staticmethod
    def execute_js(js_code, func_name=None, func_argument=None, is_func=False):
        ctx = execjs.compile(js_code)
        if is_func:
            if func_argument:
                result = ctx.call(func_name, *func_argument)
            else:
                result = ctx.call(func_name)
        else:
            result = ctx.eval(js_code)
        return result

    def get_conf(self, captcha_id):
        url = "https://c.dun.163yun.com/api/v2/getconf"
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": urlparse(url).netloc,
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/96.0.4664.110 Safari/537.36",
        }
        params = {
            "referer": self.index_url,
            "zoneId": "",
            "id": captcha_id,
            "ipv6": "false",
            "runEnv": "10",
            "type": "2",
            "loadVersion": "2.2.3",
            "callback": f"__JSONP_{self.execute_js('Math.random().toString(0x24).slice(0x2, 0x9)')}_0",
        }

        conf_res = self.session.get(url, params=params, headers=headers)
        if conf_res.status_code == 200:
            logging.info("请求conf信息成功")
            conf_json_data_pattern = re.search(r'\{".*"\}', conf_res.text)
            if conf_json_data_pattern:
                return json.loads(conf_json_data_pattern.group())
            else:
                logging.error("正则匹配conf信息失败")
        else:
            logging.error("请求conf信息失败")

    def get_core_min_js(self, config):
        url = "https://" + config["data"]['staticServers'][0] + \
              config["data"]['resources'][0] + f"?v={int(int(time.time() * 1000) / 600000)}"
        return self.save_download_file(url, 'core_min.js')

    def get_cb(self):
        js_code = open(os.path.join(os.getcwd(), 'getCallBack.js'), 'r', encoding="utf-8").read()
        cb = self.execute_js(js_code, func_name='get_cb', is_func=True)
        return cb

    @staticmethod
    def get_fp():
        url = "http://127.0.0.1:8090/get_fp"
        res = requests.get(url)
        return res.text

    def get_image_info(self, captcha_id):
        url = "https://c.dun.163.com/api/v2/get"
        params = {
            "referer": self.index_url,
            "zoneId": "CN31",
            "id": captcha_id,
            "fp": self.get_fp(),
            "https": "true",
            "type": "2",
            "version": "2.17.1",
            "dpr": "1",
            "dev": "1",
            "cb": self.get_cb(),
            "ipv6": "false",
            "runEnv": "10",
            "group": "",
            "scene": "",
            "lang": "zh-CN",
            "width": "320",
            "audio": "false",
            "token": "",
            "callback": f"__JSONP_{self.execute_js('Math.random().toString(0x24).slice(0x2, 0x9)')}_0",
        }
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "c.dun.163.com",
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        }

        res = self.session.get(url, params=params, headers=headers)
        if res.status_code == 200:
            logging.info("请求验证码图片信息成功")
            json_info_pattern = re.search(r'(\{"data".*\})', res.text)
            if json_info_pattern:
                return json.loads(json_info_pattern.group(1))
        else:
            logging.error("请求验证码图片信息失败")

    @staticmethod
    def get_slide_offset(image_info):
        """image_info中有两种image的下载url, 这里指定都下载host为necaptcha.nosdn.127.net的图片"""
        background_image = list(filter(lambda x: "necaptcha.nosdn.127.net" in x,
                                       image_info.get("data", {}).get("bg", [])))
        front_image = list(filter(lambda x: "necaptcha.nosdn.127.net" in x,
                                  image_info.get("data", {}).get("front", [])))

        if background_image and front_image:
            background_image = background_image[0]
            front_image = front_image[0]

            slide_app = Slide(front_image, background_image)
            return slide_app.discern()

    @staticmethod
    def get_track_data(distance):
        offsets, tracks = easing.get_tracks(distance, 3, 'ease_out_bounce')
        time_offsets, time_tracks = easing.get_tracks(2569, 3, 'ease_in_quad')

        track_data_list = list()
        for index, x_track in enumerate(tracks):
            # 易盾的轨迹横坐标都是从4开始的
            if x_track < 4:
                if index == 0:
                    track_data_list.append([4, 0, 4])
                continue
            y_track = random.randint(-5, 2)
            track_time = time_offsets[index]
            track_data_list.append([int(x_track), y_track, int(track_time)])
        return track_data_list

    def check(self, captcha_id, image_token, ac_token, track_infos):
        url = "https://c.dun.163.com/api/v2/check"
        params = {
            "referer": self.index_url,
            "zoneId": "CN31",
            "id": captcha_id,
            "token": image_token,
            "acToken": ac_token,
            "data": json.dumps(track_infos['data']).replace(" ", ""),
            "width": "320",
            "type": "2",
            "version": "2.17.1",
            "cb": self.get_cb(),
            "extraData": "",
            "bf": "0",
            "runEnv": "10",
            "callback": f"__JSONP_{self.execute_js('Math.random().toString(0x24).slice(0x2, 0x9)')}_1",
        }
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": urlparse(url).netloc,
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/96.0.4664.110 Safari/537.36",
        }

        res = self.session.get(url, params=params, headers=headers)
        if res.status_code == 200:
            logging.info("请求验证码验证成功")
            print(res.text)
        else:
            logging.error("请求验证码验证失败")

    @staticmethod
    def get_ac_token(watch_man_js, config_info, product_number, bid):
        url = "http://127.0.0.1:8090/convert_watch_man"
        data = {
            "watch_man_js": watch_man_js,
            "js_config_info": json.dumps(config_info),
            "productNumber": product_number,
            "bid": bid
        }

        res = requests.post(url, data=data)
        return res.text

    def get_js_config(self):
        url = "https://ac.dun.163.com/v2/config/js"
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "ac.dun.163.com",
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                          "(KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
        }
        params = {
            "pn": "YD20160637306799",  # productNumber
            "cvk": "",
            "cb": f"__wmjsonp_{self.execute_js('Math.random().toString(0x24).slice(0x2, 0x9)')}",
            "t": int(time.time() * 1000),
        }

        res = self.session.get(url, params=params, headers=headers)
        if res.status_code == 200:
            logging.info("请求product config 成功")
            config_info_pattern = re.search(r'(\{.*\})', res.text)
            if config_info_pattern:
                config_info = config_info_pattern.group(1)
                return json.loads(config_info)['result']
            else:
                logging.error("正则匹配config info失败")

        else:
            logging.error("请求product config 失败")

    def download_watch_man_js(self, js_config):
        url = f"https://{js_config['s']}/{js_config['v']}/watchman.min.js"
        return self.save_download_file(url, "watchMan.js")

    def scheduler(self):
        load_min_js_url, pt_experience_captcha_drag_js_url = self.get_index()
        load_min_js = self.save_download_file(load_min_js_url, "load_min.js")
        pt_experience_captcha_drag_js_file = self.save_download_file(pt_experience_captcha_drag_js_url,
                                                                     "captcha_drag_js.js")
        captcha_id = self.get_captcha_id(pt_experience_captcha_drag_js_file)
        conf_infos = self.get_conf(captcha_id)
        js_config_infos = self.get_js_config()
        watch_man_js_file = self.download_watch_man_js(js_config_infos)
        core_min_js = self.get_core_min_js(conf_infos)
        image_infos = self.get_image_info(captcha_id)
        if not image_infos:
            logging.error("请求图片信息失败")
        discern = self.get_slide_offset(image_infos)
        track_data = self.get_track_data(discern)
        image_token = image_infos.get("data", {}).get("token")
        track_data_decrypt = []
        js_code = open(os.path.join(os.getcwd(), 'getCallBack.js'), 'r', encoding="utf-8").read()
        for track in track_data:
            decrypt_data = self.execute_js(js_code, func_name='track_decrypt',
                                           func_argument=(image_token, ",".join([str(d) for d in track])),
                                           is_func=True)
            track_data_decrypt.append(decrypt_data)

        track_decrypt_infos = self.execute_js(js_code, func_name='get_track_post_data',
                                              func_argument=(track_data_decrypt, image_token, discern),
                                              is_func=True)

        bid = conf_infos.get("data", {}).get("ac", {}).get("bid")
        ac_token = self.get_ac_token(open(watch_man_js_file, 'r', encoding="utf-8").read(),
                                     js_config_infos, "YD20160637306799", bid)
        # ac_token = "9ca17ae2e6ffcda170e2e6eea4f544f7b6fcdaf834a9bc8eb6c84e969f9eaeb57b92aec0d9e87daf909cd6b82af0feaec3b92ab79fa387fc7f9687a4a6f25e868f9fb2d14a8af1f9b2b53ff891fdb7d264f390ee9e"
        if not ac_token:
            raise Exception("服务端没有返回ac_token")
        self.check(captcha_id, image_token, ac_token, track_decrypt_infos)


if __name__ == "__main__":
    app = Application()
    app.scheduler()
