import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class UsersController {
  public async index({}: HttpContextContract) {
    return 'Users.index';
  }

  public async store({}: HttpContextContract) {
    return 'Users.store';
  }

  public async show({}: HttpContextContract) {
    return 'Users.show';
  }

  public async update({}: HttpContextContract) {
    return 'Users.update';
  }

  public async destroy({}: HttpContextContract) {
    return 'Users.destory';
  }
}
