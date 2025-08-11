"use client"

import React, { useState } from 'react';
import { useRouter, usePathname } from "next/navigation";

// import Sidebar from '../sidebar/sidebar';
import { deleteSession } from '@/actions/auth/session';
import { useAuth } from '../security/context-provider';

import { Button } from "@/components/ui/button"
import { Menu, CircleUser, LogOut } from "lucide-react"
import { ToggleTheme } from "@/components/ToggleTheme"

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { SidebarRoutes } from "../SidebarRoutes"


export function Navbar() {
    const router = useRouter();
    const { session } = useAuth();
    // const { showAlert } = useAlert();
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar el Sheet
    const handleToggle = () => setIsOpen(!isOpen); // Función para alternar el estado

    async function CerrarSession() {
        try {
            await deleteSession();
            router.push("/login");
        } catch (error) {
            const message = (error as { message?: string }).message || 'Error desconocido.';
        }
    }

    return (
        <div className="flex items-center px-2 gap-x-4 md:px-6 
                    justify-between w-full bg-gackground border-b h-20">
            <div className="block xl:hidden">
                <Sheet>
                    <SheetTrigger className="flex items-center">
                        <Menu />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SidebarRoutes />
                    </SheetContent>
                </Sheet>
            </div>
            <div className="relative w-[300px]">
                <div className="text-left space-y-2">
                    <p className="font-medium">
                        CRUD USUARIOS
                    </p>
                </div>
            </div>
            <div className="flex gap-x-2 items-center">
                <ToggleTheme />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
                            <CircleUser />
                            <span className="sr-only">Perfil de Usuario</span>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-56 p-4 text-foreground bg-background border shadow-xl rounded-xl">
                        {session ? (
                            <div className="font-medium">
                                <div className="text-center space-y-2">
                                    <p className="">
                                        BIENVENIDO
                                    </p>
                                </div>
                                <div className="text-center space-y-2">
                                    <p className="font-medium">
                                        TEST NUR SRL
                                    </p>
                                </div>

                                {/* Separador */}
                                <div className="my-4 border-t border-gray-300">
                                </div>

                                <div className="flex flex-col items-center gap-4 text-sm">
                                    <img
                                        src="/usuario.jpeg"
                                        alt="Imagen de fondo"
                                        className="w-16 h-16 rounded-full border object-cover"
                                    />
                                </div>
                                <br></br>
                                <div className="text-left space-y-2">
                                    <p className="text-xs font-medium">
                                        <b>Nombre: </b>{session.nombre}
                                    </p>
                                </div>
                                <div className="text-left space-y-2">
                                    <p className="text-xs font-medium">
                                        <b>Correo: </b>{session.correo}
                                    </p>
                                </div>
                                <div className="text-left space-y-2">
                                    <p className="text-xs font-medium">
                                        <b>Tipo: </b>{session.tipo}
                                    </p>
                                </div>

                                {/* Separador */}
                                <div className="my-4 border-t border-gray-300">
                                </div>

                                <div className="text-center space-y-1">
                                    <Button variant="destructive" onClick={CerrarSession}>
                                        <LogOut className="w-4 h-4" />
                                        Cerrar Sesión
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-500">Cargando Perfil...</div>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
