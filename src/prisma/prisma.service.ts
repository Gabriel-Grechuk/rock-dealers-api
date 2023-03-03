import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  extended = this.$extends({
    result: {
      user: {
        hello: {
          needs: {
            name: true,
          },
          compute(user) {
            return `Hello ${user.name}!!!`;
          },
        },
      },
    },
  });

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
