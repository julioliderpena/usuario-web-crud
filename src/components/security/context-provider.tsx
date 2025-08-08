"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SessionDto } from "@/types/auth/session-dto";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

// Definimos el contexto
interface AuthContextType {
  session: SessionDto | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const ContextProvider = ({
  children,
  sessionDto,
}: {
  children: React.ReactNode;
  sessionDto: SessionDto | null;
}) => {
  const [session, setSession] = useState<SessionDto | null>(sessionDto);
  const [showCard, setShowCard] = useState(false);
  const [counter, setCounter] = useState(11);
  const router = useRouter();

  useEffect(() => {
    if (!sessionDto) return;

    setSession(sessionDto); // Actualizamos estado al inicio
    let intervalId: NodeJS.Timeout;

    const expiresAt = new Date(sessionDto.exp * 1000).getTime();

    intervalId = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.max(Math.floor((expiresAt - now) / 1000), 0);

      if (secondsLeft <= 11) {
        setCounter(secondsLeft);
        setShowCard(true);

        if (secondsLeft === 0) {
          clearInterval(intervalId);
          setTimeout(() => {
            logout();
            router.push("/login");
          }, 1000);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [sessionDto,router]);

  const logout = () => {
    localStorage.removeItem("NextSidebarItems");
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, logout }}>
      {showCard && (
        <Card
          className="fixed bottom-4 right-4 w-64 border-2 border-blue-900 shadow-xl rounded-lg z-50 bg-gradient-to-tr from-blue-100 via-white to-blue-50"
          style={{
            boxShadow: "0 0 12px rgba(0, 0, 64, 0.3)",
          }}
        >
          <CardHeader className="p-3">
            <CardTitle>
              <div className="text-sm font-semibold text-blue-900">
                Sesión expira en {counter} segundos.
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent />
        </Card>
      )}

      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un ContextProvider");
  }
  
  return context;
};
