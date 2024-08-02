import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDocs, getDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// Récupère tous les topics
export const getAllTopics = async () => {
    const topicsCol = collection(db, 'topics');
    const topicsSnapshot = await getDocs(topicsCol);
    return topicsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Récupère un topic spécifique par ID
export const getTopicById = async (topicId) => {
    const topicRef = doc(db, 'topics', topicId);
    const topicSnap = await getDoc(topicRef);
    if (!topicSnap.exists()) {
        throw new Error('Topic not found');
    }
    return { id: topicSnap.id, ...topicSnap.data() };
};

// Fonction pour anonymiser l'email
const anonymizeEmail = (email) => {

    console.log(email);

    if (typeof email !== 'string' || !email.includes('@')) {
        return 'Unknown User'; // Valeur par défaut si l'email est invalide
    }
    
    const [localPart, domain] = email.split('@');
    return `${localPart.charAt(0)}***@${domain}`;
};

// Fonction pour récupérer les messages d'un topic par ID
export const getMessagesByTopicId = async (topicId) => {
    try {
        const messagesRef = collection(db, 'topics', topicId, 'messages');
        const q = query(messagesRef);
        const querySnapshot = await getDocs(q);

        const messages = [];
        for (const docSnapshot of querySnapshot.docs) {
            const messageData = docSnapshot.data();
            const userDocRef = doc(db, 'users', messageData.user);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.exists() ? userDocSnap.data() : {};

            messages.push({
                id: docSnapshot.id,
                ...messageData,
                userName: userData.displayName || anonymizeEmail(userData.email),
                userAvatar: userData.photoURL || null, // Ajoutez une image par défaut si nécessaire
                createdAt: messageData.createdAt,
            });
        }

        return messages;
    } catch (error) {
        console.error("Erreur lors de la récupération des messages:", error);
        throw new Error(error.message);
    }
};

// Crée un nouveau topic
export const createTopic = async (title, description) => {
    if (!auth.currentUser) {
        throw new Error('User not authenticated');
    }
    const topicsCol = collection(db, 'topics');
    await addDoc(topicsCol, { title, description, user: auth.currentUser.uid, createdAt: new Date() });
};

// Crée un nouveau message dans un topic spécifique
export const createMessage = async (topicId, content) => {
    if (!auth.currentUser) {
        throw new Error('User not authenticated');
    }
    const messagesCol = collection(db, 'topics', topicId, 'messages');
    await addDoc(messagesCol, { content, user: auth.currentUser.uid, createdAt: new Date() });
};

// Supprime un topic
export const deleteTopic = async (topicId) => {
    const topicDoc = doc(db, 'topics', topicId);
    await deleteDoc(topicDoc);
};

// Supprime un message dans un topic spécifique
export const deleteMessage = async (topicId, messageId) => {
    const messageDoc = doc(db, 'topics', topicId, 'messages', messageId);
    await deleteDoc(messageDoc);
};