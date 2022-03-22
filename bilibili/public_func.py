# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @author: YangShiMin
# @File: public_func.py
# @Time: 2022/3/21 20:54
# @Email: 843113495a@gmail.com
# @software: PyCharm
import numpy as np
from hashlib import md5
import cv2


def get_md5(data):
    md5_ = md5()
    md5_.update(data)
    return md5_.hexdigest()


def resize_img_keep_ratio(img, target_size):
    image = np.asarray(bytearray(img), dtype="uint8")
    img = cv2.imdecode(image, cv2.IMREAD_COLOR)
    old_size = img.shape[0:2]
    #ratio = min(float(target_size)/(old_size))
    ratio = min(float(target_size[i])/(old_size[i]) for i in range(len(old_size)))
    new_size = tuple([int(i*ratio) for i in old_size])
    img = cv2.resize(img, (new_size[1], new_size[0]))
    pad_w = target_size[1] - new_size[1]
    pad_h = target_size[0] - new_size[0]
    top, bottom = pad_h//2, pad_h-(pad_h//2)
    left, right = pad_w//2, pad_w - (pad_w//2)
    img_new = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, None, (0, 0, 0))
    return img_new
