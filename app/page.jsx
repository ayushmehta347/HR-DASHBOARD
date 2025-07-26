"use client";
import { useUsers } from "./context/UserContext";
import { useAuth } from "./context/AuthContext"; 
import FilteredUserList from "./components/FilteredUserList";


export default function HomePage() {
  const { users } = useUsers();
  const { user: currentUser } = useAuth(); 

  // const filteredUsers = users?.filter(
  //   (user) => user.email !== currentUser?.email
  // );

  return (
    <>
      <main className="min-h-screen px-6 py-5">
        <FilteredUserList users={users} />
      </main>
    </>
  );
}
