'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { FieldValues, Control, Path } from 'react-hook-form'
import { 
         FormField, 
         FormItem, 
         FormLabel, 
         FormControl 
        } from '@/components/ui/form'

type FormTextFieldProps<T extends FieldValues> = {
  nombreAtributo: Path<T>
  textoLabel: string
  controlForm: Control<T>
  esRequerido?: boolean
  fullWidth?: boolean
}

export function UseFormFieldText<T extends FieldValues>({
  nombreAtributo, textoLabel, controlForm, esRequerido = false, fullWidth = false,
}: FormTextFieldProps<T>) {
  return (
    <FormField
      name={nombreAtributo}
      control={controlForm}
      render={({ field, fieldState }) => (
        <FormItem className={fullWidth ? 'w-full' : 'w-auto'}>
          <FormLabel>
            {textoLabel}
            {esRequerido && <span className="text-red-500 ml-1">*</span>}
          </FormLabel>
          <FormControl>
            <Input type="text" autoComplete="off" {...field} />
          </FormControl>
          {fieldState.error && (
            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
          )}
        </FormItem>
      )}
    />
  )
}
