import React, { useState } from "react";
import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Trash2 } from 'lucide-react';


export function addColumnTexto<ColumnName, ColumnAlias = unknown>(
    accessorKey: keyof ColumnName,
    header: string,
    width?: string,
    alignment: 'text-left' | 'text-center' | 'text-right' = 'text-left'
    ): ColumnDef<ColumnName, ColumnAlias> {
    return {
        accessorKey: accessorKey as string,
        header,
        meta: {
            width,
            className: alignment,
        },
        cell: info => info.getValue(),
    };
}


export function addColumnDecimal<ColumnName, ColumnAlias = unknown>(
  accessorKey: keyof ColumnName,
  header: string,
  width?: string,
  alignment: 'text-left' | 'text-center' | 'text-right' = 'text-left',
  decimales?: number 
): ColumnDef<ColumnName, ColumnAlias> {
  return {
    accessorKey: accessorKey as string,
    header,
    meta: {
      width,
      className: alignment,
    },
    cell: info => {
      const value = info.getValue();

      // ✅ Formatea si el parámetro decimals está definido y el valor es numérico
      if (typeof value === 'number' && typeof decimales === 'number') {
        return value.toFixed(decimales);
      }

      return value;
    },
  };
}


export function addColumnCheckbox<ColumnName>(
    accessorKey: keyof ColumnName,
    header: string,
    checkedValue: string | boolean, // lo que representa "activo"
    width?: string,
    alignment: 'text-left' | 'text-center' | 'text-right' = 'text-center'
    // ): ColumnDef<ColumnName, string | boolean> {
    ): ColumnDef<ColumnName, unknown> {
    return {
        accessorKey: accessorKey as string,
        header,
        meta: {
            width,
            className: alignment,
        },
        cell: ({ row }) => {
            const value = row.getValue(accessorKey as string);
            const isChecked = value === checkedValue;

            return (
                <div className="flex justify-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                        className="w-5 h-5 accent-green-500"
                    />
                </div>
            );
        },
    };
}


export function addColumnActions<ColumnName>(
    showDelete: boolean | '1' = true,
    width: string = '5%',
    alignment: 'text-left' | 'text-center' | 'text-right' = 'text-center', 
    eventoUpdate: (row: ColumnName) => void,
    eventoDelete: (row: ColumnName) => void,
    ): ColumnDef<ColumnName, unknown> {
    return {
        id: 'acciones',
        header: '',
        meta: {
            width,
            className: alignment,
        },
        cell: ({ row }) => {
            const rowData = row.original;
            const [ openModalUpdate, setOpenModalUpdate] = useState(false);
            const [ openModalDelete, setOpenModalDelete] = useState(false);

            return (
                <div className="flex justify-center items-center gap-2">
                    {/* Botón editar (siempre visible) */}
                    <button
                        //onClick={() => setOpenModalUpdate(true)}
                        onClick={() => eventoUpdate(rowData)}
                        title="Editar"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>

                    {/* Botón eliminar (opcional) */}
                    {showDelete && (
                        <button
                            //onClick={() => setOpenModalDelete(true)}
                            onClick={() => eventoDelete(rowData)}
                            title="Eliminar"
                            className="text-red-600 hover:text-red-800"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>                
            );
        },
    };
}
