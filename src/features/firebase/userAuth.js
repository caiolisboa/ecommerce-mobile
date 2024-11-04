import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";

const registerWithEmailAndPassword = async (name, email, password) => {
    console.log(email, password, name);
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        const userDocRef = doc(db, "users", user.uid);

        // Checa se o documento do usuário já existe
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists()) {
            // Se não existir, cria o documento com os dados iniciais
            await setDoc(userDocRef, {
                uid: user.uid,
                name,
                email,
                cart: [],
                orders: []
            });
        } else {
            // Se já existir, pode atualizar (opcional)
            await updateDoc(userDocRef, {
                name,
                email
            });
        }

        return { success: true };
    } catch (error) {
        console.error("Error registering user:", error);
        return { success: false, error };
    }
};

const loginWithEmailAndPassword = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const userId = res.user.uid;
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
            return {
                success: true,
                user: userDoc.data()
            };
        } else {
            return { success: false, error: "User not found" };
        }
    } catch (err) {
        console.error("Error logging in:", err);
        return { success: false, error: err.message };
    }
};

const logout = async () => {
    await signOut(auth);
    return { success: true };
};

export { loginWithEmailAndPassword, logout, registerWithEmailAndPassword };
