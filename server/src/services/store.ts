import { Contact } from '../models/contact';

export interface IStore {
  contacts: Contact[];
}

let store: IStore = { contacts: [] };

export default store;
