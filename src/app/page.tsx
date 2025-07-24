// "use client";

// import { signOut } from "../auth";
// import { Button } from "../components/ui/button";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <form>
//         <Button onClick={() => signOut()}>Sign out</Button>
//       </form>
//     </div>
//   );
// }

import { auth, signIn } from "../auth";
import SignoutBtn from "../components/auth/signout-btn";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      {/* <img src={session.user.image} alt="User Avatar" /> */}
      <p>{(session.user as any).name}</p>
      {JSON.stringify(session)}
      <SignoutBtn></SignoutBtn>
    </div>
  );
}
