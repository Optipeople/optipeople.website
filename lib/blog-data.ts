import fs from "fs"
import path from "path"
import matter from "gray-matter"

export type BlogPost = {
  slug: string
  title: string
  content: string
  date: string
  author: string
  category: string
  image?: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getAllPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        content,
        date: data.date,
        author: data.author,
        category: data.category,
        image: data.image,
      } as BlogPost
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      content,
      date: data.date,
      author: data.author,
      category: data.category,
      image: data.image,
    } as BlogPost
  } catch {
    return undefined
  }
}

export function getLatestPosts(count: number = 3): BlogPost[] {
  return getAllPosts().slice(0, count)
}

export function getLatestPostsByCategory(category: string, count: number = 3): BlogPost[] {
  return getPostsByCategory(category).slice(0, count)
}

export function getCategories(): string[] {
  const posts = getAllPosts()
  return [...new Set(posts.map((post) => post.category))].sort()
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category)
}

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""))
}
