import { redirect } from "next/navigation";
import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized"
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/login");
}

interface ActionResult {
  error: string | null;
}

export default async function Home() {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex flex-col gap-4 items-center -translate-y-16">
      {user &&
        <form action={logout}>
          <button className="border rounded-lg px-4 py-1">Sign out</button>
        </form>
      }
      <a href="/protected">Link</a>
      <div className="flex gap-3 items-center bg-slate-800 text-white px-3 py-2 rounded-xl">
        <img src={user.avatarURL} className="w-6 h-6 rounded-full" />
        {user.username}
      </div>
    </div>
  );
}
