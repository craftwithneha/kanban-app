import { Client, Databases, ID } from "appwrite";
import { Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // your endpoint
  .setProject("6881e0410026d2cfaca1"); //  project ID

export const databases = new Databases(client);
const account = new Account(client);
export { ID,account};
