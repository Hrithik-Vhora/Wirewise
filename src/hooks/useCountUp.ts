import { useEffect, useState } from 'react'

/**
 * Animates from 0 up to `target` using an eased tween, restarting
 * whenever `target` changes. Returns the current animated value.
 */
export function useCountUp(target: number, durationMs = 700): number {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const to = Number.isFinite(target) ? target : 0
    const start = performance.now()
    let frame: number

    const tick = (now: number) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / durationMs)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(to * eased)
      if (t < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, durationMs])

  return display
}
