import { urlType } from "./interface"
import { mainRouter } from "@/utils/MainRouter"
/**
 * @description 页面跳转
 * @param {Function} url 跳转url(必传)
 * @param {Object} params 携带的操作数据参数 {id,params} (必传)
 * @param {String} openNewPage 提示信息 (非必传)
 */

export const useNavigate = (url: urlType, openNewPage?: boolean) => {
  return mainRouter({
    path: url,
    openNewPage
  })
}
export const useNavigateQuery = (
  url: urlType,
  params: any = {},
  openNewPage?: boolean
) => {
  return mainRouter({
    path: url,
    query: params,
    openNewPage
  })
}
