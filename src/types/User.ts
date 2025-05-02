export interface User {
  ID?: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Phone: string;
  Address: string;
  Role: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

export interface UserCreate {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}
