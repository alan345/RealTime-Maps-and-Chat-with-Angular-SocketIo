export class StripeCustomer {
  id: string = '';
  account_balance: number=0;
  created: string = '';
  default_source: string = '';
  description: string = '';
  email: string = '';
  sources: Sources = new Sources()
  subscriptions: Subscription = new Subscription()
}

export class Sources {
  data:DataSource[]=[]
}

export class DataSource {
  id: string = '';
  object: string = 'card';
  address_city: string = '';
  address_country: string = '';
  address_line1: string = '';
  address_state: string = '';
  address_zip: string = '';
  address_line2: string = '';
  brand: string = '';
  country: string = '';
  exp_month: string = '';
  exp_year: string = '';
  last4: string = '';
  funding: string = '';
}

export class Subscription {
  data:DataSubscription[]=[]
}

export class DataSubscription {
  id: string = '';
  created: string = '';
  current_period_end: string = '';
  current_period_start: string = '';
  items:Items=new Items()
}


export class Items {
  data:DataItem[]=[]
}

export class DataItem {
  id: string = '';
  created: string = '';
  plan: Plan = new Plan()
}

export class Plan {
  id: string = '';
  amount: number = 0;
  created: string = '';
  currency: string = '';
  interval: string = '';
  interval_count: number = 0;
}
