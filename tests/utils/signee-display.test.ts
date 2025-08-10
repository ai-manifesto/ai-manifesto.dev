import { describe, expect, it } from 'vitest'
import { getSigneeDisplayData } from '../../shared/utils/signee-display'
import type { SigneeData } from '../../server/utils/validation'
import { mockProcessedSigneeData } from '../__fixtures__/user-data'

describe('signee display testing', () => {
  describe('getSigneeDisplayData', () => {
    it('github - full privacy', () => {
      const result = getSigneeDisplayData(mockProcessedSigneeData.fullPrivacy, true)
        
      expect(result).toEqual({
        name: 'Timnit Gebru',
        avatar: 'https://github.com/avatars/timnit.jpg',
        profileUrl: 'https://github.com/timnit',
        isClickable: true,
      })
    })

    it('linkedin - first name privacy', () => {
      const result = getSigneeDisplayData(mockProcessedSigneeData.firstNamePrivacy, true)
        
      expect(result).toEqual({
        name: 'Kate',
        avatar: 'https://linkedin.com/avatars/katecrawford.jpg',
        profileUrl: '#',
        isClickable: false,
      })
    })

    it('github - anonymous privacy', () => {
      const result = getSigneeDisplayData(mockProcessedSigneeData.anonymousPrivacy, true)
        
      expect(result).toEqual({
        name: 'Anonymous Supporter',
        avatar: '/anonymous-avatar.svg',
        profileUrl: '#',
        isClickable: false,
      })
    })

    it('hide profile pic', () => {
      const signeeWithHiddenPic: SigneeData = {
        ...mockProcessedSigneeData.fullPrivacy,
        showProfilePic: false,
      }
        
      const result = getSigneeDisplayData(signeeWithHiddenPic)
        
      expect(result.avatar).toBe('/anonymous-avatar.svg')
    })

    it('card isClickable is false', () => {
      const result = getSigneeDisplayData(mockProcessedSigneeData.fullPrivacy, false)
        
      expect(result).not.toHaveProperty('isClickable')
    })
  })
})

