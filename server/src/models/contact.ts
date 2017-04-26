import store from '../services/store';

export interface IContact {
  name: string;
  email: string;
}

export class Contact {

  constructor(private params: IContact) {
  }

  public save() {

    // Save this object in database
    store.contacts.push(this);
  }
}
