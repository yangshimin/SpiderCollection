# !/usr/bin/python3
# -*- coding: utf-8 -*-
# @Time    : 03/16/22
# @Author  : YangShiMin
# @Email   : fausty@synnex.com
# @File    : verify.py
# @Software: PyCharm
import re
import time
import json
import logging
import execjs
import requests
from datetime import datetime
from urllib.parse import urlparse

logging.getLogger("main")


class Verify(object):

    def __init__(self, url):
        self.s = requests.Session()
        self.block_page_url = url
        self.base_timestamp = int(time.time() * 1000)
        self.uuid = self.get_uuid()
        self.tag = "v7.2.4"
        self.ftag = "245"
        self.app_id = 'PXnp9B16Cq'
        self.bundle_url = "https://collector-pxnp9b16cq.px-cloud.net/assets/js/bundle"
        self.user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
                          "Chrome/99.0.4844.74 Safari/537.36"
        self.app_version = "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) " \
                           "Chrome/99.0.4844.74 Safari/537.36"

    @staticmethod
    def execute_javascript(js_code, call_params):
        ctx = execjs.compile(js_code)
        return ctx.call(call_params['call_name'], *call_params['call_arguments'])

    def get_uuid(self):
        uuid_pattern = re.search(r'uuid=(.*?)&', self.block_page_url)
        if not uuid_pattern:
            raise Exception("解析uuid失败")
        return uuid_pattern.group(1)

    def get_captcha_page(self):
        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;"
                      "q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Host": "www.walmart.ca",
            "Pragma": "no-cache",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.51 Safari/537.36",
        }

        res = self.s.get(self.block_page_url, headers=headers)
        if res.status_code == 200:
            logging.info("请求验证码页面成功")
        else:
            logging.error("请求验证码页面失败")

    def request_bundle1(self):
        headers = {
            "authority": urlparse(self.bundle_url).netloc,
            "method": "POST",
            "path": urlparse(self.bundle_url).path,
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://www.walmart.ca",
            "pragma": "no-cache",
            "referer": "https://www.walmart.ca/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.51 Safari/537.36",
        }
        default_data = [{
            "t": "PX10816",
            "d": {
                "PX10041": None,
                "PX10088": True,
                "PX10094": self.base_timestamp,
                "PX10206": self.uuid,
                "PX10987": None,
                "PX10970": 3600,
                "PX11004": self.base_timestamp + 3,
                "PX10360": self.block_page_url,
                "PX10929": 0,
                "PX11186": "Win32",
                "PX10622": 0,
                "PX11031": "PX10463",
                "PX11073": False,
                "PX10384": "pxhc",
                "PX10272": 3211  # 该对象表示从某一时刻（某一时刻通常是 navigationStart 事件发生时刻）到调用该方法时刻的毫秒数。
            },
        }]
        js_code = open("pc.js").read()
        pc_value = self.execute_javascript(js_code, {
            "call_name": "qn",
            "call_arguments": (json.dumps(default_data), ":".join([self.uuid, self.tag, self.ftag]))
        })
        payload_value = self.execute_javascript(js_code, {
            "call_name": "xp",
            "call_arguments": (default_data, {
                "vid": "",
                "tag": self.tag,
                "appID": self.app_id,
                "cu": self.uuid,
                "cs": None,
                "pc": pc_value
            }, self.uuid)
        })
        post_data = {
            "payload": payload_value,
            "appId": self.app_id,
            "tag": self.tag,
            "uuid": self.uuid,
            "ft": self.ftag,
            "seq": 0,
            "en": "NTA",
            "pc": pc_value,
            "rsc": 1,
        }

        post_res = self.s.post(self.bundle_url, data=post_data, headers=headers)
        if post_res.status_code == 200:
            logging.info("post bundle成功")
            return post_res.text
        else:
            logging.error("post bundle失败")

    def request_bundle2(self, bundle1_data):
        headers = {
            "authority": urlparse(self.bundle_url).netloc,
            "method": "POST",
            "path": urlparse(self.bundle_url).path,
            "scheme": "https",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://www.walmart.ca",
            "pragma": "no-cache",
            "referer": "https://www.walmart.ca/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                          "Chrome/99.0.4844.51 Safari/537.36",
        }
        sid = re.search(r'sid\|(.*?)"', bundle1_data).group(1)
        cls = re.search(r'cls\|(.*?)"', bundle1_data).group(1)
        sts = re.search(r'sts\|(.*?)"', bundle1_data).group(1)
        wcs = re.search(r'wcs\|(.*?)"', bundle1_data).group(1)
        drc = re.search(r'drc\|(.*?)"', bundle1_data).group(1)
        cts = re.search(r'cts\|(.*?)\|', bundle1_data).group(1)
        cs = re.search(r'cs\|(.*?)"', bundle1_data).group(1)
        vid = re.search(r'vid\|(.*?)"', bundle1_data).group(1)
        ci = re.search(r'ci\|.*?\|(.*?)\|', bundle1_data).group(1)

        js_code = open("pc.js").read()

        px10522_data = self.execute_javascript(js_code, {
            "call_name": "j",
            "call_arguments": (self.user_agent, self.uuid)
        })
        px10464_data = self.execute_javascript(js_code, {
            "call_name": "j",
            "call_arguments": (self.user_agent, vid)
        })
        px10080_data = self.execute_javascript(js_code, {
            "call_name": "j",
            "call_arguments": (self.user_agent, sid)
        })
        start_ts = int(time.time() * 1000)
        temp_data = {
            "PX10249": '64556c77',
            "PX10238": "",
            "PX10995": "10207b2f",
            "PX10567": "10207b2f",
            "PX11192": '90e65465',
            "PX10065": True,
            "PX11153": True,
            "PX10509": True,
            "PX10227": True,
            "PX10364": "",
            "PX10379": "9f762773",
            "PX11072": "dae10548",
            "PX11115": "",
            "PX10601": "a3d12c4",
            "PX10680": "82002457",
            "PX11211": "a3d12c4",
            "PX10757": True,
            "PX11081": True,
            "PX10232": True,
            "PX10926": True,
            "PX10239": 16608324,
            "PX10267": 4294705152,
            "PX10551": 22263500,
            "PX10558": datetime.now().strftime("%a %b %d %Y %H:%M:%S  GMT+0800 (中国标准时间)"),
            "PX10236": False,
            "PX10400": False,
            "PX10530": False,
            "PX11060": True,
            "PX10801": 0,
            "PX10394": False,
            "PX10058": "visible",
            "PX11123": False,
            "PX10096": 0,
            "PX10872": 1920,
            "PX11028": True,
            "PX10366": 1040,
            "PX10585": "missing",
            "PX10976": True,
            "PX10250": True,
            "PX10259": False,
            "PX10156": True,
            "PX10774": True,
            "PX10750": False,
            "PX11158": 0,
            "PX10213": True,
            "PX10283": True,
            "PX10116": True,
            "PX11176": True,
            "PX10351": False,
            "PX10712": 3,
            "PX10555": 5,
            "PX10347": 0,
            "PX10119": 0,
            "PX10365": True,
            "PX10010": False,
            "PX10225": False,
            "PX10855": False,
            "PX11065": False,
            "PX10456": False,
            "PX10441": False,
            "PX10098": False,
            "PX10557": False,
            "PX10170": False,
            "PX10824": False,
            "PX10087": False,
            "PX11042": False,
            "PX11002": True,
            "PX10056": None,
            "PX10410": False,
            "PX10482": None,
            "PX11018": False,
            "PX10905": None,
            "PX10362": None,
            "PX10992": None,
            "PX10218": 'e0eaf10e',
            "PX10162": '7d688b1b',
            "PX10940": '7766a52d',
            "PX11209": '180dd7e3',
            "PX10498": '6a90378d',
            "PX11055": '144|66|66|172|80',
            "PX10422": 111,
            "PX10316": True,
            "PX10659": True,
            "PX11148": False,
            "PX10742": False,
            "PX10323": 1,
            "PX10846": 1,
            "PX11015": "",
            "PX10599": ['loadTimes', 'csi', 'app', 'runtime'],
            "PX10790": ['PDF Viewer', 'Chrome PDF Viewer', 'Chromium PDF Viewer', 'Microsoft Edge PDF Viewer',
                        'WebKit built-in PDF'],
            "PX11010": 5,
            "PX11043": True,
            "PX10289": True,
            "PX11075": None,
            "PX10093": True,
            "PX10604": True,
            "PX10296": 'zh-CN',
            "PX11186": 'Win32',
            "PX10397": ['zh-CN'],
            "PX10472": self.user_agent,
            "PX10758": True,
            "PX10099": -480,
            "PX10336": 8,
            "PX10373": 1,
            "PX10914": None,
            "PX10802": 'Gecko',
            "PX10628": '20030107',
            "PX11039": self.app_version,
            "PX10174": True,
            "PX10547": True,
            "PX10775": 2,
            "PX10539": 'Netscape',
            "PX10516": None,
            "PX10189": 'Mozilla',
            "PX10390": True,
            "PX10963": 200,
            "PX10081": False,
            "PX10399": 8.65,
            "PX10273": "4g",
            "PX10595": True,
            "PX10822": True,
            "PX11205": True,
            "PX10561": 1920,
            "PX10499": 1080,
            "PX10843": 1920,
            "PX10850": 1040,
            "PX11113": '1920X1080',
            "PX10724": 24,
            "PX10089": 24,
            "PX10204": 503,
            "PX11138": 937,
            "PX11170": 0,
            "PX11174": 0,
            "PX10243": True,
            "PX10800": False,
            "PX10929": 0,
            "PX10248": 2,
            "PX10705": 'Error\n    at wn (https://www.walmart.ca/px/PXnp9B16Cq/init.js:791:26)\n    at ie (https://www.walmart.ca/px/PXnp9B16Cq/init.js:1649:36)\n    at re (https://www.walmart.ca/px/PXnp9B16Cq/init.js:1607:34)\n    at https://www.walmart.ca/px/PXnp9B16Cq/init.js:1604:37',
            "PX10360": self.block_page_url,
            "PX10311": [],
            "PX10744": "",
            "PX10046": False,
            "PX10565": True,
            "PX10141": sts,  # 第一次请求返回的sts
            "PX10418": cls,  # 第一次请求中返回的cls
            "PX11147": None,
            "PX11181": drc,  # 第一次请求中返回的drc
            "PX11102": None,
            "PX11135": [],  # 检查input标签的一些属性, 需要多次验证是否为空值
            "PX10891": 1,
            "PX10522": px10522_data,
            "PX10840": wcs,  # 第一次请求中的wcs
            "PX10464": px10464_data,
            "PX10080": px10080_data,
            "PX10622": 1,
            "PX10272": 4211,
            "PX10970": 3600,
            "PX10094": start_ts,
            "PX10041": start_ts + 269,
            "PX10028": None,
            "PX10088": True,
            "PX10206": self.uuid,
            "PX10276": None,
            "PX10384": "pxhc",
            "PX11004": start_ts + 896,
            "PX11031": "PX10463",
            "PX11073": False
        }
        add_key = self.execute_javascript(js_code, {
            "call_name": "it",
            "call_arguments": (temp_data['PX10418'], int(temp_data['PX10141']) % 10 + 2)
        })
        add_value = self.execute_javascript(js_code, {
            "call_name": "it",
            "call_arguments": (temp_data['PX10418'], int(temp_data['PX10141']) % 10 + 1)
        })
        temp_data[add_key] = add_value
        default_data = [{
            "t": "PX10303",
            "d": temp_data
        }]

        pc_value = self.execute_javascript(js_code, {
            "call_name": "qn",
            "call_arguments": (json.dumps(default_data), ":".join([self.uuid, self.tag, self.ftag]))
        })
        payload_value = self.execute_javascript(js_code, {
            "call_name": "xp",
            "call_arguments": (default_data, {
                "vid": vid,
                "tag": self.tag,
                "appID": self.app_id,
                "cu": self.uuid,
                "cs": cs,
                "pc": pc_value
            }, self.uuid)
        })
        post_data = {
            "payload": payload_value,
            "appId": self.app_id,
            "tag": self.tag,
            "uuid": self.uuid,
            "ft": self.ftag,
            "seq": 1,
            "en": 'NTA',
            "cs": cs,
            "pc": pc_value,
            "sid": sid,
            "vid": vid,
            "ci": ci,
            "cts": cts,
        }

        post_res = self.s.post(self.bundle_url, data=post_data, headers=headers)
        if post_res.status_code == 200:
            logging.info("post bundle2成功")
            return post_res.text
        else:
            logging.error("post bundle2失败")

    def request_bundle3(self, bundle2_data):
        default_data = [
    {
        "t": "PX10194",
        "d": {
            "PX10714": "1647855824395",
            "PX10187": "126.86972438948578",
            "PX10831": "2dce8c55c6897067fdf0c76ddf6e6d50",
            "PX10820": "f4e11c84e5fbb1eb1eb638b5e126a79c",
            "PX10185": [],
            "PX10020": True,
            "PX10061": "71384822a7ec6fa2ea82312226ce1d45",
            "PX11016": "WebKit",
            "PX10529": [],
            "PX10279": "WebKit WebGL",
            "PX10753": "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
            "PX10246": [
                "ANGLE_instanced_arrays",
                "EXT_blend_minmax",
                "EXT_color_buffer_half_float",
                "EXT_disjoint_timer_query",
                "EXT_float_blend",
                "EXT_frag_depth",
                "EXT_shader_texture_lod",
                "EXT_texture_compression_bptc",
                "EXT_texture_compression_rgtc",
                "EXT_texture_filter_anisotropic",
                "WEBKIT_EXT_texture_filter_anisotropic",
                "EXT_sRGB",
                "KHR_parallel_shader_compile",
                "OES_element_index_uint",
                "OES_fbo_render_mipmap",
                "OES_standard_derivatives",
                "OES_texture_float",
                "OES_texture_float_linear",
                "OES_texture_half_float",
                "OES_texture_half_float_linear",
                "OES_vertex_array_object",
                "WEBGL_color_buffer_float",
                "WEBGL_compressed_texture_s3tc",
                "WEBKIT_WEBGL_compressed_texture_s3tc",
                "WEBGL_compressed_texture_s3tc_srgb",
                "WEBGL_debug_renderer_info",
                "WEBGL_debug_shaders",
                "WEBGL_depth_texture",
                "WEBKIT_WEBGL_depth_texture",
                "WEBGL_draw_buffers",
                "WEBGL_lose_context",
                "WEBKIT_WEBGL_lose_context",
                "WEBGL_multi_draw"
            ],
            "PX10871": [
                "[1, 1]",
                "[1, 1024]",
                8,
                "yes",
                8,
                24,
                8,
                16,
                32,
                16384,
                1024,
                16384,
                16,
                16384,
                30,
                16,
                16,
                4096,
                "[32767, 32767]",
                "no_fp",
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127,
                23,
                127,
                127
            ],
            "PX11077": "Google Inc. (Intel)",
            "PX10165": "ANGLE (Intel, Intel(R) Iris(R) Plus Graphics 650 Direct3D11 vs_5_0 ps_5_0, D3D11-26.20.100.6912)",
            "PX10244": "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
            "PX10648": "fde4b9aa014d208f6813b154f7499248",
            "PX11178": 4299,
            "PX11154": [
                "_pxAppId",
                "_pxJsClientSrc",
                "_pxFirstPartyEnabled",
                "_pxHostUrl",
                "_pxreCaptchaTheme",
                "_PXnp9B16Cq",
                "_satellite",
                "__satelliteLoaded",
                "_sdiToolkit",
                "_pxToggleOpenForm",
                "_pxUuidCopyToClipboard",
                "_pxSubmitForm",
                "_pxItemSelected",
                "_pxAction",
                "_pxMobile",
                "_np9B16Cqhandler",
                "_pxInit",
                "_uxa",
                "_comscore",
                "_fbq"
            ],
            "PX10560": [],
            "PX10950": "Error at wn (https://www.walmart.ca/px/PXnp9B16Cq/init.js:720:19) at Qn (https://www.walmart.ca/px/PXnp9B16Cq/init.js:732:21) at su (https://www.walmart.ca/px/PXnp9B16Cq/init.js:4753:30) at https://www.walmart.ca/px/PXnp9B16Cq/init.js:4861:28 at OfflineAudioContext.Ic.e.oncomplete (https://www.walmart.ca/px/PXnp9B16Cq/init.js:4286:26)",
            "PX11012": True,
            "PX11173": 33,
            "PX10177": "ed75f0aaa70ef4a32a2b69d0aadb99dc",
            "PX10109": [
                "Arial",
                "Arial Black",
                "Arial Narrow",
                "Book Antiqua",
                "Bookman Old Style",
                "Calibri",
                "Cambria",
                "Cambria Math",
                "Century",
                "Century Gothic",
                "Century Schoolbook",
                "Comic Sans MS",
                "Consolas",
                "Courier",
                "Courier New",
                "Georgia",
                "Helvetica",
                "Impact",
                "Lucida Bright",
                "Lucida Calligraphy",
                "Lucida Console",
                "Lucida Fax",
                "Lucida Handwriting",
                "Lucida Sans",
                "Lucida Sans Typewriter",
                "Lucida Sans Unicode",
                "Microsoft Sans Serif",
                "Monotype Corsiva",
                "MS Gothic",
                "MS PGothic",
                "MS Reference Sans Serif",
                "MS Sans Serif",
                "MS Serif",
                "Palatino Linotype",
                "Segoe Print",
                "Segoe Script",
                "Segoe UI",
                "Segoe UI Light",
                "Segoe UI Semibold",
                "Segoe UI Symbol",
                "Tahoma",
                "Times",
                "Times New Roman",
                "Trebuchet MS",
                "Verdana",
                "Wingdings",
                "Wingdings 2",
                "Wingdings 3",
                "Agency FB",
                "Algerian",
                "Baskerville Old Face",
                "Bauhaus 93",
                "Bell MT",
                "Berlin Sans FB",
                "Bernard MT Condensed",
                "Blackadder ITC",
                "Bodoni MT",
                "Bodoni MT Black",
                "Bodoni MT Condensed",
                "Bookshelf Symbol 7",
                "Bradley Hand ITC",
                "Broadway",
                "Brush Script MT",
                "Californian FB",
                "Calisto MT",
                "Candara",
                "Castellar",
                "Centaur",
                "Chiller",
                "Colonna MT",
                "Constantia",
                "Cooper Black",
                "Copperplate Gothic",
                "Copperplate Gothic Light",
                "Corbel",
                "Curlz MT",
                "Ebrima",
                "Edwardian Script ITC",
                "Elephant",
                "Engravers MT",
                "FangSong",
                "Felix Titling",
                "Footlight MT Light",
                "Forte",
                "Freestyle Script",
                "French Script MT",
                "Gabriola",
                "Gigi",
                "Gill Sans MT",
                "Gill Sans MT Condensed",
                "Goudy Old Style",
                "Goudy Stout",
                "Haettenschweiler",
                "Harrington",
                "High Tower Text",
                "Imprint MT Shadow",
                "Informal Roman",
                "Jokerman",
                "Juice ITC",
                "KaiTi",
                "Kristen ITC",
                "Kunstler Script",
                "Magneto",
                "Maiandra GD",
                "Malgun Gothic",
                "Marlett",
                "Matura MT Script Capitals",
                "Microsoft Himalaya",
                "Microsoft JhengHei",
                "Microsoft New Tai Lue",
                "Microsoft PhagsPa",
                "Microsoft Tai Le",
                "Microsoft YaHei",
                "Microsoft Yi Baiti",
                "MingLiU_HKSCS-ExtB",
                "MingLiU-ExtB",
                "Mistral",
                "Modern No. 20",
                "Mongolian Baiti",
                "MS Reference Specialty",
                "MS UI Gothic",
                "MT Extra",
                "MV Boli",
                "Niagara Engraved",
                "Niagara Solid",
                "NSimSun",
                "Old English Text MT",
                "Onyx",
                "Palace Script MT",
                "Papyrus",
                "Parchment",
                "Perpetua",
                "Perpetua Titling MT",
                "Playbill",
                "PMingLiU-ExtB",
                "Poor Richard",
                "Pristina",
                "Ravie",
                "Rockwell",
                "Rockwell Condensed",
                "Showcard Gothic",
                "SimHei",
                "SimSun",
                "SimSun-ExtB",
                "Snap ITC",
                "Stencil",
                "Sylfaen",
                "Tempus Sans ITC",
                "Tw Cen MT",
                "Tw Cen MT Condensed",
                "Viner Hand ITC",
                "Vivaldi",
                "Vladimir Script",
                "Wide Latin"
            ],
            "PX10325": "{\"tan(E)\":-0.4505495340698077,\"tan(LN10)\":-1.113407146813537,\"tan(LN2)\":0.8306408778607839,\"tan(LOG10E)\":0.4638290671606296,\"tan(LOG2E)\":7.763575670972184,\"tan(PI)\":-1.2246467991473532e-16,\"tan(SQRT1_2)\":0.854510432009602,\"tan(SQRT2)\":6.3341191670421955,\"sin(E)\":0.41078129050290885,\"sin(LN10)\":0.7439803369574931,\"sin(LN2)\":0.6389612763136348,\"sin(LOG10E)\":0.4207704833137573,\"sin(LOG2E)\":0.9918062443936637,\"sin(PI)\":1.2246467991473532e-16,\"sin(SQRT1_2)\":0.6496369390800625,\"sin(SQRT2)\":0.9877659459927356,\"exp(E)\":15.154262241479262,\"exp(LN10)\":10.000000000000002,\"exp(LN2)\":2,\"exp(LOG10E)\":1.5438734439711812,\"exp(LOG2E)\":4.232086106557082,\"exp(PI)\":23.140692632779267,\"exp(SQRT1_2)\":2.0281149816474726,\"exp(SQRT2)\":4.1132503787829275,\"atan(E)\":1.2182829050172777,\"atan(LN10)\":1.1610795826858162,\"atan(LN2)\":0.606111934732855,\"atan(LOG10E)\":0.4097167441090804,\"atan(LOG2E)\":0.9646843920620416,\"atan(PI)\":1.2626272556789115,\"atan(SQRT1_2)\":0.6154797086703874,\"atan(SQRT2)\":0.9553166181245093,\"acosh(E)\":1.6574544541530771,\"acosh(LN10)\":1.4762920118769467,\"acosh(LN2)\":null,\"acosh(LOG10E)\":null,\"acosh(LOG2E)\":0.9092999403866862,\"acosh(PI)\":1.811526272460853,\"acosh(SQRT1_2)\":null,\"acosh(SQRT2)\":0.881373587019543,\"asinh(E)\":1.725382558852315,\"asinh(LN10)\":1.5713088006770572,\"asinh(LN2)\":0.6470434810831891,\"asinh(LOG10E)\":0.4216856279881769,\"asinh(LOG2E)\":1.1625499729954618,\"asinh(PI)\":1.8622957433108482,\"asinh(SQRT1_2)\":0.6584789484624084,\"asinh(SQRT2)\":1.1462158347805889,\"atanh(E)\":null,\"atanh(LN10)\":null,\"atanh(LN2)\":0.8539880479975239,\"atanh(LOG10E)\":0.4651773501465964,\"atanh(LOG2E)\":null,\"atanh(PI)\":null,\"atanh(SQRT1_2)\":0.8813735870195432,\"atanh(SQRT2)\":null,\"expm1(E)\":14.154262241479262,\"expm1(LN10)\":9.000000000000002,\"expm1(LN2)\":1,\"expm1(LOG10E)\":0.5438734439711811,\"expm1(LOG2E)\":3.2320861065570816,\"expm1(PI)\":22.140692632779267,\"expm1(SQRT1_2)\":1.0281149816474726,\"expm1(SQRT2)\":3.113250378782928,\"log1p(E)\":1.3132616875182228,\"log1p(LN10)\":1.1947055233182953,\"log1p(LN2)\":0.5265890341390445,\"log1p(LOG10E)\":0.3606730780703395,\"log1p(LOG2E)\":0.8931019547207089,\"log1p(PI)\":1.4210804127942926,\"log1p(SQRT1_2)\":0.5347999967395705,\"log1p(SQRT2)\":0.881373587019543,\"sinh(E)\":7.544137102816975,\"sinh(LN10)\":4.950000000000001,\"sinh(LN2)\":0.75,\"sinh(LOG10E)\":0.44807597941469024,\"sinh(LOG2E)\":1.9978980091062795,\"sinh(PI)\":11.548739357257748,\"sinh(SQRT1_2)\":0.7675231451261164,\"sinh(SQRT2)\":1.935066822174357}",
            "PX10852": [
                "_satellite",
                "__satelliteLoaded",
                "_sdiToolkit",
                "_uxa",
                "_comscore",
                "_fbq",
                "ueto_563dfc578f"
            ],
            "PX11076": [
                "snap03925807511581565",
                "snap04723319258453984",
                "destination_publishing_iframe_walmart-wmi_0_name"
            ],
            "PX10095": [
                "webdriver"
            ],
            "PX11166": [
                "PDF Viewer::Portable Document Format::application/pdf~pdf::text/pdf~pdf",
                "Chrome PDF Viewer::Portable Document Format::application/pdf~pdf::text/pdf~pdf",
                "Chromium PDF Viewer::Portable Document Format::application/pdf~pdf::text/pdf~pdf",
                "Microsoft Edge PDF Viewer::Portable Document Format::application/pdf~pdf::text/pdf~pdf",
                "WebKit built-in PDF::Portable Document Format::application/pdf~pdf::text/pdf~pdf"
            ],
            "PX10669": 1,
            "PX10401": 4,
            "PX10707": True,
            "PX11023": True,
            "PX11056": True,
            "PX10024": False,
            "PX10918": "missing",
            "PX10158": True,
            "PX10958": "fd7149bbfb316699ef918fa7bb7510a8",
            "PX10017": "d41d8cd98f00b204e9800998ecf8427e",
            "PX10263": "fd7149bbfb316699ef918fa7bb7510a8",
            "PX10159": 13986,
            "PX11140": 2,
            "PX10194": [],
            "PX10561": 1920,
            "PX10499": 1080,
            "PX10843": 1920,
            "PX11113": "1920X1080",
            "PX10089": 24,
            "PX10724": 24,
            "PX10850": 1040,
            "PX10567": "10207b2f",
            "PX10296": "zh-CN",
            "PX11186": "Win32",
            "PX10472": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36",
            "PX10397": [
                "zh-CN"
            ],
            "PX10758": True,
            "PX10336": 8,
            "PX10099": -480,
            "PX10394": False,
            "PX10558": "Mon Mar 21 2022 17:43:44 GMT+0800 (中国标准时间)",
            "PX10250": True,
            "PX10249": "64556c77",
            "PX10267": 4294705152,
            "PX10162": "7d688b1b",
            "PX10622": 2,
            "PX10272": 554848,
            "PX11004": 1647856484736,
            "PX10206": "1cf08f24-a113-11ec-bac1-566b70446877",
            "PX10088": True,
            "PX11031": "PX10463",
            "PX10384": "pxhc",
            "PX11073": False,
            "PX10360": self.block_page_url
        }
    }
]


if __name__ == "__main__":
    app = Verify(
        "https://www.walmart.ca/blocked?url=L2VuL2lwL2dvb2dsZS1jaHJvbWVjYXN0LzYwMDAxOTg3NDY1MDI=&uuid=1cf08f24-a113-11ec-bac1-566b70446877&vid=&")
    bundle1_data = app.request_bundle1()
    app.request_bundle2(bundle1_data)
