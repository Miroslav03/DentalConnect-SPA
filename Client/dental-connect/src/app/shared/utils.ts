import { ValidatorFn } from "@angular/forms";

export function matchPasswordsValidator(pass: string, rePass: string): ValidatorFn {
    return (control) => {
        const passwordFromControl = control.get(pass);
        const rePasswordFromControl = control.get(rePass);
        return passwordFromControl?.value === rePasswordFromControl?.value ? null : { matchPasswordsValidator: true }
    }
}