import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from './admin-guard';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService, AuthGuard, AdminGuard],
})
export class AdminModule {}
