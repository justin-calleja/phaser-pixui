import { Component, ComponentConfig } from './component.ts'
import { Scene } from 'phaser'

type GameObject = Phaser.GameObjects.GameObject
type Transform = Phaser.GameObjects.Components.Transform
type Origin = Phaser.GameObjects.Components.Origin
type Visible = Phaser.GameObjects.Components.Visible
type Filters = Phaser.GameObjects.Components.Filters
type Rectangle = Phaser.GameObjects.Rectangle

export type RenderableConfig = ComponentConfig & {
    tint?: number
}

export interface Tint {
    isTinted: boolean
    tint: number
    setTint(color: number): void
    clearTint(): void
}

export class Renderable<
    Internal extends GameObject & Transform & Origin & Visible & Filters & Tint,
> extends Component {
    constructor(scene: Scene, cfg: RenderableConfig | undefined, internal: Internal) {
        super(scene, cfg)
        this.internal = internal
        this.tint = cfg?.tint
    }
    readonly internal: Internal

    protected override updateVisible(visible: boolean) {
        this.internal.visible = visible
    }

    get tint(): number | undefined {
        return this.internal.isTinted ? this.internal.tint : undefined
    }
    set tint(value: number | undefined) {
        if (value === undefined) this.internal.clearTint()
        else this.internal.setTint(value)
    }

    override bringToTop() {
        this.scene.children.bringToTop(this.internal)
    }

    setMask(mask: Mask) {
        if (!this.internal.filters) {
            this.internal.enableFilters()
        }
        // @ts-expect-error: Phaser filters might not have internal property depending on version/types
        this.internal.filters?.internal.addMask(mask._internal)
    }

    protected override updatePosition() {
        this.internal.setOrigin(this.originX, this.originY)
        this.internal.setPosition(this.x, this.y)
    }
}

export class Mask extends Component {
    constructor(scene: Scene, cfg?: ComponentConfig) {
        super(scene, cfg)
        this._internal = scene.add.rectangle()
        this._internal.setFillStyle(0)
        this._internal.setVisible(false)
    }

    protected override updatePosition() {
        this._internal.setOrigin(this.originX, this.originY)
        this._internal.setPosition(this.x, this.y)
        this._internal.setSize(this.width, this.height)
    }

    private readonly _internal: Rectangle
}
