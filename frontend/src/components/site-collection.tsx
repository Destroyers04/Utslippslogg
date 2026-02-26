import type { UserData } from "@/api/types";

interface Props {
  userData: UserData;
}

function SiteCollection({ userData }: Props) {
  return (
    <div className="max-w-screen-xl mx-auto mt-8 px-8">
      <h1>Welcome {userData.name}</h1>
    </div>
  );
}

export { SiteCollection };
