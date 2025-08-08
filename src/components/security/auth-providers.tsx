"use client"
// import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "./context-provider";
import { useState, useEffect } from "react";
// import { verifySession } from "@/actions/auth/session";
import { SessionDto } from "@/types/auth/session-dto";
import { verifySession } from "@/actions/auth/session";

interface Props {
    children: React.ReactNode;
}

export default function AuthProviders({ children }: Props) {
    const [sessionDto, setSessionDto] = useState<SessionDto | null>(null);

      useEffect(() => {
        const fetchItems = async () => {
          try {
            const session = await verifySession();
            if (session) {
              setSessionDto(session)
            }
            console.log("sessionDto 1")
    
          } catch (error) {
            console.error("Error fetching session:", error);
          }
        };
    
        fetchItems();
      }, []);

    return (
        <ContextProvider sessionDto={sessionDto} >
            {children}
        </ContextProvider>
    );
}
