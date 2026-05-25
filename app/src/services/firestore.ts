import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  type QueryConstraint,
  type DocumentData,
  type QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Obtener un documento por ID
 */
export async function getDocument<T extends DocumentData>(
  collectionName: string,
  docId: string
): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  } catch (error) {
    console.error(`Error getting document from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Obtener todos los documentos de una colección (con filtros opcionales)
 */
export async function getDocuments<T extends DocumentData>(
  collectionName: string,
  constraints?: QueryConstraint[]
): Promise<T[]> {
  try {
    const q = constraints
      ? query(collection(db, collectionName), ...constraints)
      : query(collection(db, collectionName));
    
    const querySnapshot: QuerySnapshot<T> = await getDocs(q as any);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error getting documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Obtener documentos por un campo específico
 */
export async function getDocumentsByField<T extends DocumentData>(
  collectionName: string,
  fieldName: string,
  fieldValue: any
): Promise<T[]> {
  try {
    const q = query(
      collection(db, collectionName),
      where(fieldName, '==', fieldValue)
    );
    const querySnapshot: QuerySnapshot<T> = await getDocs(q as any);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(
      `Error getting documents from ${collectionName} by ${fieldName}:`,
      error
    );
    throw error;
  }
}

/**
 * Crear un nuevo documento
 */
export async function createDocument<T extends DocumentData>(
  collectionName: string,
  data: T
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Actualizar un documento existente
 */
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  docId: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef as any, data as any);
  } catch (error) {
    console.error(
      `Error updating document ${docId} in ${collectionName}:`,
      error
    );
    throw error;
  }
}

/**
 * Eliminar un documento
 */
export async function deleteDocument(
  collectionName: string,
  docId: string
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(
      `Error deleting document ${docId} from ${collectionName}:`,
      error
    );
    throw error;
  }
}

/**
 * Batch create documents (útil para migraciones)
 */
export async function batchCreateDocuments<T extends DocumentData>(
  collectionName: string,
  dataArray: T[]
): Promise<string[]> {
  try {
    const ids: string[] = [];
    for (const data of dataArray) {
      const id = await createDocument(collectionName, data);
      ids.push(id);
    }
    return ids;
  } catch (error) {
    console.error(`Error batch creating documents in ${collectionName}:`, error);
    throw error;
  }
}
