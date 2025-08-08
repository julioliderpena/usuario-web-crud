import { ColumnMeta } from '@tanstack/react-table';


type MyColumnMeta = {
    width?: string;
    className?: string;
};


declare module '@tanstack/react-table' {
    interface ColumnMeta extends MyColumnMeta {}
}
