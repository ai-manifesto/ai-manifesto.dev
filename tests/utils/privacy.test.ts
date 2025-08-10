import { describe, expect, it } from 'vitest'
import { createUserHash, processSigneeData } from '../../server/utils/privacy'
import type { PrivacyOptions } from '../../server/utils/validation'
import { mockGitHubUser, mockLinkedInUser } from '../__fixtures__/user-data'

describe('privacy testing', () => {
  describe('createConsistentHash', () => {
    it('works', () => {
      const hash1 = createUserHash('12345', 'github')
      const hash2 = createUserHash('12345', 'github')
      
      expect(hash1).toBe(hash2)
      expect(hash1).toHaveLength(64) 
    })
   
    it('different hashes', () => {
      const githubHash = createUserHash('12345', 'github')
      const linkedinHash = createUserHash('12345', 'linkedin')
      const differentUserHash = createUserHash('67890', 'github')
      
      expect(githubHash).not.toBe(linkedinHash)
      expect(githubHash).not.toBe(differentUserHash)
    })
  })

  describe('processSigneeData', () => {
    it('github - full privacy', () => {
      const options: PrivacyOptions = { privacyLevel: 'full', showProfilePic: true }
      const result = processSigneeData(mockGitHubUser, 'github', options)
      
      expect(result).toEqual({
        providerId: '12345',
        provider: 'github',
        username: 'timnit',
        firstName: 'Timnit',
        lastName: 'Gebru',
        displayName: 'Timnit Gebru',
        avatarUrl: 'https://github.com/avatars/timnit.jpg',
        profileUrl: 'https://github.com/timnit',
        privacyLevel: 'full',
        showProfilePic: true,
        userHash: null,
      })
    })

    it('linkedin - first name privacy', () => {
      const options: PrivacyOptions = { privacyLevel: 'first_name', showProfilePic: true }
      const result = processSigneeData(mockLinkedInUser, 'linkedin', options)
      
      expect(result).toEqual({
        providerId: '67890',
        provider: 'linkedin',
        username: null,
        firstName: 'Kate',
        lastName: null,
        displayName: 'Kate',
        avatarUrl: 'https://linkedin.com/avatars/katecrawford.jpg',
        profileUrl: '#',
        privacyLevel: 'first_name',
        showProfilePic: true,
        userHash: null,
      })
    })

    it('linkedin - first name privacy no profile pic', () => {
      const options: PrivacyOptions = { privacyLevel: 'first_name', showProfilePic: false }
      const result = processSigneeData(mockLinkedInUser, 'linkedin', options)
      
      expect(result).toEqual({
        providerId: '67890',
        provider: 'linkedin',
        username: null,
        firstName: 'Kate',
        lastName: null,
        displayName: 'Kate',
        avatarUrl: '/anonymous-avatar.svg',
        profileUrl: '#',
        privacyLevel: 'first_name',
        showProfilePic: false,
        userHash: null,
      })
    })

    it('github - anonymous', () => {
      const options: PrivacyOptions = { privacyLevel: 'anonymous', showProfilePic: false }
      const result = processSigneeData(mockGitHubUser, 'github', options)
      
      expect(result).toEqual({
        providerId: expect.stringMatching(/^anon_[a-f0-9]{8}$/),
        provider: 'github',
        username: null,
        firstName: null,
        lastName: null,
        displayName: 'Anonymous Supporter',
        avatarUrl: '/anonymous-avatar.svg',
        profileUrl: '#',
        privacyLevel: 'anonymous',
        showProfilePic: false,
        userHash: expect.stringMatching(/^[a-f0-9]{64}$/),
      })
    })

    it('hide profile pic', () => {
      const options: PrivacyOptions = { privacyLevel: 'full', showProfilePic: false }
      const result = processSigneeData(mockGitHubUser, 'github', options)
      
      expect(result.avatarUrl).toBe('/anonymous-avatar.svg')
      expect(result.showProfilePic).toBe(false)
    })
  })
})
