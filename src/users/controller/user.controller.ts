import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
import { CreateUserDTO, UpdateUserDTO } from '../dto/users.dto';
import { IsExistUserGuard } from '../guards/is-exist-user.guard';
import { ValidateIdMongoPipe } from 'src/common/pipes/validate-id-mongo.pipe';
import { ValidateRolPipe } from 'src/common/pipes/validate-rol/validate-rol.pipe';
import { ValidateJwtGuard } from 'src/common/guards/validate-jwt.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUser(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    try {
      console.log(limit, skip);
      return this.usersService.getUsersWithLimit(limit, skip);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @UseGuards(IsExistUserGuard)
  createUser(@Body() createUserDTO: CreateUserDTO) {
    try {
      return this.usersService.newUser(createUserDTO);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  userPut(
    @Body() updateUserDTO: UpdateUserDTO,
    @Param('id', ValidateIdMongoPipe) id: string,
  ) {
    try {
      return this.usersService.updateUser(updateUserDTO, id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  @UseGuards(ValidateJwtGuard)
  userDelete(
    @Body('rol', ValidateRolPipe) rol: string,
    @Param('id', ValidateIdMongoPipe) id: string,
  ) {
    try {
      return this.usersService.deleteUser(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
