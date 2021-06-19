import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import StoreUserValidator from 'App/Validators/Users/StoreUserValidator';
import UpdateUserValidator from 'App/Validators/Users/UpdateUserValidator';

export default class UsersController {
  public async index({ params, response }: HttpContextContract) {
    const { page, per_page } = params;

    const users = await User.query().paginate(page, per_page);

    return response.json(users);
  }

  public async store({ request, response }: HttpContextContract) {
    const userData = await request.validate(StoreUserValidator);

    const user = await User.create(userData);

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
