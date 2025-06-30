import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class ConfirmPasswordConstraint implements ValidatorConstraintInterface {
  validate(ConfirmNewPass: string, args: ValidationArguments) {
    return ConfirmNewPass === args.object[args.constraints[0] as string];
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must match ${args.constraints[0]}`;
  }
}
export function ConfirmEmail(validationOptions?: ValidationOptions) {
  return function (confirmPass: object, propertyName: string) {
    registerDecorator({
      target: confirmPass.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: ['NewPass'],
      validator: ConfirmPasswordConstraint,
    });
  };
}
