import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
// import { Cross2Icon } from "@radix-ui/react-icons"; // Importa el icono de "X"
import { X } from "lucide-react"

export function Modal({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  widthClass = "max-w-[95vw] xl:max-w-[485px]", // valor por defecto
}: {
  children: React.ReactNode;
  isOpen: boolean;
  //setIsOpen: (open:boolean) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  widthClass?: string;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
     <AlertDialogContent className={`${widthClass} max-h-[95vh] overflow-auto p-6`}>
        <AlertDialogHeader className="relative">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
          {/* Botón de cierre redondo en la esquina superior derecha */}
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}  // Cerrar el modal al hacer clic en la X
            className="absolute right-2 top-2 p-2 bg-white hover:bg-gray-200 opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4 text-gray-800 dark:text-white" />
            <span className="sr-only ">Cerrar</span> {/* Para accesibilidad */}
          </AlertDialogCancel>
        </AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
}
