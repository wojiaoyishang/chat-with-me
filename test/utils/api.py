from fastapi.responses import JSONResponse


class JSONResponseSuccess(JSONResponse):
    def __init__(self, code: int = 200, msg: str = '请求成功', status_code: int = 200,
                 success: bool = True, data=None,
                 **kwargs):
        content = {
            'success': success,
            'code': code,
            'msg': msg
        }
        if data is not None:
            content['data'] = data

        super().__init__(status_code=status_code, content=content, **kwargs)
        self.success = success
        self.code = code
        self.msg = msg
        self.data = data


class JSONResponseFail(JSONResponse):
    def __init__(self, code: int = 400, msg: str = '请求失败', status_code: int = 200,
                 success: bool = False, data=None, **kwargs):
        content = {
            'success': success,
            'code': code,
            'msg': msg
        }
        if data is not None:
            content['data'] = data

        super().__init__(status_code=status_code, content=content, **kwargs)
        self.success = success
        self.code = code
        self.msg = msg
        self.data = data


class JSONResponseError(JSONResponse):
    def __init__(self, code: int = 500, msg: str = '处理失败', status_code: int = 200,
                 success: bool = False, data=None, **kwargs):
        content = {
            'success': success,
            'code': code,
            'msg': msg
        }
        if data is not None:
            content['data'] = data

        super().__init__(status_code=status_code, content=content, **kwargs)
        self.success = success
        self.code = code
        self.msg = msg
        self.data = data
