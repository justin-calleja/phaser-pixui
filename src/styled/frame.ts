import { findStyle, ThemeConfig } from '../theme/theme.ts'
import { Scene } from 'phaser'
import { StyledComponent, StyledComponentConfig } from './styled.ts'
import { Image } from '../core/image.ts'
import { StyledMultiFactory } from './factory.ts'
import { FrameStyle } from '../theme/frame.ts'

export type FrameConfig = StyledComponentConfig & {
    styleObject?: FrameStyle
}

export class Frame extends StyledComponent {
    constructor(scene: Scene, factory: StyledMultiFactory, theme: ThemeConfig, cfg: FrameConfig) {
        super(scene, factory, theme, cfg)
        const style = cfg.styleObject ?? findStyle('Frame', cfg.style, theme.frame)

        this._image = this.insert.image({
            texture: theme.resources.atlas,
            frame: style.frame!,
        })

        const paddingX = style.paddingX ?? 0
        const paddingY = style.paddingY ?? 0
        const inner = this.insert.styledContainer({
            width: -2 * paddingX,
            height: -2 * paddingY,
        })

        // Redefine container of component factory used to create children components
        this.insert.setContainer(inner)
    }

    protected override updateVisible(visible: boolean) {
        super.updateVisible(visible)
        this._image.visible = visible
    }

    private _image: Image
}
