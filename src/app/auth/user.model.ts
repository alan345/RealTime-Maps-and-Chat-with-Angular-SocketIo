export class UserAuth {
  constructor(public email: string, public password: string, public currentPassword?: string, public newPassword?: string) {
  }
}
