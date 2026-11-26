import { client } from "@repo/db/client";

export default async function Home() {
  const user = await client.user.findFirst();

  return (
    <main>
      <h1>Hello, World!</h1>
      {user ? (
        <p style={{ color: "green" }}>First user: {user.username}</p>
      ) : (
        <p>No users found in the database.</p>
      )}
    </main>
  );

}