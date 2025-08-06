import { type Prisma, PrismaClient } from '@prisma/client'
import { 
  PaginationSchema,
  SigneeInputSchema,
  type SigneeStats,
  type SigneesResponse, 
} from './validation'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

const PUBLIC_FIELDS = {
  displayName: true,
  avatarUrl: true,
  profileUrl: true,
} as const satisfies Prisma.SigneeSelect

export { prisma }

export async function getAllSignees (query: unknown): Promise<SigneesResponse> {
  const { page, limit } = PaginationSchema.parse(query)
  const offset = (page - 1) * limit

  const paginationResult = await prisma.$transaction(async (tx) => {
    const signees = await tx.signee.findMany({
      select: PUBLIC_FIELDS,
      orderBy: { signedAt: 'desc' },
      skip: offset,
      take: limit,
    })
    
    const total = await tx.signee.count()
    
    return { signees, total }
  })

  const { signees, total } = paginationResult
  const totalPages = Math.ceil(total / limit)

  return {
    signees,
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  }
}

export async function addSignee (signeeData: unknown): Promise<void> {
  const validatedData = SigneeInputSchema.parse(signeeData)
  await prisma.signee.create({ data: validatedData })
}

export async function hasUserSigned (providerId: string, provider: 'github' | 'linkedin'): Promise<boolean> {
  const signee = await prisma.signee.findUnique({
    where: { providerId_provider: { providerId, provider } },
    select: { id: true },
  })
  return Boolean(signee)
}

export async function getStats (): Promise<SigneeStats> {
  const total = await prisma.signee.count()
  return { total }
}
