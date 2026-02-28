import { findStyle, ThemeConfig } from '../theme/theme.ts'
import { Scene } from 'phaser'
import { Frame, FrameConfig } from './frame.ts'
import { StyledMultiFactory } from './factory.ts'
import { StyledComponent } from './styled.ts'

export type DialogConfig = FrameConfig

export class Dialog extends StyledComponent {
    constructor(scene: Scene, factory: StyledMultiFactory, theme: ThemeConfig, cfg: DialogConfig) {
        super(scene, factory, theme, { ...cfg, visible: false, width: 0, height: 0 })
        const style = findStyle('Dialog', cfg.style, theme.dialog)

        super.insert.interactive({})
        super.insert.rectangle({
            fillColor: style.backdropColor,
            fillAlpha: style.backdropAlpha,
        })
        this._frame = super.insert.frame({
            ...cfg,
            styleObject: style,
        })
    }

    get insert() {
        return this._frame.insert
    }

    set visible(value: boolean) {
        super.visible = value
        if (value) {
            this.bringToTop()
        }
    }

    private readonly _frame: Frame
}
