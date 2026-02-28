import { Anchor, Component, ComponentConfig } from './component.ts'
import { Origin, OriginX, OriginY } from '../util/origin.ts'
import { Scene } from 'phaser'

export interface WithContainer {
    setContainer(container: Container<this>): void
}

export class Container<MultiFactory extends WithContainer> extends Component {
    constructor(scene: Scene, factory: MultiFactory, cfg?: ComponentConfig) {
        super(scene, cfg)
        this.insert = factory
        factory.setContainer(this)
    }

    readonly insert: MultiFactory

    attach(components: Component | Component[], originX?: OriginX, originY?: OriginY) {
        originX ??= OriginX.Center
        originY ??= OriginY.Center
        if (!Array.isArray(components)) components = [components]
        for (const c of components) {
            this._children.push({ originX, originY, component: c })
        }

        if (!this._initialized) return
        const anchor = this._calcAnchor(originX, originY)
        for (const c of components) {
            c.reposition(anchor, this.zoom)
        }
    }
    forEach(f: (c: Component) => void) {
        for (const c of this._children) {
            f(c.component)
        }
    }
    private _children: ({ component: Component } & Origin)[] = []

    protected afterReposition() {
        for (const item of this._children) {
            item.component.reposition(this._calcAnchor(item.originX, item.originY), this.zoom)
        }
    }

    private _calcAnchor(originX: OriginX, originY: OriginY): Anchor {
        const x =
            originX === OriginX.Left
                ? this.left
                : originX === OriginX.Right
                  ? this.right
                  : this.left + Math.floor(this.width / 2)
        const y =
            originY === OriginY.Top
                ? this.top
                : originY === OriginY.Bottom
                  ? this.bottom
                  : this.top + Math.floor(this.height / 2)
        return {
            x,
            y,
            width: this.width,
            height: this.height,
            originX,
            originY,
        }
    }
}
