//#region mock data

interface Tweet {
  id: string;
  text: string;
  userId: string;
}

const tweets: Tweet[] = [
  {
    id: "1",
    text: "Hello World",
    userId: "1",
  },
  {
    id: "2",
    text: "Bye World",
    userId: "2",
  },
];

interface User {
  id: string;
  firstName: string;
  lastName: string;
  // fullName?: string; // FIXME: need or not??
}
const users: User[] = [
  {
    id: "1",
    firstName: "Bob",
    lastName: "Doe",
  },
  {
    id: "2",
    firstName: "Alice",
    lastName: "Doe",
  },
];
//#endregion

export { tweets, users, Tweet, User };
