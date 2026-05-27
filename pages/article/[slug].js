import Layout from '../../components/Layout'
import moment from 'moment'
import CloudBackgroundOrange from '../../components/CloudBackgroundOrange'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export default function Art({ article }) {
  return (
    <Layout title={article.title}>
      <main>
        <CloudBackgroundOrange />

        <div className='container py-3 position-relative'>
          <h3 className='text-center hero-text text-black-50'>
            <span style={{ color: 'rgb(61, 89, 122)' }}>{article.title}</span>
            <br />
          </h3>

          <h6 className='mx-sm-2 mx-md-3 fs-4 my-2 text-center'>
            Date: {moment(article.date).format('MMM Do YYYY')}
          </h6>
          <div className='d-flex justify-content-center align-items-center'>
            <Image
              alt={article.title}
              src={article.featuredImage}
              height={400}
              width={800}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={100}
              className='img-thumbnail img-fluid'
            />
          </div>

          <div className='fs-4 my-2 mx-sm-2 mx-md-3'>
            <div
              className='fs-4'
              dangerouslySetInnerHTML={{ __html: article.html }}
            />
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const articlesDir = path.join(process.cwd(), 'content', 'articles')
  const fullPath = path.join(articlesDir, `${params.slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf8')

  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  let meta = {}
  if (match) {
    try {
      meta = JSON.parse(match[1])
    } catch (e) {
      meta = {}
    }
  }
  const body = raw.replace(/^---[\s\S]*?---\n/, '')
  const html = marked.parse(body)
  const article = {
    title: meta.title || params.slug,
    date: meta.date || '',
    featuredImage: meta.featuredImage || '/img/blue-mandala.png',
    body,
    html,
  }

  return {
    props: {
      article,
    },
  }
}

export async function getStaticPaths() {
  const articlesDir = path.join(process.cwd(), 'content', 'articles')
  const files = fs.readdirSync(articlesDir)
  const paths = files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => ({
      params: { slug: filename.replace(/\.mdx$/, '') },
    }))

  return {
    paths,
    fallback: false, // Set to true if you want fallback pages for non-pre-rendered paths
  }
}
