import { useContext, createContext, useEffect, useState } from "react";

import { db, linkColRef } from "../firebase/config";
import {
  addDoc,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { useAuth } from "./Auth-Context";

const ShortLinkContext = createContext();

const ShortLinkProvider = ({ children }) => {
  const [searchState, setSearchState] = useState({
    title: "",
    URL: "",
  });
  const [searchData, setSearchData] = useState([]);
  const [isAddLink, setIsAddLink] = useState(false);
  const { user } = useAuth();

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchState.title && searchState.URL) {
      if (searchState.URL.includes("https://") && searchState.URL.includes("."))
        addDoc(linkColRef, {
          title: searchState.title,
          URL: searchState.URL,
          email: user.email,
        })
      else {
        window.alert("Enter a valid URL")
      }
    }
    setSearchState({ URL: "", title: "" });
    setIsAddLink(false);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "mylinks", id));
  };

  useEffect(() => {
    if (user) {
      try {
        onSnapshot(
          query(linkColRef, where("email", "==", user.email)),
          (querySnapshot) => {
            let searchArray = [];
            querySnapshot.docs.map((doc) => {
              searchArray.push({ ...doc.data(), id: doc.id });
            });
            setSearchData(searchArray);
          }
        );
      } catch (error) {
        console.error("error in gettin initial myLink data", error);
      }
    }
  }, [user]);

  return (
    <ShortLinkContext.Provider
      value={{
        searchState,
        searchData,
        handleSubmit,
        handleDelete,
        changeHandler,
        isAddLink,
        setIsAddLink,
      }}
    >
      {children}
    </ShortLinkContext.Provider>
  );
};

const useShortLink = () => useContext(ShortLinkContext);

export { useShortLink, ShortLinkProvider };
