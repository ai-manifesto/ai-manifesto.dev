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

export const BasePrivacySchema = z.object({
  privacyLevel: PrivacyLevelSchema,
  showProfilePic: z.boolean(),
})

export const PrivacySessionSchema = BasePrivacySchema

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
  limit: z.coerce.number().min(1).max(50).default(21),
})

export const PublicSigneeSchema = z.object({
  displayName: z.string(),
  avatarUrl: z.string(),
  profileUrl: z.string(),
  firstName: z.string().optional().nullable(),
}).extend(BasePrivacySchema.partial().shape)

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

export const SigneeDisplayDataSchema = z.object({
  name: z.string(),
  avatar: z.string(),
  profileUrl: z.string(),
  isClickable: z.boolean().optional(),
})

export const SigneeDataSchema = z.object({
  displayName: z.string(),
  firstName: z.string().optional().nullable(),
  avatarUrl: z.string(),
  profileUrl: z.string(),
}).extend(BasePrivacySchema.partial().shape)

export const UserDataSchema = z.object({
  id: z.union([
    z.string(),
    z.number(),
  ]),
  name: z.string().optional(),
  login: z.string().optional(),
  given_name: z.string().optional(),
  family_name: z.string().optional(),
  avatar_url: z.string().optional(),
  picture: z.string().optional(),
  html_url: z.string().optional(),
  profileUrl: z.string().optional(),
})

export const PrivacySessionDataSchema = z.object({
  privacyLevel: PrivacyLevelSchema,
  showProfilePic: z.boolean(),
  timestamp: z.number(),
})

export type PrivacyLevel = z.infer<typeof PrivacyLevelSchema>
export type PrivacyOptions = z.infer<typeof PrivacySessionSchema>
export type UserData = z.infer<typeof UserDataSchema>
export type PrivacySessionData = z.infer<typeof PrivacySessionDataSchema>
export type SigneeInput = z.infer<typeof SigneeInputSchema>
export type PublicSignee = z.infer<typeof PublicSigneeSchema>
export type SigneesResponse = z.infer<typeof SigneesResponseSchema>
export type SigneeStats = z.infer<typeof SigneeStatsSchema>
export type SigneeDisplayData = z.infer<typeof SigneeDisplayDataSchema>
export type SigneeData = z.infer<typeof SigneeDataSchema>
