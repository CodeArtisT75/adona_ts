import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { TypedSchema, RequestValidatorNode, ParsedTypedSchema } from '@ioc:Adonis/Core/Validator';

export function Validate<T extends ParsedTypedSchema<TypedSchema>>(validator: RequestValidatorNode<T>) {
  return function (_: any, __: string, descriptor: PropertyDescriptor) {
    const baseFunction = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const ctx: HttpContextContract = args[0];
      const { request } = ctx;

      const validated = await request.validate(validator);

      ctx.validated = validated;

      return baseFunction.apply(this, args);
    };

    return descriptor;
  };
}
