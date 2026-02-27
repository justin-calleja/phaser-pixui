export type vec2 = { x: number; y: number }

export function add(v1: vec2, v2: vec2): vec2 {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export function sub(v1: vec2, v2: vec2): vec2 {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
}

export function scale(v: vec2, s: number): vec2 {
    return { x: v.x * s, y: v.y * s }
}

export function len(v: vec2): number {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}
