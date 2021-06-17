import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	public schema = schema.create({
		password: schema.string({}, [
			rules.confirmed(),
			rules.minLength(6),
			rules.maxLength(80)
		]),

		name: schema.string({}, [
			rules.minLength(2),
			rules.maxLength(80)
		])
	});
	
  public messages = {}
}
