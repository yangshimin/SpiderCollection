# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @author: YangShiMin
# @File: t.py
# @Time: 2022/3/22 22:50
# @Email: 843113495a@gmail.com
# @software: PyCharm
import ddddocr
import cv2

det = ddddocr.DdddOcr(det=True)
image_path = r'E:\person code\SpiderCollection\bilibili\image\586cf9983a6001b38d9784f958a5b51b.jpg'

with open(image_path, 'rb') as f:
    image = f.read()

poses = det.detection(image)
print(poses)

im = cv2.imread(image_path)

for box in poses:
    x1, y1, x2, y2 = box
    im = cv2.rectangle(im, (x1, y1), (x2, y2), color=(0, 0, 255), thickness=2)

cv2.imwrite("result.jpg", im)