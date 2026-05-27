import Layout from '../../components/Layout'
import CloudBackgroundOrange from '../../components/CloudBackgroundOrange'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export default function Direction({ data }) {
  if (!data) {
    return <p>Data not available.</p> // Handle missing data gracefully
  }

  return (
    <Layout title={data.title || 'Untitled'}>
      <main>
        <CloudBackgroundOrange />

        <div className='container py-3 position-relative'>
          <h3 className='text-center hero-text text-black-50'>
            {data.title || 'Untitled'}
          </h3>

          <div className='text-center'>
            <Image
              alt={data.title || 'Image'}
              src={data.featuredImage || '/default-image.png'} // Provide a fallback image
              height={200}
              width={200}
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              quality={100}
              className='rounded-circle img-fluid'
            />
          </div>

          {/* Uncomment if needed */}
          {/* <div
            dangerouslySetInnerHTML={{ __html: data.content || '' }}
            className='fs-5 my-2 mx-sm-2 mx-md-3'
          /> */}
          <div
            className='fs-5 my-2 mx-sm-2 mx-md-3'
            dangerouslySetInnerHTML={{ __html: data.html }}
          />
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const dirDir = path.join(process.cwd(), 'content', 'direction')
  const fullPath = path.join(dirDir, `${params.slug}.mdx`)
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
  const data = {
    title: meta.title || params.slug,
    featuredImage: meta.featuredImage || '/img/blue-mandala.png',
    body,
    html,
  }

  return {
    props: {
      data,
    },
  }
}

export async function getStaticPaths() {
  const fs = (await import('fs')).default
  const path = (await import('path')).default
  const dirDir = path.join(process.cwd(), 'content', 'direction')
  const files = fs.readdirSync(dirDir)
  const paths = files
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => ({
      params: { slug: filename.replace(/\.mdx$/, '') },
    }))

  return { paths, fallback: false }
}
