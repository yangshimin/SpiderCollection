# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @author: YangShiMin
# @File: public_func.py
# @Time: 2022/3/21 20:54
# @Email: 843113495a@gmail.com
# @software: PyCharm
from hashlib import md5


def get_md5(data):
    md5_ = md5()
    md5_.update(data)
    return md5_.hexdigest()
