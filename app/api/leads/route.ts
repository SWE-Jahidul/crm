import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Lead from '@/models/Lead'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const skip = parseInt(searchParams.get('skip') || '0')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const source = searchParams.get('source')

    // Build query
    const query: any = {}
    if (status) query.status = status
    if (source) query.source = source

    // For now, use a demo organization ID
    // In production, this would come from the authenticated user's session
    query.organization_id = '000000000000000000000001'

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Lead.countDocuments(query),
    ])

    return NextResponse.json({
      data: leads,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit),
    })
  } catch (error: any) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()

    const lead = await Lead.create({
      organization_id: '000000000000000000000001',
      ...body,
      created_at: new Date(),
      updated_at: new Date(),
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error: any) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
