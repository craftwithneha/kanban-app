import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

export const account = new Account(client);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await account.deleteSession("current");
  } catch (err: unknown) {
    console.warn("Session cleanup:", err);
  }

  return await account.createEmailPasswordSession(email, password);
};

export const createAccount = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  await account.create("unique()", email, password, name);

  try {
    await account.deleteSession("current");
  } catch (err: unknown) {
    console.warn("Session cleanup:", err);
  }

  return await account.createEmailPasswordSession(email, password);
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

export const logoutUser = async () => {
  await account.deleteSession("current");
};
