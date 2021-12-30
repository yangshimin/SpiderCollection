# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 12/30/21
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : d.py
# @Software: PyCharm
import requests

data = "d=vvN0vDXo4W0Yzf8nxcnfUyrDC4jQvRQ37HxZxQjMI29NaWOjMzM.oP7ozWFl7DMbUsyLiKA2YBN3GoN1ZBn72gUVuerWeDPe.QFpmeCDNh3J3%2BSDwi7EkWcN28yTfJe3tEuXv%2BsBIl7dzwDv.dz0%2BG%2BsC1MbSeXJ7Q1imOPawFPFeaiRFu.v9QEbJ6yEp4O2NoOsV.LXnGYF2iGah0Lb7vlaR3.EZku9VLBuj8fHwRDVypp.M6QEomxffUCoFE3XV0oT6LnjmqqLl0%2BJaA%2Bg%2BEH88Pqi8vOn7cV4EZUKRCNlEOj4.DCbZkIyqKFNypAGesn99Gn6iyq0dp3oZEj%2FyXfaUxubYX71VNspZoDTxxx6CaqKXlu%2FfoPVUS9UyIlzuj1bCO1iYmgevwc8wdlTnPPelumbsxPTaToqRtGRCnqjFmVZAU%2F4CBJ9mcN1FjeCaqiJQfg9jtf0ovXzUSQF%2BL4Q7xLdtEkX626ScertJ9RnF3QFZNiWEex1X7Te2f7pHXzWtSuG1CQRrANsq2K8Zu87%2FjkQG9O.08jQ3UaQwp%2FI.bszdr2GbJpeOMbzWDK.L07li2kUzkEvvQVzTytmoCj33121Fx6Wmaf.z4whxIrJ%2BUp6ZEkwMSWty41bz2LmI22brniWkXfzoZ4Ck7eExJalZmDqF7%2Be%2BwA8N2RPIF9Y%2Fj4HPM1BymjVpfCA%2Fo%2FqDdIOUlIDwvybCP7TKvWE1U8TDA4y6qfjwC2kIREoK2hNuxaUGprL6y6Q726vXHt9nDBz1ZyYfM%2BJSml9Wv0ym.2bGCC6a4zqot8.Rfrlt%2F2di%2F8gZXcGWuBilqnNbr7l%2BWhduA9JT6O8rbb0I8IhBK72bDBKFj6WIZ6eHl9elmGd4ElfMxPEv9Nkp2JbJx2Vc%2Fz8d4WzojooWwlUHue2jMPp2Oe3CBb7DjDPd76r66fCqqNZ&v=a02527b8&cb=__wmjsonp_b6466a0"
url = "https://ac.dun.163yun.com/v3/d"

headers = {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9,en-GB;q=0.8,en;q=0.7,ja;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Length": "1130",
    "Content-type": "application/x-www-form-urlencoded",
    "Host": "ac.dun.163yun.com",
    "Origin": "https://dun.163.com",
    "Pragma": "no-cache",
    "Referer": "https://dun.163.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
}

res = requests.post(url, data=data, headers=headers)
print(res.text)