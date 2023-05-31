import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import app from "../firebase/firebase"

import { collection, addDoc, getDocs, query, where, deleteDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);




export const companyServices={

addCompany:async(companyName,companyId)=>
{

    try {
        const docRef = await addDoc(collection(db, "companies"), {

            
         cName: companyName,
         cId:companyId,    
        });
        
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }


}
,
viewCompanies: async () => {
       
    const querySnapshot = await getDocs(collection(db, "companies"));
    const dataArray = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const data = { id: doc.id, ...doc.data() };
      dataArray.push(data);
    });
    return dataArray;
  },

  checkIfCompanyIdExists: async (companyId) => {
   

    const q = query(collection(db, "companies"), where("cId", "==", companyId));

    const querySnapshot = await getDocs(q);
    const doesCompanyIdExist = querySnapshot.size>0
    return doesCompanyIdExist;
}
,
deleteCompany: async (companyId) => {
    const q = query(collection(db, "companies"), where("cId", "==", companyId));
    
    const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
   
  },

  getCompanyName: async (companyId) => {
    try {
      const q = query(collection(db, "companies"), where("cId", "==", companyId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const { cName } = doc.data();
        return cName;
      }

      return null;
    } catch (error) {
      console.error("Error fetching company name: ", error);
      return null;
    }
  },
  

}