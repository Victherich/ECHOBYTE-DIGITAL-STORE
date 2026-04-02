import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Swal from "sweetalert2";

// ---------- Styled Components ----------
const PageWrapper = styled.div`
  background-color: #111827;
  color: #f9fafb;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #facc15;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 400px;
  background-color: #1f2937;
  border: 1px solid #374151;
  color: #f9fafb;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  margin-bottom: 2rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #facc15;
    box-shadow: 0 0 0 2px rgba(250, 204, 21, 0.3);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
  width: 100%;
`;

const Card = styled.div`
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    border-color: #facc15;
  }
`;

const Name = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #facc15;
  margin-bottom: 0.5rem;
`;

const Email = styled.p`
  font-size: 0.95rem;
  color: #d1d5db;
  margin-bottom: 0.25rem;
  word-break: break-word;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: #9ca3af;
  margin: 0.2rem 0;
`;

const Badge = styled.span`
  display: inline-block;
  margin-top: 0.75rem;
  background-color: ${(props) =>
    props.role === "admin" ? "#facc15" : "#22c55e"};
  color: #111827;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
`;

const SortButton = styled.button`
  background: transparent;
  border: 1px solid #374151;
  color: #facc15;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #facc15;
    color: #111827;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #f87171;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
    color: #ef4444;
  }
`;

const Loader = styled.div`
  color: #facc15;
  margin-top: 3rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

// ---------- Component ----------
export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "users"));
        const usersList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error loading users",
          text: error.message,
          background: "#1f2937",
          color: "#f9fafb",
        });
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDeleteUser = async (userId, userName) => {
    const confirm = await Swal.fire({
      title: `Delete ${userName || "this user"}?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      background: "#1f2937",
      color: "#f9fafb",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteDoc(doc(db, "users", userId));

      // Update UI without refetching
      setUsers((prev) => prev.filter((u) => u.id !== userId));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `${userName || "User"} has been removed.`,
        background: "#1f2937",
        color: "#f9fafb",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to delete user",
        text: error.message,
        background: "#1f2937",
        color: "#f9fafb",
      });
    }
  };

  const filteredUsers = users
    .filter((u) =>
      `${u.name || ""} ${u.email || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? (a.name || "").localeCompare(b.name || "")
        : (b.name || "").localeCompare(a.name || "")
    );

  return (
    <PageWrapper>
      <Title>All Registered Users</Title>

      <SearchBar
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <SortButton onClick={() => setSortAsc(!sortAsc)}>
        Sort by Name {sortAsc ? "▲" : "▼"}
      </SortButton>

      {loading ? (
        <Loader>Loading users...</Loader>
      ) : filteredUsers.length > 0 ? (
        <Grid>
          {filteredUsers.map((user) => (
            <Card key={user.id}>
              <DeleteButton onClick={() => handleDeleteUser(user.id, user.name)}>
                ✖
              </DeleteButton>
              <Name>{user.name || "Unnamed User"}</Name>
              <Email>📧 {user.email}</Email>
              {user.phone && <InfoText>📞 {user.phone}</InfoText>}
              {user.createdAt && (
                <InfoText>
                  🕓 Joined:{" "}
                  {new Date(
                    user.createdAt.seconds
                      ? user.createdAt.seconds * 1000
                      : user.createdAt
                  ).toLocaleDateString()}
                </InfoText>
              )}
              <Badge role={user.role || "user"}>
                {user.role || "user"}
              </Badge>
            </Card>
          ))}
        </Grid>
      ) : (
        <Loader>No users found</Loader>
      )}
    </PageWrapper>
  );
}
