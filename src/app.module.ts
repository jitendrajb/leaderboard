import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { Player } from './entities/player.entity';
import { User } from './users/users.entity';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Player, User],
        synchronize: true,
      }),
    }),
    LeaderboardModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*')
      .apply(RateLimiterMiddleware)
      .forRoutes('leaderboard/scores'); //if you want for all end points just give * 
  }
}
