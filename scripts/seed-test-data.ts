/**
 * THIS SCRIPT IS FOR TESTING PURPOSES ONLY AND IS CREATED BY AI ENTIRELY.
 * It will seed data to test pagination and privacy levels.
 * Run with: npx tsx scripts/seed-test-data.ts
 */

import { PrismaClient } from '@prisma/client'
import { createUserHash } from '../server/utils/privacy'
import type { SigneeInput } from '../server/utils/validation'

const prisma = new PrismaClient()

// Use SigneeInput type from validation schema, but make displayName required for seed data
interface TestSignee extends Omit<SigneeInput, 'displayName'> {
  displayName: string // Always required in seed data (matches our new requirement)
}

// Mix of privacy levels to test all scenarios
const testSignees: TestSignee[] = [
  // FULL privacy level signees (show everything)
  { displayName: 'Sarah Chen', provider: 'github', providerId: '987654', username: 'sarahchen', firstName: 'Sarah', lastName: 'Chen', avatarUrl: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=0ea5e9&color=fff&size=128', profileUrl: 'https://github.com/sarahchen', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Marcus Rodriguez', provider: 'linkedin', providerId: '456789', username: null, firstName: 'Marcus', lastName: 'Rodriguez', avatarUrl: 'https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=f59e0b&color=fff&size=128', profileUrl: 'https://linkedin.com/in/marcus-rodriguez-ai', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Dr. Priya Patel', provider: 'github', providerId: '123456', username: 'priyapatel', firstName: 'Priya', lastName: 'Patel', avatarUrl: 'https://ui-avatars.com/api/?name=Priya+Patel&background=ec4899&color=fff&size=128', profileUrl: 'https://github.com/priyapatel', privacyLevel: 'full', showProfilePic: false }, // Full but no profile pic
  { displayName: 'Alex Thompson', provider: 'linkedin', providerId: '789012', username: null, firstName: 'Alex', lastName: 'Thompson', avatarUrl: 'https://ui-avatars.com/api/?name=Alex+Thompson&background=10b981&color=fff&size=128', profileUrl: 'https://linkedin.com/in/alex-thompson-ml', privacyLevel: 'full', showProfilePic: true },

  // FIRST_NAME privacy level signees (show first name only)
  { displayName: 'Emily', provider: 'github', providerId: '345678', username: null, firstName: 'Emily', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Emily&background=8b5cf6&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: true },
  { displayName: 'Jordan', provider: 'linkedin', providerId: '901234', username: null, firstName: 'Jordan', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Jordan&background=f97316&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: false }, // First name but no profile pic
  { displayName: 'Hassan', provider: 'github', providerId: '567890', username: null, firstName: 'Hassan', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Hassan&background=ef4444&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: true },
  { displayName: 'Lisa', provider: 'linkedin', providerId: '234567', username: null, firstName: 'Lisa', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Lisa&background=06b6d4&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: true },

  // ANONYMOUS signees (completely anonymous)
  { displayName: 'Anonymous Supporter', provider: 'github', providerId: 'anon_a1b2c3d4', username: null, firstName: null, lastName: null, avatarUrl: '/anonymous-avatar.svg', profileUrl: '#', privacyLevel: 'anonymous', showProfilePic: false, userHash: createUserHash('678901', 'github') },
  { displayName: 'Anonymous Supporter', provider: 'linkedin', providerId: 'anon_e5f6g7h8', username: null, firstName: null, lastName: null, avatarUrl: '/anonymous-avatar.svg', profileUrl: '#', privacyLevel: 'anonymous', showProfilePic: false, userHash: createUserHash('890123', 'linkedin') },
  { displayName: 'Anonymous Supporter', provider: 'github', providerId: 'anon_i9j0k1l2', username: null, firstName: null, lastName: null, avatarUrl: '/anonymous-avatar.svg', profileUrl: '#', privacyLevel: 'anonymous', showProfilePic: false, userHash: createUserHash('012345', 'github') },
  { displayName: 'Anonymous Supporter', provider: 'linkedin', providerId: 'anon_m3n4o5p6', username: null, firstName: null, lastName: null, avatarUrl: '/anonymous-avatar.svg', profileUrl: '#', privacyLevel: 'anonymous', showProfilePic: false, userHash: createUserHash('543210', 'linkedin') },

  // More FULL privacy signees for pagination testing
  { displayName: 'Ryan O\'Connor', provider: 'github', providerId: '765432', username: 'ryanoconnor', firstName: 'Ryan', lastName: 'O\'Connor', avatarUrl: 'https://ui-avatars.com/api/?name=Ryan+O\'Connor&background=84cc16&color=fff&size=128', profileUrl: 'https://github.com/ryanoconnor', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Fatima Al-Rashid', provider: 'linkedin', providerId: '109876', username: null, firstName: 'Fatima', lastName: 'Al-Rashid', avatarUrl: 'https://ui-avatars.com/api/?name=Fatima+Al-Rashid&background=a855f7&color=fff&size=128', profileUrl: 'https://linkedin.com/in/fatima-al-rashid-security', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Prof. Michael Zhang', provider: 'github', providerId: '321098', username: 'michaelzhang', firstName: 'Michael', lastName: 'Zhang', avatarUrl: 'https://ui-avatars.com/api/?name=Michael+Zhang&background=14b8a6&color=fff&size=128', profileUrl: 'https://github.com/michaelzhang', privacyLevel: 'full', showProfilePic: true },

  // More FIRST_NAME privacy signees
  { displayName: 'Sophia', provider: 'linkedin', providerId: '654321', username: null, firstName: 'Sophia', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Sophia&background=f43f5e&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: true },
  { displayName: 'Kwame', provider: 'github', providerId: '876543', username: null, firstName: 'Kwame', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Kwame&background=6366f1&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: false },
  { displayName: 'Ava', provider: 'linkedin', providerId: '198765', username: null, firstName: 'Ava', lastName: null, avatarUrl: 'https://ui-avatars.com/api/?name=Ava&background=0891b2&color=fff&size=128', profileUrl: '#', privacyLevel: 'first_name', showProfilePic: true },

  // More ANONYMOUS signees
  { displayName: 'Anonymous Supporter', provider: 'github', providerId: 'anon_q7r8s9t0', username: null, firstName: null, lastName: null, avatarUrl: '/anonymous-avatar.svg', profileUrl: '#', privacyLevel: 'anonymous', showProfilePic: false, userHash: createUserHash('432109', 'github') },
  { displayName: 'Anonymous Supporter', provider: 'linkedin', providerId: 'anon_u1v2w3x4', username: null, firstName: null, lastName: null, avatarUrl: '/anonymous-avatar.svg', profileUrl: '#', privacyLevel: 'anonymous', showProfilePic: false, userHash: createUserHash('567432', 'linkedin') },

  // Additional full privacy for pagination
  { displayName: 'James Park', provider: 'github', providerId: '210987', username: 'jamespark', firstName: 'James', lastName: 'Park', avatarUrl: 'https://ui-avatars.com/api/?name=James+Park&background=dc2626&color=fff&size=128', profileUrl: 'https://github.com/jamespark', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Leila Hassan', provider: 'linkedin', providerId: '789654', username: null, firstName: 'Leila', lastName: 'Hassan', avatarUrl: 'https://ui-avatars.com/api/?name=Leila+Hassan&background=059669&color=fff&size=128', profileUrl: 'https://linkedin.com/in/leila-hassan-tech', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Dr. Benjamin Torres', provider: 'github', providerId: '654987', username: 'benjamintorres', firstName: 'Benjamin', lastName: 'Torres', avatarUrl: 'https://ui-avatars.com/api/?name=Benjamin+Torres&background=7c3aed&color=fff&size=128', profileUrl: 'https://github.com/benjamintorres', privacyLevel: 'full', showProfilePic: false },
  { displayName: 'Maya Johansson', provider: 'linkedin', providerId: '321654', username: null, firstName: 'Maya', lastName: 'Johansson', avatarUrl: 'https://ui-avatars.com/api/?name=Maya+Johansson&background=ea580c&color=fff&size=128', profileUrl: 'https://linkedin.com/in/maya-johansson-ethics', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Ravi Sharma', provider: 'github', providerId: '987321', username: 'ravisharma', firstName: 'Ravi', lastName: 'Sharma', avatarUrl: 'https://ui-avatars.com/api/?name=Ravi+Sharma&background=0d9488&color=fff&size=128', profileUrl: 'https://github.com/ravisharma', privacyLevel: 'full', showProfilePic: true },
  { displayName: 'Isabella Costa', provider: 'linkedin', providerId: '159753', username: null, firstName: 'Isabella', lastName: 'Costa', avatarUrl: 'https://ui-avatars.com/api/?name=Isabella+Costa&background=be185d&color=fff&size=128', profileUrl: 'https://linkedin.com/in/isabella-costa-ai', privacyLevel: 'full', showProfilePic: true },
]

async function seedTestData () {
  console.log('🌱 Seeding test data with privacy levels...')
  
  let added = 0
  let skipped = 0
  const privacyStats = { full: 0, first_name: 0, anonymous: 0 }
  
  for (const signee of testSignees) {
    try {
      await prisma.signee.create({ data: signee })
      console.log(`✅ Added: ${signee.displayName} (${signee.privacyLevel})`)
      added++
      privacyStats[signee.privacyLevel]++
    } catch (error: any) {
      if (error.code === 'P2002') {
        console.log(`⏭️  Skipped: ${signee.displayName} (already exists)`)
        skipped++
      } else {
        console.error(`❌ Failed to add ${signee.displayName}:`, error.message)
      }
    }
  }
  
  console.log(`\n📊 Summary: ${added} added, ${skipped} skipped`)
  console.log('🔒 Privacy breakdown:')
  console.log(`   • Full: ${privacyStats.full} signees (show full name, conditional avatar, clickable)`)
  console.log(`   • First name: ${privacyStats.first_name} signees (show first name only, conditional avatar, not clickable)`)
  console.log(`   • Anonymous: ${privacyStats.anonymous} signees (show "Anonymous Supporter", default avatar, not clickable)`)
}

async function clearTestData () {
  console.log('🧹 Clearing all signees...')
  const deleted = await prisma.signee.deleteMany()
  console.log(`✅ Deleted ${deleted.count} signees`)
}

async function main () {
  const action = (globalThis as any).process?.argv?.[2]
  
  try {
    if (action === 'clear') {
      await clearTestData()
    } else {
      await seedTestData()
    }
  } catch (error) {
    console.error('❌ Error:', error)
    // Exit with error code
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
