import { findStyle, resolveColor, ThemeConfig } from '../theme/theme.ts'
import { Scene } from 'phaser'
import { BitmapText } from '../core/bitmaptext.ts'
import { StyledComponent, StyledComponentConfig } from './styled.ts'
import { TextAlign } from '../util/align.ts'
import type { StyledMultiFactory } from './factory.ts'

export type TextAreaConfig = {
    text?: string
    textAlign?: TextAlign
} & StyledComponentConfig

export class TextArea extends StyledComponent {
    constructor(
        scene: Scene,
        factory: StyledMultiFactory,
        theme: ThemeConfig,
        cfg: TextAreaConfig
    ) {
        super(scene, factory, theme, cfg)
        const style = findStyle('TextArea', cfg.style, theme.textArea)

        const align = cfg.textAlign ?? style.defaultAlign ?? TextAlign.Left
        const textFactory =
            align === TextAlign.Left
                ? this.insert.topLeft
                : align === TextAlign.Right
                  ? this.insert.topRight
                  : this.insert.center

        this._text = textFactory.bitmapText({
            text: cfg.text,
            align: align,
            font: style.fontName!,
            size: style.fontSize,
            tint: resolveColor(style.fontTint, theme.palette),
            visible: this.visible,
        })
    }

    get text() {
        return this._text.text
    }
    set text(value: string) {
        this._text.text = value
    }

    protected readonly _text: BitmapText
}
