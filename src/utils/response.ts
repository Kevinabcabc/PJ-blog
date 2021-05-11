import { Context } from 'koa';

// 枚举状态码
export enum StatusCode {
    OK = 200,			// 成功
    Created = 201,		// 创建成功
    Accepted = 202,		// 更新成功
    NoContent = 204		// 删除成功
};

// 规范返回数据
interface IRes {
    ctx: Context;
    statusCode?: number;
    data?: any;
    errorCode?: number;
    msg?: string;
}

const creatRes = (params: IRes) => {
    params.ctx.status = params.statusCode || StatusCode.OK;
    params.ctx.body = {
       error_code: params.errorCode || 0,
       data: params.data || null,
       msg: params.msg || ''
    }
};

export default creatRes;
