"use server";
import { clerkClient } from "@clerk/nextjs/server";

export async function resolveUsersSA(userIds: string[]) {
  if (!userIds || userIds.length === 0) return [];
  const client = await clerkClient();
  const { data } = await client.users.getUserList({ userId: userIds });
  if (!data) throw new Error("foundUsers does not exist");
  const usersById = new Map(
    data.map((d) => {
      return [
        d.id,
        {
          name: d.firstName ?? "ali",
          avatar: d.imageUrl ?? "https://i.pravatar.cc/300",
        },
      ];
    })
  );
  const result: Array<{ name: string; avatar: string; color: string }> = [];
  for (const id of userIds) {
    const u = usersById.get(id);
    if (!u?.avatar && !u?.name)
      throw new Error("name or avatar is not present");
    result.push({
      name: u?.name,
      avatar: u?.avatar,
      color: "#6ee7b7",
    }); // return result;
  }
  return result;
}
export async function searchUsersSA(text: string) {
  const query = (text || "").trim();
  if (query === "") return [];
  const client = await clerkClient();
  const { data } = await client.users.getUserList({ query });
  const ids = data.map((u) => {
    return u.id;
  });
  return ids;
}
