// import { Client, Account } from "appwrite";

// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);
  

// export const account = new Account(client);

// export const login = async ({
//   email,
//   password,
// }: {
//   email: string;
//   password: string;
// }) => {
//   try {
//     await account.deleteSession("current");
//   } catch (err: unknown) {
//     console.warn("Session cleanup:", err);
//   }

//   return await account.createEmailPasswordSession(email, password);
// };

// export const createAccount = async ({
//   email,
//   password,
//   name,
// }: {
//   email: string;
//   password: string;
//   name: string;
// }) => {
//   await account.create("unique()", email, password, name);

//   try {
//     await account.deleteSession("current");
//   } catch (err: unknown) {
//     console.warn("Session cleanup:", err);
//   }

//   return await account.createEmailPasswordSession(email, password);
// };

// export const getCurrentUser = async () => {
//   try {
//     return await account.get();
//   } catch {
//     return null;
//   }
// };

// export const logoutUser = async () => {
//   await account.deleteSession("current");
// };



import { Client, Account, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT!)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID!;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID!; // Make sure this matches your collection name

// LOGIN
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

// CREATE ACCOUNT + SAVE TO DB
export const createAccount = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  // Step 1: Create auth account
  await account.create(ID.unique(), email, password, name);

  // Step 2: Login user to get their ID
  await account.createEmailPasswordSession(email, password);
  const user = await account.get();

  // Step 3: Save user to 'users' collection
  try {
    await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        name: user.name,
        email: user.email,
      }
    );
  } catch (error) {
    console.error("❌ Error saving user to database:", error);
  }

  return user;
};

// CURRENT USER
export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};

// LOGOUT
export const logoutUser = async () => {
  await account.deleteSession("current");
};
