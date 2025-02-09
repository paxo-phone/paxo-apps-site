import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Create a user
    const the_creator = await prisma.user.create({
        data: {
            email: 'rootuser@example.com',
            username: 'RootUser'
        }
    })

    for (let a = 0; a < 6; a++) {
        for (let b = 0; b < 10; b++) {

            const app = await prisma.app.create({
                data: {
                    name: `App ${b}`,
                    shortDesc: `This app is super cool and you should use it.`,
                    imageUrl: '/img/logo.png',
                    repoUrl: 'https://github.com/paxo-phone/paxo-site',
                    extUrl: `https://github.com/paxo-phone/paxo-site/pulls/${b}`,
                    category: a,
                    userId: the_creator.id,
                    downloads: Math.floor(Math.random() * 1000),
                }
            })

            for (let c = 0; c < 3; c++) {
                await prisma.release.create({
                    data: {
                        name: `1.${c}`,
                        downloadUrl: 'https://codeload.github.com/paxo-phone/paxo-site/zip/refs/heads/main',
                        sourceUrl: 'https://github.com/paxo-phone/paxo-site/tree/main',
                        appId: app.id
                    }
                })
            }

        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })