#!/usr/bin/env python

# -*- coding: utf-8 -*-

"""
@author: jiajia
@file: mode_one.py
@time: 2020/8/31 9:16
"""
import random

from bilibili.config import CODE_WIDTH, CODE_HEIGHT, CONFIRM_START_POINT, CODE_START_POINT
from bilibili.chinese_select.yolo.src import orientation
from bilibili.chinese_select.yolo.src import discern
from bilibili.chinese_select.yolo.src.tool import draw


def run_click(path):
    """方式一"""
    result = discern.text_predict(orientation.location_predict(path), path)
    draw(path, result)
    return result


def generate_click_points(res):
        print(res)
        contains = dict()
        content = ""
        points = []
        for info in res:
            if info["classes"] == "title":
                content = info["content"]
            else:
                contains[info["content"]] = info["crop"]
        else:
            click_list = list()
            # 生成要点击汉字的坐标信息
            for str_ in content:
                crop = contains[str_]
                # point_x 和 point_y 就是点击的坐标，需要保存起来，生成轨迹的时候需要
                point_x = crop[0] + random.randint(0, crop[2] - crop[0])
                point_y = crop[1] + random.randint(0, crop[3] - crop[1])
                click_list.append((point_x, point_y))
                h = point_x / CODE_WIDTH * 100
                u = point_y / CODE_HEIGHT * 100
                points.append({
                    "x": int(h * 100),
                    "y": int(u * 100),
                    "t": 0,
                    "dt": random.randint(500, 999)
                })
            else:
                point_x = CONFIRM_START_POINT[0] + random.randint(10, 122)
                point_y = CONFIRM_START_POINT[1] + random.randint(10, 42)
                click_list.append((point_x, point_y))
                # 添加点击确认的坐标信息
                points.append({
                    "x": point_x,
                    "y": point_y,
                    "t": 3,
                    "dt": random.randint(500, 1200)
                })
            return click_list, points


if __name__ == '__main__':

    import time
    import random
    path = "test/image.jpg"
    start = time.time()
    res = run_click(path)
    print(res)
    print("识别耗时为：", time.time() - start)
    # draw(path, res)
    print(generate_click_points(res))
