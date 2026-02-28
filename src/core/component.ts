import { calcSize, RelativeSize, Size } from '../util/size.ts'
import { Position, RelativePosition } from '../util/position.ts'
import { calcOrigin, Origin, OriginConfig, OriginX, OriginY } from '../util/origin.ts'
import { Scene } from 'phaser'

export type ComponentConfig = RelativePosition &
    RelativeSize &
    OriginConfig & {
        visible?: boolean
        enabled?: boolean
    }

export type Anchor = Position & Size & Origin

export class Component {
    constructor(scene: Scene, cfg?: ComponentConfig) {
        this.scene = scene
        this._cfg = cfg ?? {}
        this._localState = {
            visible: cfg?.visible ?? true,
            enabled: cfg?.enabled ?? true,
        }
        this._currentState = { ...this._localState }
        this._calcPosition()
    }
    readonly scene: Scene

    update() {}

    get visible() {
        return this._currentState.visible
    }
    set visible(value: boolean) {
        this._localState.visible = value
        this._updateState()
    }

    get enabled() {
        return this._currentState.enabled
    }
    set enabled(value: boolean) {
        this._localState.enabled = value
        this._updateState()
    }

    setParentState(state: ComponentState) {
        this._parentState = state
        this._updateState()
    }
    get currentState(): ComponentState {
        return this._currentState
    }

    get x() {
        return this._position.x
    }
    get y() {
        return this._position.y
    }
    get left() {
        return this._position.x - Math.floor(this._origin.originX * this._size.width)
    }
    get right() {
        return this.left + this._size.width
    }
    get top() {
        return this._position.y - Math.floor(this._origin.originY * this._size.height)
    }
    get bottom() {
        return this.top + this._size.height
    }
    get width() {
        return this._size.width
    }
    get height() {
        return this._size.height
    }
    get originX() {
        return this._origin.originX
    }
    get originY() {
        return this._origin.originY
    }
    get zoom() {
        return this._zoom
    }

    get localX() {
        return this._cfg.x ?? 0
    }
    set localX(x) {
        this._set('x', x)
    }
    get localY() {
        return this._cfg.y ?? 0
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

    updatePosition() {
        this._calcPosition()
        Component.updateCount++
        console.log('updateCount', Component.updateCount)

        if (!this._initialized) return
        this.afterReposition()
        this.update()
    }
    static updateCount = 0

    reposition(anchor: Anchor, zoom: number) {
        this._anchor = anchor
        this._zoom = zoom
        this._initialized = true
        this.updatePosition()
    }
    bringToTop() {}

    protected afterReposition() {}
    protected _initialized = false

    private readonly _cfg: ComponentConfig
    private _anchor: Anchor = {
        x: 0,
        y: 0,
        height: 0,
        width: 0,
        originX: OriginX.Center,
        originY: OriginY.Center,
    }
    private _zoom = 1
    private _position!: Position
    private _size!: Size
    private _origin: Origin = {
        originX: OriginX.Center,
        originY: OriginY.Center,
    }

    private _calcPosition() {
        const anchor = this._anchor
        this._size = calcSize(this._cfg, anchor)
        this._origin = calcOrigin(this._cfg, anchor)
        const localX = (this._cfg.x ?? 0) * (this._origin.originX === OriginX.Right ? -1 : 1)
        const localY = (this._cfg.y ?? 0) * (this._origin.originY === OriginY.Bottom ? -1 : 1)
        this._position = {
            x: anchor.x + localX,
            y: anchor.y + localY,
        }
    }

    private _set<K extends 'x' | 'y' | 'width' | 'height'>(key: K, value: number) {
        const current = this._cfg[key]
        if (current !== undefined && Math.abs(current - value) < 1) return
        this._cfg[key] = value
        this.updatePosition()
    }

    private _updateState() {
        const newState = {
            enabled: this._parentState.enabled && this._localState.enabled,
            visible: this._parentState.visible && this._localState.visible,
        }
        const needUpdate =
            this._currentState.enabled !== newState.enabled ||
            this._currentState.visible !== newState.visible
        if (!needUpdate) return
        this._currentState = newState
        this.update()
    }
    private readonly _localState: ComponentState
    private _parentState: ComponentState = { enabled: true, visible: true }
    private _currentState: ComponentState
}

export type ComponentState = {
    enabled: boolean
    visible: boolean
}
