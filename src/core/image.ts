import { Scene } from "phaser";
import { Renderable, RenderableConfig } from "./renderable.ts";

export type ImageConfig = {
    texture: string,
    frame: string,
} & RenderableConfig;

export class Image extends Renderable<Phaser.GameObjects.Sprite | Phaser.GameObjects.NineSlice> {
    constructor(scene: Scene, cfg: ImageConfig) {
        const frame = scene.textures.getFrame(cfg.texture, cfg.frame)
        const isScalable = frame.scale9 || frame.is3Slice

        // @ts-ignore
        const fixedWidth = !isScalable || (frame.customData.scale9Borders.w == frame.width) ? frame.width : undefined
        // @ts-ignore
        const fixedHeight = !isScalable || (frame.customData.scale9Borders.h == frame.height) ? frame.height : undefined

        cfg = {
            ...cfg,
            width: cfg.width ?? fixedWidth,
            height: cfg.height ?? fixedHeight,
        }
        const renderable = isScalable ?
            Image._createNineSlice(scene, cfg) :
            Image._createSprite(scene,cfg)
        super(scene, cfg, renderable)
        this.scalableX = fixedWidth === undefined
        this.scalableY = fixedHeight === undefined
    }
    readonly scalableX: boolean
    readonly scalableY: boolean

    protected afterReposition() {
        super.afterReposition();
        if (this.scalableX) this.internal.width = this.width
        if (this.scalableY) this.internal.height = this.height
    }

    private static _createSprite(scene: Scene, cfg: ImageConfig) {
        return scene.make.sprite({
            key: cfg.texture,
            frame: cfg.frame,
            visible: cfg.visible ?? true,
        })
    }

    private static _createNineSlice(scene: Scene, cfg: ImageConfig) {
        return scene.make.nineslice({
            key: cfg.texture,
            frame: cfg.frame,
            visible: cfg.visible ?? true,
        })
    }
}