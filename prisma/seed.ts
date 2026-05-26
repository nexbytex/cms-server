import bcrypt from 'bcrypt';
import prisma from "../src/utils/prisma"
import { Role } from '../src/generated/prisma/client';
async function main() {
    const passwordHash = await bcrypt.hash('admin123', 10);

    const admin = await prisma.user.upsert({
        where: { email: 'admin@cms.com' },
        update: {},
        create: {
            name: 'Super Admin',
            email: 'admin@cms.com',
            passwordHash,
            role: Role.ADMIN,
        },
    });

    console.log('Admin seeded:', admin.email);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());