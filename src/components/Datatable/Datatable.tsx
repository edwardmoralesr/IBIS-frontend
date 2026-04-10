import { useState, useMemo, useEffect } from "react";
import "./Datatable.css";
import { Combobox } from "../../components";

export type Column<T> = {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
};

export default function DataTable<T>({
    columns,
    data
}: DataTableProps<T>) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");

    // FILTRO
    const filteredData = useMemo(() => {
        if (!search) return data;

        return data.filter(row =>
            Object.values(row as Record<string, any>)
                .some(value =>
                    String(value).toLowerCase().includes(search.toLowerCase())
                )
        );
    }, [data, search]);

    // PAGINACIÓN
    const total = filteredData.length;
    const totalOriginal = data.length;
    const totalPages = Math.ceil(total / pageSize);

    const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    const pageSizeOptions = [
        { label: "5", value: 5 },
        { label: "10", value: 10 },
        { label: "50", value: 50 },
        { label: "100", value: 100 },
        { label: "500", value: 500 },
        { label: "1000", value: 1000 },
        { label: "5000", value: 5000 },
        { label: "10000", value: 10000 }
    ];

    // Validar página actual
    useEffect(() => {
        if (page > totalPages && totalPages > 0) {
            setPage(totalPages);
        }
    }, [totalPages, page]);

    // Data paginada
    const paginatedData = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, page, pageSize]);

    return (
        <div className="table-container">

            {/* CONTROLES */}
            <div className="table-controls">

                <input
                    type="text"
                    placeholder="Buscar..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />

                <div>
                    <span className="page-size-label">Mostrar:</span>
                    <Combobox
                        options={pageSizeOptions}
                        value={pageSize}
                        onChange={(val: number) => {
                            setPageSize(val);
                            setPage(1);
                        }}
                        placeholder="Cantidad"
                    />
                </div>

            </div>

            {/* TABLA */}
            <table className="table">

                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index}>{col.header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {paginatedData.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="empty">
                                {search
                                    ? `Sin resultados para "${search}"`
                                    : "Sin datos"}
                            </td>
                        </tr>
                    )}

                    {paginatedData.map((row, i) => (
                        <tr key={i}>
                            {columns.map((col, j) => (
                                <td key={j}>
                                    {col.render
                                        ? col.render(row)
                                        : col.accessor
                                            ? String(row[col.accessor])
                                            : null}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>

            {/* PAGINACIÓN */}
            {total > 0 && (
                <div className="pagination">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ◀
                    </button>

                    <span className="pagination-info">
                        {total === 0
                            ? "0 registros"
                            : `Mostrando ${start}–${end} de ${total}`}

                        {search && total !== totalOriginal && (
                            <> (filtrados de {totalOriginal})</>
                        )}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        ▶
                    </button>

                </div>
            )}

        </div>
    );
}