import { findStyle, ThemeConfig } from "../theme/theme.ts"
import { Scene } from "phaser"
import { StyledComponent, StyledComponentConfig } from "./styled.ts"
import { Container } from "../core/container.ts"
import { StyledMultiFactory } from "./factory.ts"
import { Image } from "../core/image.ts"

export type FrameConfig = StyledComponentConfig

export class Frame extends StyledComponent {
    constructor(scene: Scene, theme: ThemeConfig, cfg: FrameConfig) {
        super(scene, theme, cfg)
        const style = findStyle("Frame", cfg.style, theme.frame)

        const insert = (this as Container).insert

        this._image = insert.image({
            texture: theme.resources.atlas,
            frame: style.frame!,
        })

        const paddingX = style.paddingX ?? 0
        const paddingY = style.paddingY ?? 0
        const inner = insert.container({
            width: -2 * paddingX,
            height: -2 * paddingY,
        })

        this.insert = new StyledMultiFactory(scene, inner, this.theme)
    }

    readonly insert: StyledMultiFactory

    update() {
        this._image.visible = this.visible
    }

    private _image: Image
}
