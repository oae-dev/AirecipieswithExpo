import { db } from "@/firebaseConfig";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";

export const AddData = async (data: any) => {
  const docRef = await addDoc(collection(db, 'Recipies'), {
    recipeName: data.recipeName,
    description: data.description,
    ingredients: data.ingredients,
    steps: data.steps,
    calories: data.calories,
    cookTime: data.cookTime,
    serveTo: data.serveTo,
    imagePrompt: data.imagePrompt,

  });
  console.log('Document written with ID: ', docRef.id);
};


export const FetchData = async ()=>{

  let list:any = [];
  const docSnap = await getDocs(collection(db, 'Recipies'));
  docSnap.forEach(doco=>{
    console.log(doco.id, ' => ', doco.data());
    list.push(doco.data());
  });

  console.log('FullData' , list);
  return list;
};

export const DeleteFav = async (recipeName?: string)=>{
  console.log('reName',recipeName);
   const q = query(collection(db, 'Recipies'), where('recipeName', '==', recipeName));
   const snapshot = await getDocs(q);
   console.log('snapshot',snapshot);
    snapshot.forEach(async (docItem) => {
    await deleteDoc(doc(db, 'Recipies', docItem.id));
  });
};
