import { Scene } from 'phaser'
import { ComponentFactory, ComponentFactoryConfig } from '../core/factory.ts'
import { ThemeConfig } from '../theme/theme.ts'
import { OriginX, OriginY } from '../util/origin.ts'
import { Button, ButtonConfig } from './button.ts'
import { Dialog, DialogConfig } from './dialog.ts'
import { Frame, FrameConfig } from './frame.ts'
import { Progress, ProgressConfig } from './progress.ts'
import { ScrollableTextArea, ScrollableTextAreaConfig } from './scrollable-textarea.ts'
import { StyledComponent, StyledComponentConfig } from './styled.ts'
import { TextArea, TextAreaConfig } from './textarea.ts'

export type StyledFactoryConfig = {
    theme: ThemeConfig
} & ComponentFactoryConfig

export class StyledFactory extends ComponentFactory<StyledMultiFactory> {
    constructor(cfg: StyledFactoryConfig) {
        super(cfg)
        this.theme = cfg.theme
    }
    readonly theme: ThemeConfig

    styledContainer(cfg?: StyledComponentConfig): StyledComponent {
        return this.createStyled(StyledComponent, cfg)
    }

    dialog(cfg: DialogConfig): Dialog {
        return this.createStyled(Dialog, cfg)
    }

    frame(cfg: FrameConfig): Frame {
        return this.createStyled(Frame, cfg)
    }

    button(cfg: ButtonConfig): Button {
        return this.createStyled(Button, cfg)
    }

    progress(cfg: ProgressConfig): Progress {
        return this.createStyled(Progress, cfg)
    }

    textArea(cfg: TextAreaConfig): TextArea {
        return this.createStyled(TextArea, cfg)
    }

    scrollableTextArea(cfg: ScrollableTextAreaConfig): ScrollableTextArea {
        return this.createStyled(ScrollableTextArea, cfg)
    }

    protected createStyled<T extends StyledComponent, Cfg>(
        Ctor: new (scene: Scene, factory: StyledMultiFactory, theme: ThemeConfig, cfg: Cfg) => T,
        cfg: Cfg
    ): T {
        const multiFactory = new StyledMultiFactory(this.scene, this.theme)
        const instance = new Ctor(this.scene, multiFactory, this.theme, cfg)
        this._container.attach(instance, this.originX, this.originY)
        return instance
    }
}

export class StyledMultiFactory extends StyledFactory {
    constructor(scene: Scene, theme: ThemeConfig) {
        super({
            scene,
            theme,
            originX: OriginX.Center,
            originY: OriginY.Center,
        })
    }

    at(originX: OriginX, originY: OriginY): StyledFactory {
        const key = `${originX}-${originY}`
        let factory = this._factories[key]
        if (!factory) {
            factory = new StyledFactory({
                scene: this.scene,
                theme: this.theme,
                originX,
                originY,
            })
            factory.setContainer(this._container)
            this._factories[key] = factory
        }
        return factory
    }
    private readonly _factories: { [key: string]: StyledFactory } = {}

    get center(): StyledFactory {
        return this.at(OriginX.Center, OriginY.Center)
    }

    get left(): StyledFactory {
        return this.at(OriginX.Left, OriginY.Center)
    }

    get right(): StyledFactory {
        return this.at(OriginX.Right, OriginY.Center)
    }

    get top(): StyledFactory {
        return this.at(OriginX.Center, OriginY.Top)
    }

    get bottom(): StyledFactory {
        return this.at(OriginX.Center, OriginY.Bottom)
    }

    get topLeft(): StyledFactory {
        return this.at(OriginX.Left, OriginY.Top)
    }

    get topRight(): StyledFactory {
        return this.at(OriginX.Right, OriginY.Top)
    }

    get bottomLeft(): StyledFactory {
        return this.at(OriginX.Left, OriginY.Bottom)
    }

    get bottomRight(): StyledFactory {
        return this.at(OriginX.Right, OriginY.Bottom)
    }
}
