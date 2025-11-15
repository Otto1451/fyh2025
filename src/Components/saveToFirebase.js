import { db } from "../firebaseConfig";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../firebaseConfig";

export const saveWarrantyToFirebase = async (data) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("❌ No user logged in — cannot save warranty");
    return;
  }

  try {
    await addDoc(collection(db, "warranties"), {
      ...data,
      userId: user.uid,             // ⭐ link warranty to user
    });

    console.log("🔥 Saved to Firebase!");
  } catch (err) {
    console.error("Error saving:", err);
  }
};

export const deleteWarranty = async (id) => {
  try {
    await deleteDoc(doc(db, "warranties", id));
    console.log("Deleted warranty:", id);
  } catch (err) {
    console.error("Delete error:", err);
  }
};