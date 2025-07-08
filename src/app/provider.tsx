"use client"

import { axiosInstance } from "@/lib/axios";
import { useUserStore } from "@/lib/store"
import { useEffect } from "react";

export  function UserProvider({children}: {children: React.ReactNode}) {
    const setUser = useUserStore((state) => state.setUser);

    useEffect(()=> {
        const fetchUser = async() => {
            try {
                const token = localStorage.getItem("token");
                if(!token) return;

                const res = await axiosInstance.get("/users/me", {
                    headers: {Authorization: `Bearer ${token}`}
                });

                if(res.data.success){
                    setUser(res.data.data);
                }
            } catch (error) {
                console.log("Fetch user error", error);
            }
        };

        fetchUser();
    }, []);

    return <>{children}</>;
}