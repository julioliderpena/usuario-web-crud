import { useState, useEffect } from 'react';


// Define una interfaz para el valor de retorno del hook
interface UseFetchResult<T> {
    data: T[] | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// export function UseFetchData<T = any>(url: string): UseFetchResult<T> {
//     const [data, setData] = useState<T[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // 🔁 Función reutilizable para obtener datos
//     const fetchData = async () => {
//         try {
//         setLoading(true);
//         const response = await fetch(url, {
//             method: 'GET',
//             // headers: {
//             // accept: '*/*'
//             // }
//         });

//         if (!response.ok) {
//             throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
//         }

//         const data: T[] = await response.json();
//         setData(data);
//         } catch (error: unknown) {
//         const errorMessage = error instanceof Error ? error.message : String(error);
//         setError(errorMessage);
//         } finally {
//         setLoading(false);
//         }
//     };

//     // 📦 Se ejecuta al montar el componente
//     useEffect(() => {
//         fetchData();
//     }, [url]);

//     // ✅ Exponemos la función como "refetch"
//     return { data, loading, error, refetch: fetchData };
// }

export function UseFetchData<T = any>(url: string): UseFetchResult<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);

            // // Construir headers dinámicamente
            // const headers: HeadersInit = {};
            // if (token && token.trim() !== "") {
            //     headers['Authorization'] = `Bearer ${token}`;
            // }

            const response = await fetch(url, {
                method: 'GET',
                credentials: "include"
            });

            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }

            const data: T[] = await response.json();
            setData(data);

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]); 

    return { data, loading, error, refetch: fetchData };
}
