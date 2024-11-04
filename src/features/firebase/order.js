import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { uuidv4 } from "@firebase/util";

export const addToOrders = async () => {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    
    if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const cartItems = userData.cart;

        // Cria uma lista de novos itens de pedidos
        const orderItems = cartItems.map(item => ({
            orderId: uuidv4().replace(/-/g, '').substring(0, 12),
            id: item.id,
            image: item.image,
            title: item.title,
            brand: item.brand,
            price: item.price,
            qty: item.qty,
            date: new Date().toLocaleString()
        }));

        // Atualiza o documento com os novos itens adicionados ao array de pedidos existente
        await updateDoc(userDocRef, {
            orders: arrayUnion(...orderItems),  // Adiciona novos pedidos ao array existente
            cart: []  // Limpa o carrinho
        });

        console.log("items added to order");
        return { success: true, data: orderItems };
    } else {
        console.log("User document does not exist");
        return { success: false, message: "User document does not exist" };
    }
}

export const getAllOrderItems = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userRef);

    if (userDocSnapshot.exists()) {
        const data = userDocSnapshot.data().orders;
        return { success: true, data };
    } else {
        console.log("User document does not exist");
        return { success: false, message: "User document does not exist" };
    }
}
