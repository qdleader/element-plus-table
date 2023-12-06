/* Menu */
declare namespace Menu {
  interface MetaProps {
    icon: string
    title: string
    activeMenu?: string
    isLink?: string
    isHide: boolean
    isFull: boolean
    isAffix: boolean
    isKeepAlive: boolean
  }
  interface MenuOptions {
    path: string
    enName?: string
    name: string
    component?: string | (() => Promise<unknown>)
    redirect?: string
    meta: MetaProps
    children?: MenuOptions[]
  }
}

/* FileType */
declare namespace File {
  type ImageMimeType =
    | "image/apng"
    | "image/bmp"
    | "image/gif"
    | "image/jpeg"
    | "image/jpg"
    | "image/pjpeg"
    | "image/png"
    | "image/svg+xml"
    | "image/tiff"
    | "image/webp"
    | "image/x-icon"

  type ExcelMimeType =
    | "application/vnd.ms-excel"
    | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
}

declare type Recordable<T = any> = Record<string, T>

/* __APP_INFO__ */
declare const __APP_INFO__: {
  pkg: {
    name: string
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}

/* Generic Tools */
type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K; value: T[K] }
}[keyof T]

type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]
