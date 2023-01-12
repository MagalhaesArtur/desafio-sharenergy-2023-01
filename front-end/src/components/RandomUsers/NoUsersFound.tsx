import { FileSearch } from "phosphor-react";

export function NoUsersFound(props?: any) {
  return (
    <div className="flex flex-col gap-6 w-full h-[60%]  items-center justify-center">
      <FileSearch size={60} color="white" />
      <h1 className="text-white text-2xl font-semibold">Users Not Found</h1>
    </div>
  );
}
