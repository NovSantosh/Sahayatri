import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const cloudinaryForm = new FormData()
    cloudinaryForm.append('file', file)
    cloudinaryForm.append('upload_preset', 'sahayatri_upload')
    cloudinaryForm.append('cloud_name', 'dsg0x2c60')

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dsg0x2c60/image/upload`,
      { method: 'POST', body: cloudinaryForm }
    )

    const data = await res.json()

    if (data.secure_url) {
      return NextResponse.json({ url: data.secure_url })
    } else {
      console.error('Cloudinary error:', data)
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
