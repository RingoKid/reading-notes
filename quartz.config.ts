import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The Ledger",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "ringokid.github.io/reading-notes",
    ignorePatterns: ["private", "templates", ".obsidian", "Library"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Source Sans Pro",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "hsla(35, 36%, 96%, 1)",       // Primary gray-20: warm cream bg
          lightgray: "hsla(36, 35%, 88%, 1)",   // Primary gray-50: borders, sidebar
          gray: "hsla(34, 29%, 60%, 1)",         // Primary gray-80: muted elements
          darkgray: "hsla(36, 32%, 30%, 1)",     // Primary gray-120: body text
          dark: "hsla(33, 54%, 17%, 1)",         // Primary gray-140: headers
          secondary: "hsla(4, 72%, 55%, 1)",      // Primary red-20: links
          tertiary: "hsla(4, 59%, 64%, 1)",      // Primary red-10: hover
          highlight: "hsla(350, 84%, 63%, 0.1)", // red tint for link bg
          textHighlight: "#f5d06088",             // warm yellow highlight
        },
        darkMode: {
          light: "hsla(29, 16%, 13%, 1)",        // Primary d-gray-120: dark bg
          lightgray: "hsla(28, 22%, 19%, 1)",    // Primary d-gray-80: borders
          gray: "hsla(33, 27%, 33%, 1)",          // Primary d-gray-60: muted
          darkgray: "hsla(34, 31%, 68%, 1)",      // Primary d-gray-30: body text
          dark: "hsla(32, 48%, 85%, 1)",          // Primary d-gray-10: headers
          secondary: "hsla(4, 91%, 67%, 1)",      // Primary d-red-20: links
          tertiary: "hsla(5, 94%, 73%, 1)",      // Primary d-red-10: hover
          highlight: "hsla(350, 84%, 63%, 0.15)", // dark red tint for link bg
          textHighlight: "#b3aa0288",             // warm highlight
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Plugin.CustomOgImages(), — disabled: crashes on complex script fonts
    ],
  },
}

export default config
