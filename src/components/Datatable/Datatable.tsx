import { useState, useEffect } from "react";
import "./Datatable.css";
import { Combobox } from "../../components";

export type Column<T> = {
    header: string;
    accessor?: keyof T;
    render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    fetchData: (params: {
        page: number;
        pageSize: number;
        search: string;
    }) => Promise<{
        data: T[];
        total: number;
        totalOriginal: number;
    }>;
};

export default function DataTable<T>({
    columns,
    fetchData
}: DataTableProps<T>) {

    const [data, setData] = useState<T[]>([]);
    const [total, setTotal] = useState(0);
    const [totalOriginal, setTotalOriginal] = useState(0);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);

            try {
                const res = await fetchData({
                    page,
                    pageSize,
                    search
                });

                setData(res.data);
                setTotal(res.total);
                setTotalOriginal(res.totalOriginal);

            } catch (error) {
                console.error("Error cargando datos", error);
                setData([]);
                setTotal(0);
            }

            setLoading(false);
        };

        load();
    }, [page, pageSize, search]);

    const totalPages = Math.ceil(total / pageSize);

    const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
    const end = Math.min(page * pageSize, total);

    const pageSizeOptions = [
        { label: "5", value: 5 },
        { label: "10", value: 10 },
        { label: "50", value: 50 },
        { label: "100", value: 100 },
        { label: "500", value: 500 },
    ];

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
                        {columns.map((col, i) => (
                            <th key={i}>{col.header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {/* LOADING */}
                    {loading && (
                        <tr>
                            <td colSpan={columns.length} className="empty">
                                Cargando...
                            </td>
                        </tr>
                    )}

                    {/* EMPTY */}
                    {!loading && data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="empty">
                                {search
                                    ? `Sin resultados para "${search}"`
                                    : "Sin datos"}
                            </td>
                        </tr>
                    )}

                    {/* DATA */}
                    {!loading && data.map((row, i) => (
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
                            <> (Filtrados de {totalOriginal})</>
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