# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 03/21/22
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : application.py
# @Software: PyCharm
import ddddocr
import cv2

det = ddddocr.DdddOcr(det=True)
image_path = r'C:\Users\fausty\Downloads\b.jpg'

im = cv2.imread(image_path)
with open(image_path, 'rb') as f:
    image = f.read()

poses = det.detection(image)
print(poses)

im = cv2.imread(image_path)

for box in poses:
    x1, y1, x2, y2 = box
    im = cv2.rectangle(im, (x1, y1), (x2, y2), color=(0, 0, 255), thickness=2)

cv2.imwrite("result.jpg", im)
