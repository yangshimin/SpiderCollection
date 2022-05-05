import math
import os
import random
import re
import sys
import json
import time
import logging
import requests
from slide import Slide
from urllib.parse import urlparse, urljoin
import easing

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Application(object):

    def __init__(self):
        self.s = requests.Session()
        self.slide_start_time = int(time.time() * 1000)

    def get_index(self):
        url = "https://www.ishumei.com/trial/captcha.html"
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.ishumei.com",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }

        res = self.s.get(url, headers=headers)
        if res.status_code == 200:
            organization_pattern = re.search(r'{organization:"(.*?)",', res.text)
            if organization_pattern:
                logging.info("解析organization成功")
                return organization_pattern.group(1)
            else:
                logging.error("解析organization失败")
        else:
            logging.info("请求首页失败")

    def get_slide_img_info(self, organization):
        url = "https://captcha.fengkongcloud.cn/ca/v1/register"
        headers = {
            "authority": "captcha.fengkongcloud.cn",
            "method": "GET",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.ishumei.com/trial/captcha.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }

        params = {
            "channel": "DEFAULT",
            "appId": "default",
            "rversion": "1.0.3",
            "sdkver": "1.1.3",
            "data": "{}",
            "organization": organization,
            "lang": "zh-cn",
            "callback": f"sm_{int(time.time() * 1000)}",
            "model": "slide",
        }
        res = self.s.get(url, params=params, headers=headers)
        if res.status_code == 200:
            logging.info("请求滑动验证码图片信息成功")
            json_info_pattern = re.search(r'\{.*\}', res.text)
            if json_info_pattern:
                logging.info("解析滑动验证码图片信息成功")
                json_info = json.loads(json_info_pattern.group())
                return json_info
            else:
                logging.error("解析滑动验证码图片信息失败")
        else:
            logging.error("请求滑动验证码图片信息失败")

    def get_js_url(self, organization):
        """解密的js文件是通过这个请求得到的 同时可能这个请求的params也会动态更新"""
        url = "https://captcha.fengkongcloud.cn/ca/v1/conf"
        headers = {
            "authority": "captcha.fengkongcloud.cn",
            "method": "GET",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.ishumei.com/trial/captcha.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }
        params = {
            "channel": "DEFAULT",
            "rversion": "1.0.3",
            "sdkver": "1.1.3",
            "appId": "default",
            "organization": organization,
            "model": "slide",
            "lang": "zh-cn",
            "callback": f"sm_{int(time.time() * 1000)}",
        }

        res = self.s.get(url, params=params, headers=headers)
        if res.status_code == 200:
            logging.info("请求解密的js url成功")
            js_json_info_pattern = re.search(r'\{.*\}', res.text)
            if js_json_info_pattern:
                logging.info("解析解密的js url成功")
                json_info = json.loads(js_json_info_pattern.group())
                return json_info.get("detail", {}).get("js")
        else:
            logging.error("请求解密的js url失败")

    def get_js_file(self, js_url):
        headers = {
            "authority": "castatic.fengkongcloud.cn",
            "method": "GET",
            "path": urlparse(js_url).path,
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.ishumei.com/trial/captcha.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }

        res = self.s.get(urljoin('https://castatic.fengkongcloud.cn', js_url), headers=headers)
        if res.status_code == 200:
            logging.info("请求解密js文件成功")
            js_file_path = os.path.join(os.getcwd(), "captcha_sdk.js")
            with open(js_file_path, 'wb') as f:
                f.write(res.content)
                logging.info("保存解密JS文件成功")
            return js_file_path
        else:
            logging.error("请求解密js文件失败")

    @staticmethod
    def get_track_data(distance):
        offsets, tracks = easing.get_tracks(distance, 5, 'ease_out_expo')
        time_offsets, time_tracks = easing.get_tracks(5689, 5, 'ease_out_quart')

        track_data_list = list()
        for index, x_track in enumerate(tracks):
            y_track = random.randint(-5, 2)
            track_time = time_offsets[index]
            track_data_list.append([x_track, y_track, track_time])
        return track_data_list

    def get_slide_data(self, distance):
        track_data_list = self.get_track_data(distance)
        mouse_end_x = track_data_list[-1][0]
        end_time = self.slide_start_time + track_data_list[-1][-1] + random.randint(35, 65)

        # endTime 和 startTime的差值要略大于track_data_list最后一个数组的的最后一个值
        data = {
            "mouseData": track_data_list,
            "startTime": self.slide_start_time,
            "endTime": end_time,
            "mouseEndX": mouse_end_x,  # 滑块最后的偏移值
            "trueWidth": 300,  # 滑块在页面上展示的宽度
            "trueHeight": 150,  # 滑块在页面上展示的高度
            "selectData": [],
            "blockWidth": 40,  # 可能是滑块宽度的一半
        }
        return data

    @staticmethod
    def generate_post_slide_data(slide_data, js_file_path, register_data, organization, rid):
        data = {
            "slide_data": slide_data,
            "js_file_path": js_file_path,
            "register_data": register_data
        }
        res = requests.post("http://127.0.0.1:8090/generate_slide_data", data=data)
        if res.status_code == 200:
            info = res.json()
            info.update({
                "organization": organization,
                "rid": rid,
                "callback": f"sm_{int(time.time() * 1000)}"
            })
            return info

    def get_verify_data(self, info):
        url = "https://captcha.fengkongcloud.cn/ca/v2/fverify"
        headers = {
            "authority": "castatic.fengkongcloud.cn",
            "method": "GET",
            "path": "/pr/auto-build/v1.0.3-145/captcha-sdk.min.js",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "referer": "https://www.ishumei.com/trial/captcha.html",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/91.0.4472.164 Safari/537.36",
        }

        verify_res = self.s.get(url, params=info, headers=headers)
        if verify_res.status_code == 200:
            print(verify_res.text)
        else:
            logging.error("验证的状态码异常")

    def scheduler(self):
        organization = self.get_index()
        slide_img_info = self.get_slide_img_info(organization)
        register_data = slide_img_info["detail"]
        rid = register_data["rid"]
        encrypt_js_url = self.get_js_url(organization)
        encrypt_js_file = self.get_js_file(encrypt_js_url)
        slide_app = Slide(urljoin('https://castatic.fengkongcloud.cn', slide_img_info['detail']['fg']),
                          urljoin('https://castatic.fengkongcloud.cn', slide_img_info['detail']['bg']))
        slide_distance = int(slide_app.discern() // 2)
        slide_data = self.get_slide_data(slide_distance)
        info = self.generate_post_slide_data(json.dumps(slide_data), encrypt_js_file,
                                             json.dumps(register_data), organization, rid)
        if not info:
            logging.error("生成post数据失败")
        else:
            self.get_verify_data(info)


if __name__ == "__main__":
    # 564
    app = Application()
    app.scheduler()
