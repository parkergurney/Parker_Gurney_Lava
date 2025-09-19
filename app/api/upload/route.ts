import { NextRequest, NextResponse } from 'next/server'
import { put, head } from '@vercel/blob'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    const path = `products/${file.name}`
    try {
      const blob = await put(path, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
      return NextResponse.json({ url: blob.url })
    } catch (err: any) {
      if (typeof err.message === 'string' && err.message.includes('This blob already exists')) {
        const existing = await head(path, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        })
        if (existing?.url) {
          return NextResponse.json({ url: existing.url })
        }
      }
      throw err
    }
  } catch (err) {
    console.error('Upload error', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}