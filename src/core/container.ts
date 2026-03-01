import { Scene } from 'phaser'
import { Origin, OriginX, OriginY } from '../util/origin.ts'
import { Anchor, Component, ComponentConfig } from './component.ts'

export interface WithContainer {
    setContainer(container: Container<this>): void
}

export class Container<MultiFactory extends WithContainer> extends Component {
    constructor(scene: Scene, factory: MultiFactory, cfg?: ComponentConfig) {
        super(scene, cfg)
        this._insert = factory
        factory.setContainer(this)
    }

    get insert() {
        return this._insert
    }
    private readonly _insert: MultiFactory

    attach(components: Component | Component[], originX?: OriginX, originY?: OriginY) {
        originX ??= OriginX.Center
        originY ??= OriginY.Center
        if (!Array.isArray(components)) components = [components]
        for (const c of components) {
            this._children.push({ originX, originY, component: c })
        }
    }
    forEach(f: (c: Component) => void) {
        for (const c of this._children) {
            f(c.component)
        }
    }
    private _children: ({ component: Component } & Origin)[] = []

    override initialize() {
        super.initialize()
        for (const item of this._children) {
            item.component.initialize()
        }
    }

    protected override updateVisible(visible: boolean) {
        for (const item of this._children) {
            item.component.setParentVisible(visible)
        }
    }

    protected override updatePosition() {
        const anchors = new Map<number, Anchor>()
        for (const item of this._children) {
            const key = item.originX * 10 + item.originY
            let anchor = anchors.get(key)
            if (!anchor) {
                anchor = {
                    x: this.left + Math.floor(item.originX * this.width),
                    y: this.top + Math.floor(item.originY * this.height),
                    width: this.width,
                    height: this.height,
                    originX: item.originX,
                    originY: item.originY,
                }
                anchors.set(key, anchor)
            }
            item.component.reposition(anchor, this.zoom)
        }
    }

    override bringToTop() {
        for (const item of this._children) {
            item.component.bringToTop()
        }
    }
}
