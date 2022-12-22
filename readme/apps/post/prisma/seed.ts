import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Программирование',
      videoUrl: 'https://youtube.com',
      preview: 'https://images.unsplash.com/photo-1671540675952-6f95523c84ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      tags: ['IT', 'HTMLAcademy'],
      description: 'Hello world',
      quote: 'Hello friend',
      authorId: '42',
      photo: 'https://images.unsplash.com/photo-1671595642649-03faaf081bb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      link: 'https://yandex.ru'
    }
  });

  await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'Книги',
      videoUrl: 'https://youtube.com',
      preview: 'https://images.unsplash.com/photo-1671540675952-6f95523c84ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
      tags: ['Чистый код', 'Грокаем алгоритмы'],
      description: 'Занимательные книги',
      quote: 'Привет друг',
      authorId: '42',
      photo: 'https://images.unsplash.com/photo-1671595642649-03faaf081bb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      link: 'https://yandex.ru'
    }
  });

  console.info('🤘️ Database was filled')
}


fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect()

    process.exit(1);
  })