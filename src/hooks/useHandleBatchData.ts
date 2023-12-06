/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-async-promise-executor */
import { ElMessage } from "element-plus"
import { HandleData } from "./interface"

/**
 * @description 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {String} message 提示信息 (必传)
 * @param {String} confirmType icon类型 (不必传,默认为 warning)
 * @returns {Promise}
 */
export const useHandleBatchData = (
  api: (params: any) => Promise<any>,
  params: any = {},
  message?: string,
  confirmType: HandleData.MessageType = "warning"
) => {
  return new Promise(async (resolve, reject) => {
    const res = await api(params)
    if (!res) return reject(false)
    console.log(11, res)
    ElMessage({
      type: "success",
      message: `${res?.data}`
    })
    resolve(true)
  })
}
