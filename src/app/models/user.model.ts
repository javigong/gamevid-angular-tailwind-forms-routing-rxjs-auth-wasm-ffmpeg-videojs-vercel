export default interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
  phoneNumber: string;
}

//* optional: create an interface with a class
//* useful for methods, but bundle size increases
// export default class IUser {
//   name?: string;
//   email?: string;
//   password?: string;
//   age?: number;
//   phoneNumber?: string;
// }
