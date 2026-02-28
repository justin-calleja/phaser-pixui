import { ThemeConfig } from '../theme/theme.ts'
import { Button, ButtonConfig } from './button.ts'
import { TextArea, TextAreaConfig } from './textarea.ts'
import { ScrollableTextArea, ScrollableTextAreaConfig } from './scrollable-textarea.ts'
import { ComponentFactory, ComponentFactoryConfig } from '../core/factory.ts'
import { Progress, ProgressConfig } from './progress.ts'
import { Frame, FrameConfig } from './frame.ts'
import { Scene } from 'phaser'
import { Container } from '../core/container.ts'
import { OriginX, OriginY } from '../util/origin.ts'

export type StyledFactoryConfig = {
    theme: ThemeConfig
} & ComponentFactoryConfig

export class StyledFactory extends ComponentFactory {
    constructor(cfg: StyledFactoryConfig) {
        super(cfg)
        this.theme = cfg.theme
    }
    readonly theme: ThemeConfig

    button(cfg: ButtonConfig): Button {
        const button = new Button(this.scene, this.theme, cfg)
        this._container.attach(button, this.originX, this.originY)
        return button
    }

    progress(cfg: ProgressConfig): Progress {
        const progress = new Progress(this.scene, this.theme, cfg)
        this._container.attach(progress, this.originX, this.originY)
        return progress
    }

    textArea(cfg: TextAreaConfig): TextArea {
        const textArea = new TextArea(this.scene, this.theme, cfg)
        this._container.attach(textArea, this.originX, this.originY)
        return textArea
    }

    scrollableTextArea(cfg: ScrollableTextAreaConfig): ScrollableTextArea {
        const scrollableTextArea = new ScrollableTextArea(this.scene, this.theme, cfg)
        this._container.attach(scrollableTextArea, this.originX, this.originY)
        return scrollableTextArea
    }

    frame(cfg: FrameConfig): Frame {
        const frame = new Frame(this.scene, this.theme, cfg)
        this._container.attach(frame, this.originX, this.originY)
        return frame
    }
}

export class StyledMultiFactory extends StyledFactory {
    constructor(scene: Scene, container: Container, theme: ThemeConfig) {
        super({
            scene,
            container,
            theme,
            originX: OriginX.Center,
            originY: OriginY.Center,
        })
        this.center = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Center,
            originY: OriginY.Center,
        })
        this.left = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Left,
            originY: OriginY.Center,
        })
        this.right = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Right,
            originY: OriginY.Center,
        })
        this.top = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Center,
            originY: OriginY.Top,
        })
        this.bottom = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Center,
            originY: OriginY.Bottom,
        })
        this.topLeft = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Left,
            originY: OriginY.Top,
        })
        this.topRight = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Right,
            originY: OriginY.Top,
        })
        this.bottomLeft = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Left,
            originY: OriginY.Bottom,
        })
        this.bottomRight = new StyledFactory({
            scene,
            container,
            theme,
            originX: OriginX.Right,
            originY: OriginY.Bottom,
        })
    }

    readonly center: StyledFactory
    readonly left: StyledFactory
    readonly right: StyledFactory
    readonly top: StyledFactory
    readonly bottom: StyledFactory
    readonly topLeft: StyledFactory
    readonly topRight: StyledFactory
    readonly bottomLeft: StyledFactory
    readonly bottomRight: StyledFactory
}
