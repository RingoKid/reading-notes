// @ts-ignore
import script from "./scripts/collapsibleHeadings.inline"
import styles from "./styles/collapsibleHeadings.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const CollapsibleHeadings: QuartzComponent = (_props: QuartzComponentProps) => {
  return null
}

CollapsibleHeadings.afterDOMLoaded = script
CollapsibleHeadings.css = styles

export default (() => CollapsibleHeadings) satisfies QuartzComponentConstructor
