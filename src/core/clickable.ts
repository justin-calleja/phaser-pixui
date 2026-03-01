import { Scene } from 'phaser'
import { Interactive, InteractiveConfig } from './interactive.ts'

export type ClickableConfig = {
    onClick?: () => void
} & InteractiveConfig

export enum ClickableState {
    Default,
    Hovered,
    Pressed,
    Disabled,
}

export class Clickable extends Interactive {
    constructor(scene: Scene, cfg: ClickableConfig = {}) {
        super(scene, cfg)

        this._onClick = cfg.onClick

        this.events.on('pointerdown', this._onPointerDown, this)
        this.events.on('pointerout', this._onPointerOut, this)
        this.events.on('pointerup', this._onPointerUp, this)
        this.events.on('pointerover', this._onPointerOver, this)
    }

    get state(): ClickableState {
        return this.visible ? this._state : ClickableState.Disabled
    }
    get hovered() {
        return this.state === ClickableState.Hovered
    }
    get pressed() {
        return this.state === ClickableState.Pressed
    }
    private _state: ClickableState = ClickableState.Default

    protected override updateVisible(visible: boolean) {
        if (!visible) this._state = ClickableState.Default
        super.updateVisible(visible)
    }

    private _onPointerDown() {
        this._setState(ClickableState.Pressed)
    }

    private _onPointerUp() {
        if (this.pressed && this._onClick) this._onClick()
        if (this.isDesktop) return this._setState(ClickableState.Hovered)
        else this._setState(ClickableState.Default)
    }
    private readonly _onClick?: () => void

    private _onPointerOut() {
        this._setState(ClickableState.Default)
    }

    private _onPointerOver() {
        if (!this.isDesktop) return
        this._setState(ClickableState.Hovered)
    }

    private _setState(state: ClickableState) {
        if (this._state === state) return
        this._state = state
        if (this._onUpdate) this._onUpdate()
    }
}
