import { Scene } from 'phaser'
import { Origin, OriginX, OriginY } from '../util/origin.ts'
import { BitmapText, BitmapTextConfig } from './bitmaptext.ts'
import { Clickable, ClickableConfig } from './clickable.ts'
import { Component, ComponentConfig } from './component.ts'
import { Container, WithContainer } from './container.ts'
import { Image, ImageConfig } from './image.ts'
import { Interactive, InteractiveConfig } from './interactive.ts'
import { Rectangle, RectangleConfig } from './rectangle.ts'
import { Mask } from './renderable.ts'
import { Scrollable, ScrollableConfig } from './scrollable.ts'

export type ComponentFactoryConfig = Origin & {
    scene: Scene
}

export class ComponentFactory<MultiFactory extends WithContainer> {
    constructor(cfg: ComponentFactoryConfig) {
        this.scene = cfg.scene
        this.originX = cfg.originX
        this.originY = cfg.originY
    }

    setContainer(container: Container<MultiFactory>) {
        this._container = container
    }
    protected _container!: Container<MultiFactory>

    readonly scene: Scene
    readonly originX: OriginX
    readonly originY: OriginY

    container(cfg?: ComponentConfig): Container<ComponentMultiFactory> {
        const multiFactory = new ComponentMultiFactory(this.scene)
        const instance = new Container(this.scene, multiFactory, cfg)
        this._container.attach(instance, this.originX, this.originY)
        return instance
    }

    interactive(cfg?: InteractiveConfig): Interactive {
        return this.create(Interactive, cfg)
    }

    clickable(cfg?: ClickableConfig): Clickable {
        return this.create(Clickable, cfg)
    }

    scrollable(cfg: ScrollableConfig): Scrollable {
        return this.create(Scrollable, cfg)
    }

    rectangle(cfg?: RectangleConfig): Rectangle {
        return this.create(Rectangle, cfg)
    }

    image(cfg: ImageConfig): Image {
        return this.create(Image, cfg)
    }

    bitmapText(cfg: BitmapTextConfig): BitmapText {
        return this.create(BitmapText, cfg)
    }

    mask(cfg?: ComponentConfig): Mask {
        return this.create(Mask, cfg)
    }

    private create<T extends Component, Cfg>(Ctor: new (scene: Scene, cfg: Cfg) => T, cfg: Cfg): T {
        const instance = new Ctor(this.scene, cfg)
        this._container.attach(instance, this.originX, this.originY)
        return instance
    }
}

export class ComponentMultiFactory extends ComponentFactory<ComponentMultiFactory> {
    constructor(scene: Scene) {
        super({
            scene,
            originX: OriginX.Center,
            originY: OriginY.Center,
        })
    }

    at(originX: OriginX, originY: OriginY): ComponentFactory<ComponentMultiFactory> {
        const key = `${originX}-${originY}`
        let factory = this._factories[key]
        if (!factory) {
            factory = new ComponentFactory({
                scene: this.scene,
                originX,
                originY,
            })
            factory.setContainer(this._container)
            this._factories[key] = factory
        }
        return factory
    }
    private _factories: { [key: string]: ComponentFactory<ComponentMultiFactory> } = {}

    get center(): ComponentFactory<ComponentMultiFactory> {
        return this
    }

    get left(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Left, OriginY.Center)
    }

    get right(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Right, OriginY.Center)
    }

    get top(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Center, OriginY.Top)
    }

    get bottom(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Center, OriginY.Bottom)
    }

    get topLeft(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Left, OriginY.Top)
    }

    get topRight(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Right, OriginY.Top)
    }

    get bottomLeft(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Left, OriginY.Bottom)
    }

    get bottomRight(): ComponentFactory<ComponentMultiFactory> {
        return this.at(OriginX.Right, OriginY.Bottom)
    }
}
