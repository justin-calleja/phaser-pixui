import { Mask } from '../core/renderable.ts'
import { ThemeConfig } from '../theme/theme.ts'
import { Scene } from 'phaser'
import { Scrollable } from '../core/scrollable.ts'
import { TextArea, TextAreaConfig } from './textarea.ts'

export type ScrollableTextAreaConfig = TextAreaConfig

export class ScrollableTextArea extends TextArea {
    constructor(scene: Scene, theme: ThemeConfig, cfg: ScrollableTextAreaConfig) {
        super(scene, theme, cfg)

        this._mask = this.insert.mask()
        this._text.setMask(this._mask)

        this._scroller = this.insert.scrollable({
            onScroll: (_, y) => {
                if (!this._text) return
                this._text.localY = -y
            },
        })

        this._scroller.setContentHeight(this._text.height)
    }

    get text() {
        return super.text
    }
    set text(value: string) {
        super.text = value
        this._scroller.setContentHeight(this._text.height)
        this.scrollToEnd()
    }

    get maxScrollPosition() {
        return this._scroller.maxScrollPositionY
    }
    scrollTo(pos: number) {
        this._scroller.scrollTo(0, pos)
    }
    scrollToStart() {
        this._scroller.scrollToStart()
    }
    scrollToEnd() {
        this._scroller.scrollToEnd()
    }

    protected afterReposition() {
        super.afterReposition()
        this._text.setWidth(this._mask.width)
        this._scroller.setContentHeight(this._text.height)
    }

    private readonly _scroller: Scrollable
    private readonly _mask: Mask
}
