import { Anchor, Component, ComponentConfig } from "./component.ts"
import { Origin, OriginX, OriginY } from "../util/origin.ts"
import { Scene } from "phaser"
import { ComponentMultiFactory } from "./factory.ts"

export class Container extends Component {
    constructor(scene: Scene, cfg?: ComponentConfig) {
        super(scene, cfg)
        this.insert = new ComponentMultiFactory(scene, this)
    }
    readonly insert: ComponentMultiFactory

    attach(components: Component | Component[], originX?: OriginX, originY?: OriginY) {
        originX ??= OriginX.Center
        originY ??= OriginY.Center
        const anchor = this._calcAnchor(originX, originY)
        if (Array.isArray(components)) {
            this._children.push(...components.map((c) => ({ originX, originY, component: c })))
            for (const c of components) {
                c.reposition(anchor, this.zoom)
            }
        } else {
            this._children.push({ originX, originY, component: components })
            components.reposition(anchor, this.zoom)
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
