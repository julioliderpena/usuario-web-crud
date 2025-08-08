'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react";
import { UsuarioDto } from "@/types/usuario-dto";

import { toast } from "sonner";
import { useAlert } from '@/components/context/alert-provider';

import { UseFetchData } from '@/components/UseFetchData';
import { UseReactTable } from '@/components/UseReactTable';
import { ColumnDef } from '@tanstack/react-table';
import { addColumnTexto, addColumnCheckbox, addColumnActions } from '@/components/UseAddColumnsRT';

import { Modal } from "@/components/modal";
import { FormUpsert } from "./form-upsert";
import { genericDelete } from "@/utils/HttpClientMethods";

export function ActionsManager() {
    const nombreObjeto = "USUARIOS SQL"
    const apiBaseUrl = process.env.NEXT_PUBLIC_URLAPI_USUARIOSQL ?? "";
    
    const { data, loading, error, refetch: refreshData } = UseFetchData(apiBaseUrl)
    const { showAlert } = useAlert();

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [rowData, setRowData] = useState<UsuarioDto | null>(null);

    const EventoUpdate = (fila: UsuarioDto) => {
        console.log('Modificar:', fila);
        setRowData(fila);
        setOpenModalEdit(true);
    };

    const EventoDelete = async (fila: UsuarioDto) => {
        console.log('Eliminar:', fila);

        if (!confirm("¿Estás seguro de querer eliminar el registro?")) return;

        try {
            const urlFull = `${apiBaseUrl}/${fila.id}`;
            genericDelete(urlFull)
            refreshData();
            toast.success("Registro Eliminado correctamente");
        } catch (error) {
            console.error(`Error al Guardar: ${error}`);
            showAlert({
                title: 'Error de Sistema',
                description: `❌ Error al Eliminar: ${error}`
            });
        }
    };

    const columns: ColumnDef<UsuarioDto>[] = [
        addColumnTexto('id', 'ID USUARIO', '10%', 'text-right'),
        addColumnTexto('correo', 'CORREO', '35%', 'text-left'),
        addColumnTexto('nombre', 'NOMBRE', '35%', 'text-left'),
        addColumnCheckbox('estado', 'ESTADO', 'A', '10%', 'text-center'),
        addColumnActions(true, '5%', 'text-center', EventoUpdate, EventoDelete),
    ]

    return (
        <>
            <div className='App'>
                {loading && (
                    <p style={{ color: 'blue', fontSize: '1.2em' }}>Cargando datos... por favor espere.</p>
                )}
                {error && (
                    <p style={{ color: 'red', fontSize: '1.2em' }}>
                        Error al cargar los datos: **{error}**
                    </p>
                )}
                {!loading && !error && data && (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2><b>LISTADO DE {nombreObjeto}</b></h2>
                            <Button
                                onClick={() => setOpenModalCreate(true)}
                                title="Agregar" size="sm"
                            >
                                <Plus className="mr-2 h-6 w-6" />
                                Agregar
                            </Button>
                        </div>

                        <UseReactTable columns={columns} data={data} />

                        <Modal
                            isOpen={openModalCreate}
                            setIsOpen={setOpenModalCreate}
                            title={`${nombreObjeto}/MANTENCIÓN`}
                            description=""
                        >
                            <FormUpsert
                                setIsOpen={setOpenModalCreate}
                                onSuccess={refreshData}
                            />
                        </Modal>

                        {rowData && (
                            <Modal
                                isOpen={openModalEdit}
                                setIsOpen={setOpenModalEdit}
                                title={`${nombreObjeto}/MANTENCIÓN`}
                                description=""
                            >
                                <FormUpsert
                                    setIsOpen={setOpenModalEdit}
                                    initialData={rowData}
                                    onSuccess={refreshData} />
                            </Modal>
                        )}
                    </>
                )}
            </div>
        </>
    )
}
