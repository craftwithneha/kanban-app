// src/auth.ts
import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6881e0410026d2cfaca1");

export const account = new Account(client);

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    await account.deleteSession("current"); // ✅ safe attempt
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn("No existing session to delete:", err.message);
    } else {
      console.warn("Unknown error occurred");
    }
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
    await account.deleteSession("current"); // ✅ safe attempt
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn("No existing session to delete:", err.message);
    } else {
      console.warn("Unknown error occurred");
    }
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
