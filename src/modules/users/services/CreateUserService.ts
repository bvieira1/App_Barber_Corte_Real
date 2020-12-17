import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

// CUSTOM IMPORTS
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: IRequest): Promise<User> {
    const isUSerExists = await this.usersRepository.findByEmail(email);

    if (isUSerExists) {
      throw new AppError('Email address already used.', 400);
    }

    // Hashing password
    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
