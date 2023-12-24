import * as cheerio from 'cheerio';
import { XMLParser } from 'fast-xml-parser'

function cleanSummary(summary?: string) {
  if (typeof summary!== `string`) return ``
  const $ = cheerio.load(summary)
  $(`h2`).remove()
  $(`a`).each((index, element) => {
    const $link = $(element)
    const content = $link.html()
    $link.replaceWith(`<span>${content}</span>`)
  })
  return $(`body`)?.html()?.trim() ?? ``
}

export interface BlogPost {
  title: string
  link: string
  cover: string
  published: string
  updated: string
  summary: string
}

interface Response {
  posts: Array<BlogPost>
}

const parser = new XMLParser();

export default defineEventHandler(async (event) => {
  const EMPTY_POSTS: Response = { posts: [] }
  try {
    const atomResponse = await $fetch<any>(`https://hiswe.github.io/atom.xml`)
    const atomJS = parser.parse(atomResponse);
    const blogEntries = atomJS.feed?.entry
    if (!Array.isArray(blogEntries)) return EMPTY_POSTS
    const posts: Response['posts'] = blogEntries.map((post) => {
      const title = typeof post.title === `string` ? post.title : `` 
      const link = typeof post.id === `string` ? post.id : ``
      const published = typeof post.published === `string` ? post.published : `` 
      const updated = typeof post.updated === `string` ? post.updated : ``
      return {
        title,
        link: link,
        cover: `${link}cover.png`,
        published: published,
        updated: updated,
        summary: cleanSummary(post.summary),
      }
    })
    return { posts }
  } catch (error) {
    console.error(error)
    return EMPTY_POSTS
  }
})