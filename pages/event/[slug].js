import Layout from '../../components/Layout'
import CloudBackgroundOrange from '../../components/CloudBackgroundOrange'
import Image from 'next/image'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export default function Evt({ event }) {
  // console.log('event')
  // console.log(event)
  return (
    <Layout title={event.title}>

      <main>
        <CloudBackgroundOrange />
        <div className='container py-3 position-relative'>
          <h3 className='text-center hero-text text-black-50'>
            <span style={{ color: 'rgb(61, 89, 122)' }}>{event.title}</span>
            <br />
          </h3>
          <div className='row py-3'>
            <div className='col-md-4 text-center p-1'>
              <Image
                alt={event.title}
                src={event.featuredImage}
                height={200}
                width={200}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                quality={100}
                className='rounded-circle img-fluid'
              />
            </div>
            <div className='col-md-8 d-flex flex-column justify-content-center align-items-center align-items-md-start p-4'>
              <h4 className='text-start'>{event.title}</h4>
              {event.subtitle && (
                <h4 className='text-start'>{event.subtitle}</h4>
              )}
              {event.subtitle2 && (
                <h4 className='text-start'>{event.subtitle2}</h4>
              )}
              {event.subtitle3 && (
                <h4 className='text-start'>{event.subtitle3}</h4>
              )}
            </div>
          </div>
          <div className='fs-5 my-2 mx-sm-2 mx-md-3'>
            <div
              className='fs-5'
              dangerouslySetInnerHTML={{ __html: event.html }}
            />
          </div>

          {event.registerurl && (
            <div className='d-flex justify-content-center'>
              <button className='btn btn-success text-white' type='button'>
                <Link className='text-white' href={event.registerurl}>
                  Register for Event
                </Link>
              </button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const eventsDir = path.join(process.cwd(), 'content', 'events')
  const fullPath = path.join(eventsDir, `${params.slug}.mdx`)
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
  const event = {
    title: meta.title || params.slug,
    subtitle: meta.subtitle || '',
    subtitle2: meta.subtitle2 || '',
    subtitle3: meta.subtitle3 || '',
    featuredImage: meta.featuredImage || '/img/blue-mandala.png',
    registerurl: meta.registerurl || '',
    body,
    html,
  }

  return {
    props: {
      event,
    },
  }
}

// Fetch all event slugs for static paths
export async function getStaticPaths() {
  const fs = (await import('fs')).default
  const path = (await import('path')).default
  const eventsDir = path.join(process.cwd(), 'content', 'events')
  const files = fs.readdirSync(eventsDir)
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
