# !/usr/bin/python3
# -*- coding: utf-8 -*-
import time
import requests


class AbckCookie(object):

    def __init__(self, session):
        self.init_url = "http://127.0.0.1:8090/init"
        self.first_get_sensor_data_url = "http://127.0.0.1:8090/first_get_sensor_data"
        self.second_get_sensor_data_url = "http://127.0.0.1:8090/second_get_sensor_data"
        self.third_get_sensor_data_url = "http://127.0.0.1:8090/third_get_sensor_data"
        self.fourth_get_sensor_data_url = "http://127.0.0.1:8090/fourth_get_sensor_data"
        self.session = session
        self.init_cookie = session.cookies.get_dict()['_abck']

    def fedex_init(self):
        print("提交第一次和第二次的sensor_data")
        requests.post(self.init_url, data={"cookie": self.init_cookie})

        sensor_data = requests.get(self.first_get_sensor_data_url).text
        self.post_sensor_data(sensor_data)

        sensor_data = requests.post(self.second_get_sensor_data_url,
                                    data={"cookie": self.session.cookies.get_dict()['_abck']}).text
        self.post_sensor_data(sensor_data)
        return self.session

    def valid_sensor_data(self, abck_cookie):
        print("開始模擬時間監聽流程")
        requests.post(self.third_get_sensor_data_url, data={"cookie": abck_cookie})
        requests.post(self.fourth_get_sensor_data_url, data={"cookie": abck_cookie})

        return self.session

    def post_sensor_data(self, sensor_data):
        headers = {
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "text/plain;charset=UTF-8",
            "CSRF-Token": None,
            "Host": "www.fedex.com",
            "Origin": "https://www.fedex.com",
            "Pragma": "no-cache",
            "Referer": "https://www.fedex.com/zh-cn/home.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/101.0.4951.41 Safari/537.36",
        }
        url = "https://www.fedex.com/IqRx2JoI2www7CRjqhVFUbP5/SiJuppkSXu/ZXFESA/OH5/6cApcJgYB"
        post_data = {"sensor_data": sensor_data}

        print(f"提交前abck: {self.session.cookies.get_dict()['_abck']}")
        res = self.session.post(url, json=post_data, headers=headers)
        if res.status_code in [200, 201]:
            print("提交验证sensor_data成功")
            print(res.json())
            print(f"提交后abck: {self.session.cookies.get_dict()['_abck']}")
        else:
            print("提交验证sensor_data失败")




