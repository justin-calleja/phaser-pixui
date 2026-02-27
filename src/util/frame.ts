import Frame = Phaser.Textures.Frame

export function frameDimensions(frame: Frame): FrameDimensions {
    type size = { w: number; h: number }
    const data = frame.customData as
        | {
              frame: size
              scale9Borders?: size
              sourceSize?: size
          }
        | undefined

    const frameSize = data?.sourceSize ?? data?.frame
    const width = frameSize?.w ?? frame.width
    const height = frameSize?.h ?? frame.height
    const scalableSize = data?.scale9Borders ?? { w: width, h: height }

    return {
        width: width,
        height: height,
        scalableX: scalableSize.w < width,
        scalableY: scalableSize.h < height,
    }
}

export type FrameDimensions = {
    width: number
    height: number
    scalableX: boolean
    scalableY: boolean
}
