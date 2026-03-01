import { RelativeSize, Size } from '../util/size.ts'
import { Position, RelativePosition } from '../util/position.ts'
import { Origin, OriginConfig, OriginX, OriginY } from '../util/origin.ts'
import { Scene } from 'phaser'

export type ComponentConfig = RelativePosition &
    RelativeSize &
    OriginConfig & {
        visible?: boolean
    }

export type Anchor = Position & Size & Origin

export class Component {
    constructor(scene: Scene, cfg?: ComponentConfig) {
        this.scene = scene
        this._local = {
            x: cfg?.x ?? 0,
            y: cfg?.y ?? 0,
            width: cfg?.width ?? 0,
            height: cfg?.height ?? 0,
            originX: cfg?.originX,
            originY: cfg?.originY,
        }
        this._localVisible = cfg?.visible ?? true
    }
    readonly scene: Scene

    get initialized() {
        return this._initialized
    }
    initialize() {
        if (this._initialized) return
        this._initialized = true
        this.updatePosition()
        this.updateVisible(this.visible)
    }
    private _initialized = false

    get visible() {
        return this._parentVisible && this._localVisible
    }
    set visible(value: boolean) {
        const was = this._parentVisible && this._localVisible
        this._localVisible = value
        const now = this._parentVisible && this._localVisible
        if (now !== was) this.updateVisible(now)
    }
    setParentVisible(value: boolean) {
        const was = this._parentVisible && this._localVisible
        this._parentVisible = value
        const now = this._parentVisible && this._localVisible
        if (now !== was) this.updateVisible(now)
    }
    protected updateVisible(_visible: boolean) {}
    private _parentVisible = true
    private _localVisible: boolean

    get x() {
        return this._parent.x + (this._local.x ?? 0) * (this.originX === OriginX.Right ? -1 : 1)
    }
    get y() {
        return this._parent.y + (this._local.y ?? 0) * (this.originY === OriginY.Bottom ? -1 : 1)
    }
    get width() {
        const w = this._local.width
        return w > 0 ? w : this._parent.width + w
    }
    get height() {
        const h = this._local.height
        return h > 0 ? h : this._parent.height + h
    }
    get originX() {
        return this._local.originX ?? this._parent.originX
    }
    get originY() {
        return this._local.originY ?? this._parent.originY
    }
    get left() {
        return this.x - Math.floor(this.originX * this.width)
    }
    get right() {
        return this.left + this.width
    }
    get top() {
        return this.y - Math.floor(this.originY * this.height)
    }
    get bottom() {
        return this.top + this.height
    }
    get zoom() {
        return this._zoom
    }

    get localX() {
        return this._local.x
    }
    set localX(x) {
        this._set('x', x)
    }
    get localY() {
        return this._local.y
    }
    set localY(y) {
        this._set('y', y)
    }

    setWidth(width: number) {
        this._set('width', width)
    }
    setHeight(height: number) {
        this._set('height', height)
    }
    reposition(anchor: Anchor, zoom: number) {
        this._parent = anchor
        this._zoom = zoom
        if (!this._initialized) return
        this.updatePosition()
    }
    protected updatePosition() {}
    private readonly _local: Position & Size & OriginConfig
    private _parent: Anchor = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        originX: OriginX.Left,
        originY: OriginY.Top,
    }
    private _zoom = 1

    bringToTop() {}

    private _set<K extends 'x' | 'y' | 'width' | 'height'>(key: K, value: number) {
        const current = this._local[key]
        if (current !== undefined && Math.abs(current - value) < 1) return
        this._local[key] = value
        if (!this._initialized) return
        this.updatePosition()
    }
}
