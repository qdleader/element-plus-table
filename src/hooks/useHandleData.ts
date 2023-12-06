import { ElMessageBox, ElMessage } from "element-plus"
import { HandleData } from "./interface"

/**
 * @description 操作单条数据信息 (二次确认【删除、禁用、启用、重置密码】)
 * @param {Function} api 操作数据接口的api方法 (必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {String} message 提示信息 (必传)
 * @param {String} confirmType icon类型 (不必传,默认为 warning)
 * @param {String} toastMessage (不必传,默认为 warning)
 * @param {String} tipTitle (不必传,默认为 温馨提示)
 * @returns {Promise}
 */

interface Iobj {
  api: (params: any) => Promise<any>
  params: object
  message: string
  confirmType?: HandleData.MessageType
  toastMessage?: string
  tipTitle?: string
}
export const useHandleData = (obj: Iobj) => {
  const {
    api,
    params = {},
    message,
    confirmType = "warning",
    toastMessage = "",
    tipTitle = "温馨提示"
  } = obj
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, tipTitle, {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: confirmType,
      draggable: true
    }).then(async () => {
      const res = await api(params)
      if (!res) return reject(false)
      ElMessage({
        type: "success",
        message: `${toastMessage || message}成功!`
      })
      resolve(true)
    })
  })
}
