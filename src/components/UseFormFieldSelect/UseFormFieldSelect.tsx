'use client'

import {
        FormField, FormItem, FormLabel, FormControl 
      } from "@/components/ui/form"
import {
        Select, SelectTrigger, SelectValue, SelectContent, SelectItem
      } from "@/components/ui/select" 
import { FieldValues, Control, Path } from "react-hook-form"

type Option = {
  valor: string
  texto: string
}

type FormSelectFieldProps<T extends FieldValues> = {
  nombreAtributo: Path<T>
  textoLabel: string
  controlForm: Control<T>
  listadoOpciones: Option[]
  esRequerido?: boolean
  fullWidth?: boolean
}

export function UseFormFieldSelect<T extends FieldValues>({
  nombreAtributo,
  textoLabel,
  controlForm,
  listadoOpciones,
  esRequerido = false,
  fullWidth = false,
}: FormSelectFieldProps<T>) {
  return (
    <FormField
      name={nombreAtributo}
      control={controlForm}
      render={({ field, fieldState }) => (
        <FormItem className={fullWidth ? "w-full" : "w-auto"}>
          <FormLabel>
            {textoLabel}
            {esRequerido && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                {listadoOpciones.map((opcion) => (
                  <SelectItem key={opcion.valor} value={opcion.valor}>
                    {opcion.texto}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </FormItem>
      )}
    />
  )
}