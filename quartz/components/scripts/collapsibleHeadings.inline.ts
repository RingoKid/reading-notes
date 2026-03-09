function setupCollapsibleHeadings() {
  const article = document.querySelector("article")
  if (!article) return

  const headings = article.querySelectorAll("h2, h3, h4") as NodeListOf<HTMLElement>

  for (const heading of headings) {
    // Skip if already processed
    if (heading.dataset.collapsible) continue
    heading.dataset.collapsible = "true"

    const headingLevel = parseInt(heading.tagName[1])

    // Collect siblings until next same-or-higher-level heading
    const siblings: Element[] = []
    let next = heading.nextElementSibling
    while (next) {
      if (/^H[1-6]$/i.test(next.tagName)) {
        const nextLevel = parseInt(next.tagName[1])
        if (nextLevel <= headingLevel) break
      }
      siblings.push(next)
      next = next.nextElementSibling
    }

    // No content to collapse — skip
    if (siblings.length === 0) continue

    // Create wrapper with inner div for CSS grid animation
    const wrapper = document.createElement("div")
    wrapper.classList.add("heading-content")

    const inner = document.createElement("div")
    inner.classList.add("heading-content-inner")
    wrapper.appendChild(inner)

    // Insert wrapper after heading, move siblings into it
    heading.after(wrapper)
    for (const sib of siblings) {
      inner.appendChild(sib)
    }

    // Add fold chevron (left side, before heading content)
    const fold = document.createElement("span")
    fold.classList.add("fold-heading-icon")
    heading.prepend(fold)

    // Auto-collapse certain sections
    const headingText = heading.textContent?.trim().toLowerCase() ?? ""
    if (headingText.includes("highlights") || headingText.includes("poems")) {
      heading.classList.add("is-collapsed")
      wrapper.style.gridTemplateRows = "0fr"
    }

    // Toggle on click (but not when clicking anchor links)
    const toggle = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a")) return
      heading.classList.toggle("is-collapsed")
      const collapsed = heading.classList.contains("is-collapsed")
      wrapper.style.gridTemplateRows = collapsed ? "0fr" : "1fr"
    }

    heading.addEventListener("click", toggle)
    window.addCleanup(() => heading.removeEventListener("click", toggle))
  }
}

document.addEventListener("nav", setupCollapsibleHeadings)
