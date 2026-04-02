
// import React, { useState } from "react";
// import styled from "styled-components";
// import { updatePassword } from "firebase/auth";
// import { auth, db } from "../firebaseConfig";
// import { doc, updateDoc } from "firebase/firestore";
// import Swal from "sweetalert2";

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   background-color: rgba(0, 0, 0, 0.9);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 9999;
// `;

// const ModalBox = styled.div`
//   background-color: #1f2937;
//   color: white;
//   padding: 2.5rem;
//   border-radius: 1rem;
//   width: 90%;
//   max-width: 400px;
//   text-align: center;
//   box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
// `;

// const Title = styled.h2`
//   color: #facc15;
//   margin-bottom: 1rem;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 0.75rem;
//   margin-bottom: 1rem;
//   border-radius: 0.5rem;
//   border: 1px solid #374151;
//   background: #111827;
//   color: white;
//   &:focus {
//     outline: none;
//     border-color: #22c55e;
//   }
// `;

// const Button = styled.button`
//   width: 100%;
//   background-color: #22c55e;
//   color: white;
//   padding: 0.75rem;
//   font-weight: bold;
//   border-radius: 0.5rem;
//   border: none;
//   cursor: pointer;
//   transition: 0.3s;
//   &:hover {
//     background-color: #16a34a;
//   }
// `;

// export default function FirstLoginPasswordModal({ userId, onClose }) {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleUpdatePassword = async () => {
//     if (newPassword.length < 6) {
//       Swal.fire({
//         icon: "warning",
//         title: "Weak password",
//         text: "Password must be at least 6 characters long.",
//         background: "#1f2937",
//         color: "#f9fafb",
//       });
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       Swal.fire({
//         icon: "warning",
//         title: "Passwords do not match",
//         background: "#1f2937",
//         color: "#f9fafb",
//       });
//       return;
//     }

//     try {
//       setLoading(true);
//       const user = auth.currentUser;
//       if (!user) throw new Error("No logged-in user");

//       await updatePassword(user, newPassword);
//       await updateDoc(doc(db, "users", userId), { firstLogin: false });

//       Swal.fire({
//         icon: "success",
//         title: "Password Updated!",
//         text: "Your password has been successfully updated.",
//         background: "#1f2937",
//         color: "#f9fafb",
//       });

//       setLoading(false);
//       onClose();
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Error updating password",
//         text: error.message,
//         background: "#1f2937",
//         color: "#f9fafb",
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <Overlay>
//       <ModalBox>
//         <Title>Set Your New Password</Title>
//         <p style={{ marginBottom: "1rem", color: "#d1d5db" }}>
//           Please update your password before continuing.
//         </p>

//         <Input
//           type="password"
//           placeholder="New password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <Input
//           type="password"
//           placeholder="Confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />

//         <Button onClick={handleUpdatePassword} disabled={loading}>
//           {loading ? "Updating..." : "Update Password"}
//         </Button>
//       </ModalBox>
//     </Overlay>
//   );
// }



import React, { useState } from "react";
import styled from "styled-components";
import { updatePassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import Swal from "sweetalert2";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background-color: #1f2937;
  color: white;
  padding: 2.5rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
`;

const Title = styled.h2`
  color: #facc15;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #111827;
  color: white;
  &:focus {
    outline: none;
    border-color: #22c55e;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: #22c55e;
  color: white;
  padding: 0.75rem;
  font-weight: bold;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #16a34a;
  }
`;

export default function FirstLoginPasswordModal({ userId, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword.length < 6) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters long.",
        background: "#1f2937",
        color: "#f9fafb",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "warning",
        title: "Passwords Do Not Match",
        background: "#1f2937",
        color: "#f9fafb",
      });
      return;
    }

    try {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) throw new Error("No logged-in user found");

      // ✅ Directly update password — no reauthentication
      await updatePassword(user, newPassword);

      // ✅ Update Firestore flag to mark that password has been set
      await updateDoc(doc(db, "users", userId), { firstLogin: false });

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully updated.",
        background: "#1f2937",
        color: "#f9fafb",
      });

      setLoading(false);

      // ✅ Close modal after small delay so alert can finish
      setTimeout(() => {
        onClose?.();
      }, 500);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error Updating Password",
        text:
          error.code === "auth/requires-recent-login"
            ? "Please log in again and retry."
            : error.message,
        background: "#1f2937",
        color: "#f9fafb",
      });
      setLoading(false);
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>Set Your New Password</Title>
        <p style={{ marginBottom: "1rem", color: "#d1d5db" }}>
          Please set a new password before continuing.
        </p>

        <Input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button onClick={handleUpdatePassword} disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </ModalBox>
    </Overlay>
  );
}
