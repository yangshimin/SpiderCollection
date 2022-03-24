# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 03/23/22
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import sys
import time
import logging
import random
import requests
from jiyan import JiYanTextSelect
import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5


formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Login(object):

    def __init__(self, account, pwd):
        self.s = requests.Session()
        self.account = account
        self.pwd = pwd
        self.login_url = "https://passport.bilibili.com/x/passport-login/web/login"

    def get_login_key_info(self):
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "passport.bilibili.com",
            "Origin": "https://www.bilibili.com",
            "Pragma": "no-cache",
            "Referer": "https://www.bilibili.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.74 Safari/537.36",
        }
        url = f"https://passport.bilibili.com/x/passport-login/web/key?_={int(time.time() * 1000)}"

        login_key_res = self.s.get(url, headers=headers)
        if login_key_res.status_code == 200:
            logging.info("请求login 的key成功")
            return login_key_res.json()["data"]
        else:
            logging.error("请求login 的key失败")

    @staticmethod
    def get_validate_info():
        text_select = JiYanTextSelect()
        return text_select.scheduler()

    def decrypt_pwd(self, key, hash_):
        rsa_key = RSA.importKey(key)
        cipher = Cipher_pkcs1_v1_5.new(rsa_key)
        decrypt_password = base64.b64encode(cipher.encrypt((hash_ + self.pwd).encode("utf-8"))).decode('utf8')
        return decrypt_password

    def login(self):
        validate_info = self.get_validate_info()
        if validate_info["validate"] is None:
            logging.error("没有validate 值")
            return
        login_key_info = self.get_login_key_info()
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "passport.bilibili.com",
            "Origin": "https://www.bilibili.com",
            "Pragma": "no-cache",
            "Referer": "https://www.bilibili.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.74 Safari/537.36",
        }

        pwd_encrypt = self.decrypt_pwd(login_key_info["key"], login_key_info['hash'])
        login_data = {
            "username": self.account,
            "password": pwd_encrypt,
            "keep": 0,
            "source": "main_mini",
            "token": validate_info["token"],
            "go_url": "https://www.bilibili.com/",
            "challenge": validate_info["challenge"],
            "validate": validate_info["validate"],
            "seccode": f'{validate_info["validate"]}|jordan'
        }
        login_res = self.s.post(self.login_url, data=login_data, headers=headers)
        if login_res.status_code == 200:
            print(login_res.text)
            if login_res.json()["data"].get("status") == 0:
                logging.info("登录成功")
            else:
                logging.error("登录失败")
        else:
            logging.error("登录失败, 请求的状态码异常")

    def get_account_info(self):
        account_url = "https://api.bilibili.com/x/web-interface/nav"
        headers = {
            "authority": "api.bilibili.com",
            "method": "GET",
            "path": "/x/web-interface/nav",
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "origin": "https://www.bilibili.com",
            "pragma": "no-cache",
            "referer": "https://www.bilibili.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.74 Safari/537.36",
        }
        account_res = self.s.get(account_url, headers=headers)
        print(account_res.text)


if __name__ == "__main__":
    app = Login("", "")
    app.login()
    app.get_account_info()
