import { Scene } from "phaser"
import { Interactive, InteractiveConfig } from "./interactive.ts"
import { add, len, scale, sub } from "../util/vec2.ts"

export type ScrollableConfig = {
    onScroll: (x: number, y: number) => void
} & InteractiveConfig

export class Scrollable extends Interactive {
    constructor(scene: Scene, cfg: ScrollableConfig) {
        super(scene, { ...cfg, draggable: true })

        this._onScroll = cfg.onScroll

        this.events.on("wheel", (_: unknown, dx: number, dy: number) => {
            if (!this.enabled) return
            this.scrollX += dx / this.zoom
            this.scrollY += dy / this.zoom
        })

        this.events.on("dragstart", () => {
            if (!this.enabled) return
            this._dragTimestamp = Date.now()
            this._dragVelocity = { x: 0, y: 0 }
        })

        this.events.on("drag", (_: unknown, dx: number, dy: number) => {
            if (!this.enabled) return
            const now = Date.now()
            const delta = sub({ x: dx, y: dy }, this._dragPosition)
            const dt = now - this._dragTimestamp
            const velocity = scale(delta, 1 / (dt + 1))

            this._dragTimestamp = now
            this._dragPosition = { x: dx, y: dy }
            this._dragVelocity = add(scale(velocity, 0.8), scale(this._dragVelocity, 0.2))
            this._updateContentPosition()
        })

        this.events.on("dragend", () => {
            if (!this.enabled) return
            const pos = sub(this._scrollPosition, this._dragPosition)
            this._scrollPosition = {
                x: Phaser.Math.Clamp(pos.x, 0, this._maxScrollPosition.x),
                y: Phaser.Math.Clamp(pos.y, 0, this._maxScrollPosition.y),
            }
            this._dragPosition = { x: 0, y: 0 }
            this.scene.events.on("update", this._kineticScroll, this)
        })
    }

    setContentWidth(contentWidth: number) {
        this._maxScrollPosition.x = Math.max(0, contentWidth - this.width)
        this.scrollX = this._scrollPosition.x
    }

    setContentHeight(contentHeight: number) {
        this._maxScrollPosition.y = Math.max(0, contentHeight - this.height)
        this.scrollY = this._scrollPosition.y
    }

    setContentSize(width: number, height: number) {
        this.setContentWidth(width)
        this.setContentHeight(height)
    }

    get scrollX() {
        return Phaser.Math.Clamp(
            this._scrollPosition.x - this._dragPosition.x,
            0,
            this._maxScrollPosition.x
        )
    }
    set scrollX(pos: number) {
        this._scrollPosition.x = Phaser.Math.Clamp(pos, 0, this._maxScrollPosition.x)
        this._updateContentPosition()
    }

    get scrollY() {
        return Phaser.Math.Clamp(
            this._scrollPosition.y - this._dragPosition.y,
            0,
            this._maxScrollPosition.y
        )
    }
    set scrollY(pos: number) {
        this._scrollPosition.y = Phaser.Math.Clamp(pos, 0, this._maxScrollPosition.y)
        this._updateContentPosition()
    }

    get maxScrollPositionX() {
        return this._maxScrollPosition.x
    }
    get maxScrollPositionY() {
        return this._maxScrollPosition.y
    }

    scrollTo(x: number, y: number) {
        this.scene.tweens.add({
            targets: this,
            scrollX: x,
            scrollY: y,
            duration: 400,
            ease: "Cubic.easeOut",
        })
    }
    scrollToStart() {
        this.scrollTo(0, 0)
    }
    scrollToEnd() {
        this.scrollTo(this._maxScrollPosition.x, this._maxScrollPosition.y)
    }

    private _updateContentPosition() {
        this._onScroll(this.scrollX, this.scrollY)
    }

    private _kineticScroll(_: number, delta: number) {
        this.scrollX -= delta * this._dragVelocity.x
        this.scrollY -= delta * this._dragVelocity.y
        this._dragVelocity = scale(this._dragVelocity, 0.94)

        if (len(this._dragVelocity) < 0.002) {
            this._dragVelocity = { x: 0, y: 0 }
            this.scene.events.off("update", this._kineticScroll, this)
        }
    }

    private readonly _onScroll: (x: number, y: number) => void
    private _scrollPosition = { x: 0, y: 0 }
    private _maxScrollPosition = { x: 0, y: 0 }
    private _dragPosition = { x: 0, y: 0 }
    private _dragVelocity = { x: 0, y: 0 }
    private _dragTimestamp = 0
}
