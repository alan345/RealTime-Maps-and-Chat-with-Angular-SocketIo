
export class Right {
  _id: string = '';

  detailRight: DetailRight = new DetailRight()
}

export class DetailRight {
  nameRight: string = '';
  permissions: Permission[] = []
}

export class Permission {
  namePermission: string = '';
  access: Access[] = []
}

export class Access {
  typeAccess: string= '';
}
