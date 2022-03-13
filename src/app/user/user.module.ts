import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '@auth/auth.module';
import { Role } from '@app/role/role.model';
import { RolesModule } from '@app/role/role.module';
import { UserRoles } from '@app/role/user-roles.model';
import { UsersController } from './user.controller';
import { User } from './user.model';
import { UsersService } from './user.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
