import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Validate } from 'App/Decorators/Validate';
import User from 'App/Models/User';
import StoreUserValidator from 'App/Validators/Users/StoreUserValidator';
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator';

export default class UsersController {
  public async index({ params, response }: HttpContextContract) {
    const { page, per_page: perPage } = params;

    const users = await User.query().paginate(page, perPage);

    return response.json(users);
  }

  @Validate(StoreUserValidator)
  public async store({ response, validated }: HttpContextContract) {
    // bypass manual validation and pass it to @Validate decorator
    // const userData = await request.validate(StoreUserValidator);

    const user = await User.create(validated);

    return response.json(user);
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;

    const user = await User.findOrFail(id);

    return response.json(user);
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const userData = await request.validate(UpdateUserValidator);

    const user = await User.findOrFail(id);

    await user.merge(userData).save();

    return response.json(user);
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const user = await User.findOrFail(id);

    await user.delete();

    return response.json(user);
  }
}
