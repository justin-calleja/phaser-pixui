import { Scene } from "phaser";
import { Renderable, RenderableConfig } from "./renderable.ts";
import {frameDimensions} from "../util/frame.ts";

export type ImageConfig = {
    texture: string,
    frame: string,
} & RenderableConfig;

export class Image extends Renderable<Phaser.GameObjects.Sprite | Phaser.GameObjects.NineSlice> {
    constructor(scene: Scene, cfg: ImageConfig) {
        const frame = frameDimensions(scene.textures.getFrame(cfg.texture, cfg.frame))
        const fixedWidth = frame.scalableX ? undefined : frame.width
        const fixedHeight = frame.scalableY ? undefined : frame.height

        cfg = {
            ...cfg,
            width: cfg.width ?? fixedWidth,
            height: cfg.height ?? fixedHeight,
        }

        const renderable = frame.scalableX || frame.scalableY ?
            Image._createNineSlice(scene, cfg) :
            Image._createSprite(scene,cfg)
        super(scene, cfg, renderable)
        this.scalableX = frame.scalableX
        this.scalableY = frame.scalableY
    }
    readonly scalableX: boolean
    readonly scalableY: boolean

    protected afterReposition() {
        super.afterReposition();
        if (this.scalableX) this.internal.width = this.width
        if (this.scalableY) this.internal.height = this.height
        if (this.scalableX || this.scalableY) {
            console.log(this.internal.frame.name, this.width, this.height)
        }
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