// 对象解析为字符串
export const convertObj = (data: Record<string, any>) => {
  const _result = []
  for (const key in data) {
    const value = data[key]
    if (Array.isArray(value)) {
      value.forEach(function (_value) {
        _result.push(key + "=" + _value)
      })
    } else {
      _result.push(key + "=" + value)
    }
  }
  return _result.join("&")
}

type Url = `/${string}` // 匹配以/开头的路由
interface Router {
  path: Url
  query?: Record<string, any>
  openNewPage?: boolean // 是否新页面打开
}
// 子应用路由跳转到其他子应用方法
export const mainRouter = (router: Router) => {
  let url = ""
  if (router.query) {
    url = router.path + "?" + convertObj(router.query)
  } else {
    url = router.path
  }
  if (router.openNewPage) {
    window.open(url, "_blank")
  } else {
    history.pushState({}, "", url)
  }
}
