"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, LogIn, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createSession } from "@/actions/auth/session";

const formLoginSchema = z.object({
  user: z.string().min(1, "Ingrese Usuario").max(100),
  password: z.string().min(1, "Ingrese Contraseña").max(100),
});


export default function LoginForm() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formLoginSchema>) => {
    setLoginLoading(true);
    try {
      const resp = await createSession(values.user, values.password);
      if (resp.success) {        
        router.push("/");
        router.refresh();
      } else {
        setError(resp.message);
        setLoginLoading(false);
      }

      // setTimeout(() => {
      //   setError("");
      // }, 3000);
    } catch (error) {
      const message = (error as { message?: string }).message || "Error desconocido.";
      setDialogMessage(message);
      setOpenDialog(true);
      setLoginLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-neutral-500 px-8 py-10 w3/12">
        <div className="flex justify-center items-center h-screen">
          <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Error de inicio de sesión</AlertDialogTitle>
                <AlertDialogDescription>{dialogMessage}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction onClick={() => setOpenDialog(false)}>Aceptar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Card className="w-[350px]">
            <CardHeader>
              <div className="min-h-16 h-16 flex items-center justify-center px-6">
                <Image src="/logo_nur.png" alt="Logo" width={90} height={90} />
              </div>
              <CardTitle>USUARIO-WEB-CRUD</CardTitle>
              <CardDescription>Ingresa tus credenciales para iniciar sesión.</CardDescription>
            </CardHeader>
            {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Usuario</FormLabel>
                        <FormControl>
                          <Input placeholder="ingrese..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="*****"
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/5"
                  >
                    {showPassword ? <Eye /> : <EyeOff />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button disabled={loginLoading} className="w-full">
                {loginLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4" /> Ingresando...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Ingresar
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </Form>
  );
}
