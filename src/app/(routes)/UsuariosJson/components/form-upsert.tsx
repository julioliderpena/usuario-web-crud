'use client'

import React, { useState, useEffect } from "react";
import { Save } from "lucide-react"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { UsuarioDto } from "@/types/usuario-dto";
import { UseFormFieldText } from "@/components/UseFormFieldText";
import { UseFormFieldSelect } from "@/components/UseFormFieldSelect";
import { genericPost, genericPut } from "../../../../utils/HttpClientMethods"
import { useAlert } from '@/components/context/alert-provider';


// El esqueme sirve para validr los esquemas del formulario
const UsuarioSchema = z.object({
  id: z.coerce.number(),
  correo: z.string().min(1, "El correo es requerido!"), 
  clave: z.string().min(1, "La clave es super requerida!"),
  nombre: z.string().min(1, "El nombre es requerido!"),
  estado: z.string().min(1, "El estado es requerido!"),
})


type ActionsFormProps = {
  initialData?: UsuarioDto;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => void;
};

const optionsEstado = [
  { valor: "A", texto: "ACTIVO" },
  { valor: "I", texto: "INACTIVO" }
]

export const FormUpsert = ({ initialData, setIsOpen, onSuccess }: ActionsFormProps) => {
  const form = useForm({
    resolver: zodResolver(UsuarioSchema),
    defaultValues: initialData ?? {
      id: 0,
      correo: "",
      clave: "",
      nombre: "",
      estado: "A",
    },
    values: initialData
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData); // ← esto reemplaza todos los valores del formulario
    }
  }, [initialData]);

  console.log(form.formState.errors)
  const { showAlert } = useAlert();

  const apiBaseUrl = process.env.NEXT_PUBLIC_URLAPI_USUARIOJSON ?? "";
  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (!initialData) {
        await genericPost(values, apiBaseUrl);
        toast.success("Registro Agregado con éxito");

        onSuccess();
        setIsOpen(false);
      }
      else {
        const userId = values.id;
        const urlFull = `${apiBaseUrl}/${userId}`;
        await genericPut(values, urlFull);
        toast.success("Registro Editado con éxito");

        onSuccess();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error al Guardar:", error);
      showAlert({
        title: 'Error de Sistema',
        description: `❌ Error al Guardar: ${error}`
      });
    }

    console.log(values)
  })


  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>MANTENCIÓN</CardTitle>
      </CardHeader> */}
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-y-2"
            onSubmit={onSubmit}
          >
            <div>
              <UseFormFieldText
                nombreAtributo="id" textoLabel="Id Usuario"
                controlForm={form.control} esRequerido={true} fullWidth={true}
              />
            </div>
            <div>
              <UseFormFieldText
                nombreAtributo="correo" textoLabel="Correo"
                controlForm={form.control} esRequerido={true} fullWidth={true}
              />
            </div>
            <div>
              <UseFormFieldText
                nombreAtributo="clave" textoLabel="Password"
                controlForm={form.control} esRequerido={true} fullWidth={true}
              />
            </div>
            <div>
              <UseFormFieldText
                nombreAtributo="nombre" textoLabel="Nombre"
                controlForm={form.control} esRequerido={true} fullWidth={true}
              />
            </div>
            <div>
              <UseFormFieldSelect
                nombreAtributo="estado" textoLabel="Estado"
                controlForm={form.control} listadoOpciones={optionsEstado}
                esRequerido={true} fullWidth={true}
              />
            </div>

            {/* Separador */}
            <div className="my-4 border-t border-gray-300">
              <p className="text-sm text-gray-600 mb-4">
                Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
              </p>
            </div>

            <Button variant="default">
              <Save className="mr-2 h-4 w-4" />
              Guardar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
