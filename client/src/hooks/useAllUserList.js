import { useEffect, useRef, useState } from "react";

export default function useAllUserList() {
  const [userList, setUserList] = useState([]);
  const [realtime, setRealtime] = useState(false);
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    const fetchAllUserData = async () => {
      if (!isMounted.current) return;
      try {
        const result = await fetch("/userList", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await result.json();

        setUserList(data?.data);
      } catch (error) {
        new Error(error);
      }
    };
    fetchAllUserData();
    return () => {
      isMounted.current = false;
    };
  }, [realtime]);
  return {
    userList,
    setRealtime,
  };
}
