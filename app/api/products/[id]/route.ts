import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient()
export async function PATCH(req: NextRequest, context: any) {
  const { id } = context.params
  try {
    const { stock } = await req.json()
    if (typeof stock !== 'number') {
      return NextResponse.json({ error: 'Invalid stock' }, { status: 400 })
    }
    const updated = await prisma.product.update({
      where: { id },
      data: { stock },
    })
    return NextResponse.json(updated)
  } catch (err) {
    console.error('Error updating stock', err)
    return NextResponse.json(
      { error: 'Product not found or update failed' },
      { status: 500 }
    )
  }
}
