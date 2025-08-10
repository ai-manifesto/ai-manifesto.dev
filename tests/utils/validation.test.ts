import { describe, expect, it } from 'vitest'
import { PublicSigneeSchema, SigneesResponseSchema } from '../../server/utils/validation'
import { mockPublicSignee } from '../__fixtures__/user-data'

describe('validation schemas', () => {

  it('validate signee data', () => {
    const result = PublicSigneeSchema.parse(mockPublicSignee)
      
    expect(result).toEqual({
      displayName: 'Timnit Gebru',
      avatarUrl: 'https://github.com/avatars/timnit.jpg',
      profileUrl: 'https://github.com/timnit',
      firstName: 'Timnit',
      privacyLevel: 'full',
      showProfilePic: true,
    })
  })

  it('validate signee response', () => {
    const mockResponse = {
      signees: [mockPublicSignee],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    }
      
    const result = SigneesResponseSchema.parse(mockResponse)
    expect(result.signees).toHaveLength(1)
    expect(result.total).toBe(1)
  })
})
