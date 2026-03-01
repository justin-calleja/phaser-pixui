/**
 * Size in pixels.
 */
export type Size = {
    width: number
    height: number
}

/**
 * {@link Size} that can be relative to a parent.
 *
 * - **Positive values** (e.g. 100): Actual size in pixels.
 * - **Zero or negative values** (e.g. -20): Size relative to the parent.
 *   For example, `-20` means 20 px narrower than the parent, and `0` means
 *   the same size as the parent.
 * - **Undefined**: Treated as zero, which means the same size as the parent.
 */
export type RelativeSize = {
    width?: number
    height?: number
}

/**
 * Converts a {@link RelativeSize} to a {@link Size} by resolving
 * relative values against the parent size.
 *
 * @param s - Relative size to resolve
 * @param parent - The parent's size
 * @returns Resolved size
 */
export function calcSize(s: RelativeSize, parent: Size): Size {
    return {
        width: absDimension(s.width, parent.width),
        height: absDimension(s.height, parent.height),
    }
}

function absDimension(value: number | undefined, parent: number): number {
    if (value === undefined) value = 0
    if (value > 0) return value
    return parent + value
}
