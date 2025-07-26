"use client";
import FilteredUserList from "./components/FilteredUserList";
import { useUsers } from "./context/UserContext";
export default function HomePage() {
  const {users} =useUsers();


  return (
    <>
      <main className="min-h-screen px-6 py-5">
        <FilteredUserList users={users} />
      </main>
    </>
  );
}
