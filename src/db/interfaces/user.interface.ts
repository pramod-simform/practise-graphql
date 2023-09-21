export interface IUser {
  _id: string;
  name: string;
  email: string;
  age: number;
  location?: string;
  contactDetails: {
    phone_number: string;
    country_code: string;
  };
}
