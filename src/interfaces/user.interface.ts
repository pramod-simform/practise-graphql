export interface IUserRequest {
  id?: string;
  fullName: string;
  username: string;
  ageGroup: number;
  address?: string;
  contactInfo?: {
    tel: string;
    isoCode: string;
  };
}
