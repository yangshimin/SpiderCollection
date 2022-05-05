# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 01/29/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : t.py.py
# @Software: PyCharm
import json
import os
import re
import sys
import time
import logging
import json5
import requests
import execjs
import pdb
from urllib.parse import urlparse

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)

s = requests.session()
url = "https://www.glassdoor.com/"
v1js_url = "https://www.glassdoor.com/cdn-cgi/challenge-platform/h/g/orchestrate/jsch/v1"

headers = {
    "authority": "www.glassdoor.com",
    "method": "GET",
    "path": "/",
    "scheme": "https",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,"
              "image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                  " Chrome/88.0.4324.190 Safari/537.36",
}
# 第一次返回503
res = s.get(url, headers=headers)
with open("glassdoor.html", 'wb') as f:
    f.write(res.content)
    logging.info("写入html文件成功")

_cf_chl_opt_pattern = re.search(r"_cf_chl_opt=(.*?)window._cf_chl_enter", res.text, re.DOTALL)
if _cf_chl_opt_pattern:
    cf_chl_opt = _cf_chl_opt_pattern.group(1)
    cf_chl_opt = json5.loads(cf_chl_opt)
    logging.info("解析配置信息成功")

    jsv1_headers = {
        "authority": "www.glassdoor.com",
        "method": "GET",
        "path": "/cdn-cgi/challenge-platform/h/g/orchestrate/jsch/v1",
        "scheme": "https",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "referer": "https://www.glassdoor.com/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36",
    }

    js_v1_res = s.get(v1js_url, headers=jsv1_headers)
    if js_v1_res.status_code != 200:
        logging.info("请求js文件失败")

    with open("js_v1.js", "wb") as f:
        f.write(js_v1_res.content)
        logging.info("写入js文件成功")

    # 匹配大数组
    big_array_pattern = re.search(r"{b='(.*?)'\.split", js_v1_res.text)
    if not big_array_pattern:
        logging.info("匹配大数组失败")
    big_array = big_array_pattern.group(1).split(',')
    str_62 = [s for s in big_array if len(s) == 62][0]
    str_65 = [s for s in big_array if len(s) == 65 and not s.startswith('ABCD')][0]

    url_params_pattern = re.search(r'/0\.\d+:\d{10}:\w+/', js_v1_res.text)
    if not url_params_pattern:
        logging.info("匹配url param 失败")
    url_params = url_params_pattern.group()

    decrypt_url = f"https://www.glassdoor.com/cdn-cgi/challenge-platform/h/{cf_chl_opt['cFPWv']}/flow/" \
                  f"ov1{url_params}{cf_chl_opt['cRay']}/{cf_chl_opt['cHash']}"
    decrypt_headers = {
        "authority": "www.glassdoor.com",
        "method": "POST",
        "path": urlparse(decrypt_url).path,
        "scheme": "https",
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
        "cache-control": "no-cache",
        "cf-challenge": cf_chl_opt['cHash'],
        "content-type": "application/x-www-form-urlencoded",
        "origin": "https://www.glassdoor.com",
        "pragma": "no-cache",
        "referer": "https://www.glassdoor.com",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)"
                      " Chrome/88.0.4324.190 Safari/537.36",
    }

    first_start_time = int(time.time() * 1000)
    json_data = json.dumps({
        "chLog": {"0": {"start": first_start_time}, "c": 1},
        "chReq": cf_chl_opt["cType"],
        "cNounce": cf_chl_opt["cNounce"],
        "cvId": cf_chl_opt["cvId"],
        "chC": 0,
        "chCAS": 0,
        "oV": 1,
        "cRq": cf_chl_opt["cRq"],
    }).replace(" ", "")
    signature_js_path = os.path.join(os.getcwd(), 'decrypt_decode.js')
    signature_ctx = execjs.compile(open(signature_js_path, 'r', encoding="utf-8").read())
    signature = signature_ctx.call("res", str_62, str_65, 'compressToEncodedURIComponent', json_data)

    decrypt_data = f'v_{cf_chl_opt["cRay"]}={signature}'
    decrypt_res = s.post(decrypt_url, data=decrypt_data, headers=decrypt_headers)
    decode_js_response = s.post("http://127.0.0.1:8090/first_decode",
                                data={"cRay": cf_chl_opt['cRay'], "decrypt_data": decrypt_res.text})
    decode_js = signature_ctx.call("res", str_62, str_65, 'decompressFromEncodedURIComponent', decode_js_response.text)

    # 因为在node端无法重定义module为undefined 所以在这里修改module--->_module
    decode_js = decode_js.replace("window._ =", 'var _ =').replace('window._=', 'var _ =').replace('module', '_module')
    js_window__cf_chl_opt = json.dumps(cf_chl_opt)
    js_window__cf_chl_ctx = json.dumps({
        # 'chLog': {'0': {'start': first_start_time}, 'c': 1},
        'chReq': 'non-interactive',
        'cNounce': cf_chl_opt['cNounce'],
        'cvId': '2',
        'chC': 0,
        'chCAS': 0,
        'oV': 1,
        'cRq': cf_chl_opt['cRq']
    })
    env_js = open('env', 'r', encoding="utf-8").read()
    new_decode_js = env_js + decode_js
    cookies = s.cookies.get_dict()
    cookie_str = []
    for k, v in cookies.items():
        cookie_str.append(f"{k}={v}")
    cookie = ";".join(cookie_str)
    data = {
        "_cf_chl_opt": js_window__cf_chl_opt,
        "_cf_chl_ctx": js_window__cf_chl_ctx,
        "execute_js_str": new_decode_js,
        "url_params": url_params,
        "cookie": cookie
    }
    answer_js = requests.post("http://127.0.0.1:8090/answer_js", data=data)
    if answer_js.status_code == 200:
        res_data = answer_js.json()
        if res_data.get("error"):
            logging.info("执行answer_js文件失败")
        else:
            url = res_data.get("url")
            data = res_data.get("data")

            for key, item in data.items():
                if isinstance(item, dict) and 'Error:Ninjas' in item.get("a", ''):
                    logging.info("替换Ninjas")
                    data[key]['a'] = 'Error:Ninjas>piratesatevalevalat.<computed>https://www.glas'

                if isinstance(item, dict) and item.get("ls") and item.get("ss"):
                    data[key]["ls"]["ps"] = 5233664
                    data[key]["ss"]["ps"] = 5233664

            new_decrypt_url = "https://www.glassdoor.com" + url

            new_signature = signature_ctx.call("res", str_62, str_65,
                                               'compressToEncodedURIComponent', json.dumps(data))
            new_decrypt_data = f'v_{cf_chl_opt["cRay"]}={new_signature}'
            # 这个new_decrypt_data的值应该有一些地方不对
            cookies = s.cookies.get_dict()
            # cookies.update({"cf_chl_prog": "b"})
            decrypt_headers['referer'] = 'https://www.glassdoor.com/'
            new_decrypt_res = requests.post(decrypt_url, data=new_decrypt_data,
                                            headers=decrypt_headers, cookies=cookies)
            if new_decrypt_res.status_code == 200:
                decode_js_response = requests.post("http://127.0.0.1:8090/first_decode",
                                                   data={"cRay": cf_chl_opt['cRay'], "decrypt_data": new_decrypt_res.text})
                decode_js = signature_ctx.call("res", str_62, str_65, 'decompressFromEncodedURIComponent',
                                               decode_js_response.text)
                if "getElementById" in decode_js:
                    print(decode_js)
                else:
                    print(decode_js)
