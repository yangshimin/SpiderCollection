#!/usr/bin/env python

# -*- coding: utf-8 -*-

"""
@author: jiajia
@file: setting.py
@time: 2020/8/18 9:35
"""


class OPT(object):
    GPU = False
    TEXT_NAME = r".\yolo\config\text.jpg"
    with open(r".\yolo\config\characters.txt", 'r', encoding='utf-8') as fr:
        CHARACTERS = fr.read().replace('\n', "")


class yolo_opt(OPT):
    """预测模块参数"""
    class_path = r".\yolo\config\classes.names"

    model_def = r".\yolo\config\yolo3.cfg"
    weights_path = r".\yolo\model\yolov3_ckpt.pth"

    # 使用yolo tiny  速度快  检测准确率降低
    # model_def = "config/yolov3-tiny.cfg"
    # weights_path = "model/yolov3_ckpt_tiny.pth"

    # 一些参数
    img_size = 416
    conf_thres = 0.8
    nms_thres = 0.4
    batch_size = 1
    n_cpu = 0


class crnn_opt(OPT):
    """crnn识别标题模块"""
    LSTMFLAG = True
    ocrModel = r".\yolo\model\ocr-lstm.pth"
    alphabet = OPT.CHARACTERS
    nclass = len(alphabet) + 1


class cnn_opt(OPT):
    """cnn文字识别模块参数"""
    # 加载模型
    model_path = r".\yolo\model\cnn_iter.pth"

    WIDTH = 64
    HEIGHT = 64
    N_CLASS = len(OPT.CHARACTERS)


class kenlm_opt():
    """语序模型"""
    model_path = r'.\yolo\model\people_chars_lm.klm'
