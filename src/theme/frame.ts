import { StyleList } from "./theme.ts"

export type FrameStyle = {
    frame?: string
    paddingX?: number
    paddingY?: number
}

export function initFrameStyle(base: StyleList<FrameStyle>) {
    if (base.frame == undefined) {
        console.error(`Base frame doesn't have frame defined`)
    }
    base.paddingX ??= 0
    base.paddingY ??= 0

    if (!base.styles) return
    for (const style of Object.values(base.styles)) {
        style.frame ??= base.frame
        style.paddingX ??= base.paddingX
        style.paddingY ??= base.paddingY
    }
}
