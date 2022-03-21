# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 2020/10/15
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : track.py.py
# @Software: PyCharm
import time
import random
import numpy as np
from config import CODE_START_POINT, CONFIRM_START_POINT


def ease_out_bounce(x):
    n1 = 7.5625
    d1 = 2.75
    if x < 1 / d1:
        return n1 * x * x
    elif x < 2 / d1:
        x -= 1.5 / d1
        return n1 * x*x + 0.75
    elif x < 2.5 / d1:
        x -= 2.25 / d1
        return n1 * x*x + 0.9375
    else:
        x -= 2.625 / d1
        return n1 * x*x + 0.984375


def get_tracks(distance, seconds, ease_func):
    # tracks = [0]
    offsets = []
    # 返回100组数据
    for t in np.arange(0.0, seconds, 0.014):
        offset = round(ease_func(t/seconds) * distance)
        # tracks.append(int(offset - offsets[-1]))
        offsets.append(int(offset))
    return offsets


def get_time(length):
    time_list = []
    current_time = int(time.time() * 1000)
    for i in range(length - 3):
        if i == 0:
            value = 0
        elif i == 1:
            value = random.randint(20, 30)
        elif i == 94:
            value = random.randint(200, 300)
        elif i > 80:
            value = random.randint(15, 20)
        else:
            value = random.randint(7, 10)

        temp_time = current_time + value
        time_list.append(temp_time)
        current_time = temp_time

    time_list.append(time_list[-1] + random.randint(15, 20))
    time_list.append(time_list[-1] + random.randint(20, 30))
    time_list.append(time_list[-1] + random.randint(5, 10))
    return time_list


def get_track(end_point_area):
    """参数为无感验证点击的区域, 例如[(140, 595), (436, 630)]"""
    start_point = (end_point_area[1][0] + random.randint(200, 300),
                   end_point_area[1][1] + random.randint(200, 300))

    stop_point = (random.randint(end_point_area[0][0], end_point_area[1][0]),
                  random.randint(end_point_area[0][1], end_point_area[1][1]))

    x_offset = get_tracks(stop_point[0] - start_point[0], 1, ease_out_bounce)
    y_offset = get_tracks(stop_point[1] - start_point[1], 1, ease_out_bounce)
    time_list = get_time(len(x_offset))

    data_contains = list()
    if len(x_offset) == len(time_list) and len(x_offset) == len(y_offset):
        for index, value in enumerate(x_offset):
            # data_contains.append(["move",
            #                       start_point[0] + value,
            #                       start_point[1] + y_offset[index],
            #                       time_list[index],
            #                      "pointermove"])
            if index == 0:
                data_contains.append(["move",
                                      [start_point[0], start_point[1]],
                                      time_list[index]])
            else:
                data_contains.append(["move",
                                      [x_offset[index-1] - x_offset[index], y_offset[index-1] - y_offset[index]],
                                      time_list[index]])

        # 手动添加的轨迹点
        data_contains.append(["move", [1, 0], random.randint(8, 15)])

        # 添加focus, down, focus, up事件轨迹
        event_list = ["down", "focus", "up"]
        for index, event in enumerate(event_list):
            if event == "focus":
                data_contains.append([event, random.randint(1, 3)])
            else:
                data_contains.append([event, [0, 0], random.randint(280, 380)])

    return data_contains


def get_click_track(points):
    """点击点选验证码上的汉字和最后点击确认这期间的鼠标轨迹"""
    # 随机设置一个起始坐标点
    start_point = (
        CONFIRM_START_POINT[0] + random.randint(100, 150),
        CONFIRM_START_POINT[1] + random.randint(100, 250)
    )

    data_contains = list()
    for click_index, point in enumerate(points):
        stop_point = point
        # 生成移动时的偏移量
        x_offset = get_tracks(stop_point[0] - start_point[0], 1, ease_out_bounce)
        y_offset = get_tracks(stop_point[1] - start_point[1], 1, ease_out_bounce)
        time_list = get_time(len(x_offset))

        # 生成坐标点
        t = 0
        if len(x_offset) == len(time_list) and len(x_offset) == len(y_offset):
            for index, value in enumerate(x_offset):
                point_x = start_point[0] + value
                point_y = start_point[1] + y_offset[index]
                t = time_list[index]
                data_contains.append(["move", point_x, point_y, t, "pointermove"])
            else:
                t = t + random.randint(2, 10)
                data_contains.append(["move", point[0], point[1], t, "pointermove"])
                t = t + random.randint(50, 80)
                data_contains.append(["down", point[0], point[1], t, "pointerdown"])
                if click_index == len(points) - 1:
                    # 点击确认时有个focus
                    t = t + random.randint(2, 5)
                    data_contains.append(["focus", t])
                data_contains.append(["up", point[0], point[1], t + 25, "pointerup"])

        start_point = point

    return data_contains


if __name__ == "__main__":
    track_infos = [
        (794, 674),
        (882, 564),
        (871, 486),
        (704, 662),
        (898, 778)
    ]
    print(get_click_track(track_infos))
