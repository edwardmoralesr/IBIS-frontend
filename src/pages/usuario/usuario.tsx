import { Datatable } from "../../components";
import type { Column } from "../../components/Datatable/Datatable";
import { getUsers } from "../../services/user.service";
import { Edit20Regular, CheckmarkCircle24Regular, Mail20Regular } from "@fluentui/react-icons";
import { Stack } from "@fluentui/react";

type User = {
    IdUsuario: number;
    Nombre: string;
    Codigo: string;
    Documento: string;
};

export default function Usuario() {

    const columns: Column<User>[] = [
        { header: "ID", accessor: "IdUsuario" },
        { header: "N° Documento", accessor: "Documento" },
        { header: "Nombre", accessor: "Nombre" },
        { header: "Código", accessor: "Codigo" },
        {
            header: "Editar",
            render: (row: User) => (
                <div style={{ gap: 8 }}>
                    <button title="Editar" className="action-btn" onClick={() => console.log(row)}>
                        {<Edit20Regular />}
                    </button>
                </div>
            )
        },
        {
            header: "Enviar Correo",
            render: (row: User) => (
                <div style={{ gap: 8 }}>

                    <button title="Enviar Correo" className="action-btn" onClick={() => console.log(row)}>
                        {<Mail20Regular />}
                    </button>

                </div>
            )
        },
        {
            header: "Estado",
            render: (row: User) => (
                <div style={{ gap: 8 }}>
                    <button title="Status estudiante" className="action-btn" onClick={() => console.log(row)}>
                        {<CheckmarkCircle24Regular color="#22c55e" />}
                    </button>
                </div>
            )
        }
    ];

    return (
        <div>
            <Stack tokens={{ childrenGap: 15 }}>
                <h2 style={{ paddingTop: 30, paddingLeft: 30 }}>Usuario</h2>
                <Datatable
                    columns={columns}
                    fetchData={getUsers}
                />
            </Stack>
        </div>
    );
}