import { useLayoutEffect } from "react"
import type { Colors } from "../types"

function useColors(colors?: Colors) {
  const tableColorsRoot = [
    ["--tlib-color-hover", colors?.hover || "rgba(0, 8, 31, 0.836)"],
    ["--tlib-color-button", colors?.button || "rgb(0, 8, 31)"],
    ["--tlib-color-button-current-page", colors?.buttonCurrentPage || "#93ad18"],
    ["--tlib-color-button-disabled", colors?.buttonDisabled || "rgb(146, 146, 146)"],
    ["--tlib-color-sort-arrow", colors?.sortArrow || "rgba(228, 228, 228, 0.452)"],
    ["--tlib-color-sort-arrow-active", colors?.sortArrowActive || "white"],
  ]

  useLayoutEffect(() => {
    /** Applies css root colors values for calendar, based on calendarColors props */

    tableColorsRoot.forEach(([rootProperty, color]) => {
      document.documentElement.style.setProperty(rootProperty, color)
    })
  }, [colors])
}

export default useColors;