import os
import cv2
import sys
import logging
import requests
import numpy as np
from urllib.parse import urlparse, urljoin

from cv2 import IMREAD_COLOR

formatter = '%(asctime)s - %(filename)s[line:%(lineno)d] -%(levelname)s: %(message)s'
logging.basicConfig(level=logging.INFO, stream=sys.stdout, format=formatter)


class Slide(object):

    def __init__(self, gap, bg, gap_size=None, bg_size=None, out=None):
        """
        :param bg: 带缺口的图片链接或者url
        :param gap: 缺口图片链接或者url
        """
        self.img_dir = os.path.join(os.getcwd(), 'img')
        if not os.path.exists(self.img_dir):
            os.makedirs(self.img_dir)

        bg_resize = bg_size if bg_size else (600, 300)
        gap_size = gap_size if gap_size else (90, 300)
        self.bg = self.check_is_img_path(bg, 'bg', resize=bg_resize)
        self.gap = self.check_is_img_path(gap, 'gap', resize=gap_size)
        self.out = out if out else os.path.join(self.img_dir, 'out.jpg')

    @staticmethod
    def check_is_img_path(img, img_type, resize):
        if img.startswith('http'):
            headers = {
                "authority": "castatic.fengkongcloud.cn",
                "method": "GET",
                "path": urlparse(img).path,
                "scheme": "https",
                "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "referer": "https://www.ishumei.com/trial/captcha.html",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                              "Chrome/91.0.4472.164 Safari/537.36",
            }
            img_res = requests.get(img, headers=headers)
            if img_res.status_code == 200:
                img_path = f'./img/{img_type}.jpg'
                image = np.asarray(bytearray(img_res.content), dtype="uint8")
                image = cv2.imdecode(image, cv2.IMREAD_COLOR)
                if resize:
                    image = cv2.resize(image, dsize=resize)
                cv2.imwrite(img_path, image)
                return img_path
            else:
                raise Exception(f"保存{img_type}图片失败")
        else:
            return img

    @staticmethod
    def clear_white(img):
        """清除图片的空白区域，这里主要清除滑块的空白"""
        img = cv2.imread(img)
        rows, cols, channel = img.shape
        min_x = 255
        min_y = 255
        max_x = 0
        max_y = 0
        for x in range(1, rows):
            for y in range(1, cols):
                t = set(img[x, y])
                if len(t) >= 2:
                    if x <= min_x:
                        min_x = x
                    elif x >= max_x:
                        max_x = x

                    if y <= min_y:
                        min_y = y
                    elif y >= max_y:
                        max_y = y
        img1 = img[min_x:max_x, min_y: max_y]
        return img1

    def template_match(self, tpl, target):
        th, tw = tpl.shape[:2]
        result = cv2.matchTemplate(target, tpl, cv2.TM_CCOEFF_NORMED)
        # 寻找矩阵(一维数组当作向量,用Mat定义) 中最小值和最大值的位置
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        tl = max_loc
        br = (tl[0] + tw, tl[1] + th)
        # 绘制矩形边框，将匹配区域标注出来
        # target：目标图像
        # tl：矩形定点
        # br：矩形的宽高
        # (0,0,255)：矩形边框颜色
        # 1：矩形边框大小
        cv2.rectangle(target, tl, br, (0, 0, 255), 2)
        cv2.imwrite(self.out, target)
        return tl[0]

    @staticmethod
    def image_edge_detection(img):
        edges = cv2.Canny(img, 100, 200)
        return edges

    def discern(self):
        img1 = self.clear_white(self.gap)
        img1 = cv2.cvtColor(img1, cv2.COLOR_RGB2GRAY)
        slide = self.image_edge_detection(img1)

        back = cv2.imread(self.bg, 0)
        back = self.image_edge_detection(back)

        slide_pic = cv2.cvtColor(slide, cv2.COLOR_GRAY2RGB)
        back_pic = cv2.cvtColor(back, cv2.COLOR_GRAY2RGB)
        x = self.template_match(slide_pic, back_pic)
        # 输出横坐标, 即 滑块在图片上的位置
        return x


if __name__ == "__main__":
    slide_info = {
        "code": 1100,
        "message": "success",
        "requestId": "bf59251b6efff021381098537c9b3fea",
        "riskLevel": "PASS",
        "score": 0,
        "detail": {
            "bg": "/crb/set-000006/v2/5f826fe10cdb401fbe653385b2df26c9_bg.jpg",
            "bg_height": 300,
            "bg_width": 600,
            "domains": ["castatic.fengkongcloud.cn", "castatic.fengkongcloud.com", "castatic-a.fengkongcloud.com", "castatic2.fengkongcloud.com"],
            "fg": "/crb/set-000006/v2/5f826fe10cdb401fbe653385b2df26c9_fg.png",
            "k": "UUbQaqa0BGA=",
            "l": 8,
            "rid": "202108151454447e05bf60ee1c1326b5"
        }
}
    slide_app = Slide(urljoin('https://castatic.fengkongcloud.cn', slide_info['detail']['fg']),
                      urljoin('https://castatic.fengkongcloud.cn', slide_info['detail']['bg']))
    print(slide_app.discern())
