import { Origin, OriginX, OriginY } from "../util/origin.ts"
import { Scene } from "phaser"
import { Container } from "./container.ts"
import { Interactive, InteractiveConfig } from "./interactive.ts"
import { BitmapText, BitmapTextConfig } from "./bitmaptext.ts"
import { Image, ImageConfig } from "./image.ts"
import { Clickable, ClickableConfig } from "./clickable.ts"
import { ComponentConfig } from "./component.ts"
import { Mask } from "./renderable.ts"
import { Scrollable, ScrollableConfig } from "./scrollable.ts"
import { Rectangle, RectangleConfig } from "./rectangle.ts"

export type ComponentFactoryConfig = Origin & {
    scene: Scene
    container: Container
}

export class ComponentFactory {
    constructor(cfg: ComponentFactoryConfig) {
        this.scene = cfg.scene
        this._container = cfg.container
        this.originX = cfg.originX
        this.originY = cfg.originY
    }

    readonly scene: Scene
    readonly originX: OriginX
    readonly originY: OriginY

    protected readonly _container: Container

    container(cfg?: ComponentConfig): Container {
        const container = new Container(this.scene, cfg)
        this._container.attach(container, this.originX, this.originY)
        return container
    }

    interactive(cfg?: InteractiveConfig): Interactive {
        const interactive = new Interactive(this.scene, cfg)
        this._container.attach(interactive, this.originX, this.originY)
        return interactive
    }

    clickable(cfg?: ClickableConfig): Clickable {
        const clickable = new Clickable(this.scene, cfg)
        this._container.attach(clickable, this.originX, this.originY)
        return clickable
    }

    scrollable(cfg: ScrollableConfig): Scrollable {
        const scrollable = new Scrollable(this.scene, cfg)
        this._container.attach(scrollable, this.originX, this.originY)
        return scrollable
    }

    rectangle(cfg?: RectangleConfig): Rectangle {
        const rectangle = new Rectangle(this.scene, cfg)
        this._container.attach(rectangle, this.originX, this.originY)
        return rectangle
    }

    image(cfg: ImageConfig): Image {
        const image = new Image(this.scene, cfg)
        this._container.attach(image, this.originX, this.originY)
        return image
    }

    bitmapText(cfg: BitmapTextConfig): BitmapText {
        const text = new BitmapText(this.scene, cfg)
        this._container.attach(text, this.originX, this.originY)
        return text
    }

    mask(cfg?: ComponentConfig): Mask {
        const mask = new Mask(this.scene, cfg)
        this._container.attach(mask, this.originX, this.originY)
        return mask
    }
}

export class ComponentMultiFactory extends ComponentFactory {
    constructor(scene: Scene, container: Container) {
        super({
            scene,
            container,
            originX: OriginX.Center,
            originY: OriginY.Center,
        })
        this.center = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Center,
            originY: OriginY.Center,
        })
        this.left = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Left,
            originY: OriginY.Center,
        })
        this.right = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Right,
            originY: OriginY.Center,
        })
        this.top = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Center,
            originY: OriginY.Top,
        })
        this.bottom = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Center,
            originY: OriginY.Bottom,
        })
        this.topLeft = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Left,
            originY: OriginY.Top,
        })
        this.topRight = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Right,
            originY: OriginY.Top,
        })
        this.bottomLeft = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Left,
            originY: OriginY.Bottom,
        })
        this.bottomRight = new ComponentFactory({
            scene,
            container,
            originX: OriginX.Right,
            originY: OriginY.Bottom,
        })
    }

    readonly center: ComponentFactory
    readonly left: ComponentFactory
    readonly right: ComponentFactory
    readonly top: ComponentFactory
    readonly bottom: ComponentFactory
    readonly topLeft: ComponentFactory
    readonly topRight: ComponentFactory
    readonly bottomLeft: ComponentFactory
    readonly bottomRight: ComponentFactory
}
