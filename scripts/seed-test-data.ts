/**
 * Development seed script for testing pagination
 * This script has been created with ai and is for dev proposes only!
 * Run with: npx tsx scripts/seed-test-data.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const testSignees = [
  { displayName: 'Sarah Chen', provider: 'github' as const, providerId: '987654', username: 'sarahchen', firstName: 'Sarah', lastName: 'Chen', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=sarahchen', profileUrl: 'https://github.com/sarahchen' },
  { displayName: 'Marcus Rodriguez', provider: 'linkedin' as const, providerId: '456789', username: 'marcusrodriguez', firstName: 'Marcus', lastName: 'Rodriguez', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=marcus', profileUrl: 'https://linkedin.com/in/marcus-rodriguez-ai' },
  { displayName: 'Dr. Priya Patel', provider: 'github' as const, providerId: '123456', username: 'priyapatel', firstName: 'Priya', lastName: 'Patel', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=priya', profileUrl: 'https://github.com/priyapatel' },
  { displayName: 'Alex Thompson', provider: 'linkedin' as const, providerId: '789012', username: 'alexthompson', firstName: 'Alex', lastName: 'Thompson', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=alexthompson', profileUrl: 'https://linkedin.com/in/alex-thompson-ml' },
  { displayName: 'Emily Kim', provider: 'github' as const, providerId: '345678', username: 'emilykim', firstName: 'Emily', lastName: 'Kim', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=emily', profileUrl: 'https://github.com/emilykim' },
  { displayName: 'Jordan Walker', provider: 'linkedin' as const, providerId: '901234', username: 'jordanwalker', firstName: 'Jordan', lastName: 'Walker', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=jordan', profileUrl: 'https://linkedin.com/in/jordan-walker-dev' },
  { displayName: 'Hassan Ali', provider: 'github' as const, providerId: '567890', username: 'hassanali', firstName: 'Hassan', lastName: 'Ali', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=hassan', profileUrl: 'https://github.com/hassanali' },
  { displayName: 'Lisa Martinez', provider: 'linkedin' as const, providerId: '234567', username: 'lisamartinez', firstName: 'Lisa', lastName: 'Martinez', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=lisa', profileUrl: 'https://linkedin.com/in/lisa-martinez-engineer' },
  { displayName: 'Chen Wei', provider: 'github' as const, providerId: '678901', username: 'chenwei', firstName: 'Chen', lastName: 'Wei', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=chenwei', profileUrl: 'https://github.com/chenwei' },
  { displayName: 'Aria Johnson', provider: 'linkedin' as const, providerId: '890123', username: 'ariajohnson', firstName: 'Aria', lastName: 'Johnson', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=aria', profileUrl: 'https://linkedin.com/in/aria-johnson-devops' },
  { displayName: 'Dmitri Volkov', provider: 'github' as const, providerId: '012345', username: 'dmitrivolkov', firstName: 'Dmitri', lastName: 'Volkov', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=dmitri', profileUrl: 'https://github.com/dmitrivolkov' },
  { displayName: 'Zara Ahmed', provider: 'linkedin' as const, providerId: '543210', username: 'zaraahmed', firstName: 'Zara', lastName: 'Ahmed', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=zara', profileUrl: 'https://linkedin.com/in/zara-ahmed-pm' },
  { displayName: 'Ryan O\'Connor', provider: 'github' as const, providerId: '765432', username: 'ryanoconnor', firstName: 'Ryan', lastName: 'O\'Connor', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=ryan', profileUrl: 'https://github.com/ryanoconnor' },
  { displayName: 'Fatima Al-Rashid', provider: 'linkedin' as const, providerId: '109876', username: 'fatimaalrashid', firstName: 'Fatima', lastName: 'Al-Rashid', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=fatima', profileUrl: 'https://linkedin.com/in/fatima-al-rashid-security' },
  { displayName: 'Prof. Michael Zhang', provider: 'github' as const, providerId: '321098', username: 'michaelzhang', firstName: 'Michael', lastName: 'Zhang', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=michael', profileUrl: 'https://github.com/michaelzhang' },
  { displayName: 'Dr. Sophia Nakamura', provider: 'linkedin' as const, providerId: '654321', username: 'sophianakamura', firstName: 'Sophia', lastName: 'Nakamura', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=sophia', profileUrl: 'https://linkedin.com/in/sophia-nakamura-phd' },
  { displayName: 'Kwame Asante', provider: 'github' as const, providerId: '876543', username: 'kwameasante', firstName: 'Kwame', lastName: 'Asante', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=kwame', profileUrl: 'https://github.com/kwameasante' },
  { displayName: 'Ava Bergström', provider: 'linkedin' as const, providerId: '198765', username: 'avabergstrom', firstName: 'Ava', lastName: 'Bergström', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=ava', profileUrl: 'https://linkedin.com/in/ava-bergstrom-founder' },
  { displayName: 'Carlos Mendoza', provider: 'github' as const, providerId: '432109', username: 'carlosmendoza', firstName: 'Carlos', lastName: 'Mendoza', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=carlos', profileUrl: 'https://github.com/carlosmendoza' },
  { displayName: 'Nadia Petrov', provider: 'linkedin' as const, providerId: '567432', username: 'nadiapetrov', firstName: 'Nadia', lastName: 'Petrov', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=nadia', profileUrl: 'https://linkedin.com/in/nadia-petrov-oss' },
  { displayName: 'James Park', provider: 'github' as const, providerId: '210987', username: 'jamespark', firstName: 'James', lastName: 'Park', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=james', profileUrl: 'https://github.com/jamespark' },
  { displayName: 'Leila Hassan', provider: 'linkedin' as const, providerId: '789654', username: 'leilahassan', firstName: 'Leila', lastName: 'Hassan', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=leila', profileUrl: 'https://linkedin.com/in/leila-hassan-tech' },
  { displayName: 'Dr. Benjamin Torres', provider: 'github' as const, providerId: '654987', username: 'benjamintorres', firstName: 'Benjamin', lastName: 'Torres', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=benjamin', profileUrl: 'https://github.com/benjamintorres' },
  { displayName: 'Maya Johansson', provider: 'linkedin' as const, providerId: '321654', username: 'mayajohansson', firstName: 'Maya', lastName: 'Johansson', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=maya', profileUrl: 'https://linkedin.com/in/maya-johansson-ethics' },
  { displayName: 'Ravi Sharma', provider: 'github' as const, providerId: '987321', username: 'ravisharma', firstName: 'Ravi', lastName: 'Sharma', avatarUrl: 'https://avatar.iran.liara.run/public/boy?username=ravi', profileUrl: 'https://github.com/ravisharma' },
  { displayName: 'Isabella Costa', provider: 'linkedin' as const, providerId: '159753', username: 'isabellacosta', firstName: 'Isabella', lastName: 'Costa', avatarUrl: 'https://avatar.iran.liara.run/public/girl?username=isabella', profileUrl: 'https://linkedin.com/in/isabella-costa-ai' },
]

async function seedTestData () {
  console.log('🌱 Seeding test data...')
  
  let added = 0
  let skipped = 0
  
  for (const signee of testSignees) {
    try {
      await prisma.signee.create({ data: signee })
      console.log(`✅ Added: ${signee.displayName}`)
      added++
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
