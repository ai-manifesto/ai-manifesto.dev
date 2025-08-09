import { z } from 'zod'

export const ProviderSchema = z.enum([
  'github',
  'linkedin',
])

export const PrivacyLevelSchema = z.enum([
  'full',
  'first_name',
  'anonymous',
])

export const PrivacySessionSchema = z.object({
  privacyLevel: PrivacyLevelSchema,
  showProfilePic: z.boolean(),
})

export const SigneeInputSchema = z.object({
  providerId: z.string(),
  provider: ProviderSchema,
  username: z.string().optional().nullable(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  displayName: z.string().optional().nullable(),
  avatarUrl: z.string(),
  profileUrl: z.string(),
  privacyLevel: PrivacyLevelSchema.default('full'),
  showProfilePic: z.boolean().default(true),
  userHash: z.string().optional().nullable(),
})

export const PaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(20),
})

export const PublicSigneeSchema = z.object({
  displayName: z.string().nullable(),
  avatarUrl: z.string(),
  profileUrl: z.string(),
  firstName: z.string().optional().nullable(),
  privacyLevel: PrivacyLevelSchema.optional(),
  showProfilePic: z.boolean().optional(),
})

export const SigneesResponseSchema = z.object({
  signees: z.array(PublicSigneeSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
})

export const SigneeStatsSchema = z.object({
  total: z.number(),
})

export type SigneesResponse = z.infer<typeof SigneesResponseSchema>
export type SigneeStats = z.infer<typeof SigneeStatsSchema>
