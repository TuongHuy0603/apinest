import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
// import { CompaniesModule } from './companies/companies.module';
// import { JobsModule } from './jobs/jobs.module';
// import { FilesModule } from './files/files.module';
// import { ResumesModule } from './resumes/resumes.module';
// import { PermissionsModule } from './permissions/permissions.module';
// import { RolesModule } from './roles/roles.module';
// import { DatabasesModule } from './databases/databases.module';
// import { SubscribersModule } from './subscribers/subscribers.module';
// import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 10,
    // }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,
    AuthModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
