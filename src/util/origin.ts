// Describes origin configuration of component
export type OriginConfig = {
    originX?: OriginX,
    originY?: OriginY,
}

// Describes actual origin
export type Origin = {
    originX: OriginX,
    originY: OriginY,
}

export enum OriginX { Left = 0, Center = 0.5, Right = 1 }
export enum OriginY { Top = 0, Center = 0.5, Bottom = 1 }

export function calcOrigin(cfg: OriginConfig, fallback: Origin): Origin {
    return {
        originX: cfg.originX ?? fallback.originX,
        originY: cfg.originY ?? fallback.originY,
    }
}
