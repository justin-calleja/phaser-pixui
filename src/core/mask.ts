import type { GameObjects } from 'phaser'
import { Scene } from 'phaser'
import { Component, ComponentConfig } from './component.ts'

type Rectangle = GameObjects.Rectangle

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

    readonly _internal: Rectangle
}
