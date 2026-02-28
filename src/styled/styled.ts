import { ComponentConfig } from '../core/component.ts'
import { Scene } from 'phaser'
import { Container } from '../core/container.ts'
import { ThemeConfig } from '../theme/theme.ts'
import type { StyledMultiFactory } from './factory.ts'

export type StyledComponentConfig = {
    style?: string
} & ComponentConfig

export class StyledComponent extends Container<StyledMultiFactory> {
    constructor(
        scene: Scene,
        factory: StyledMultiFactory,
        theme: ThemeConfig,
        cfg?: StyledComponentConfig
    ) {
        super(scene, factory, cfg)
        this.theme = theme
    }
    readonly theme: ThemeConfig
}
