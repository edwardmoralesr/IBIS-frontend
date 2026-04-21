import { useEffect, useState } from "react";
import { Stack, Link } from "@fluentui/react";
import { Button, Input, Checkbox, Combobox, Datatable, Spinner, Modal } from "../../components";
import type { Column } from "../../components/Datatable/Datatable";
import { PersonCircle24Regular, LockClosed24Regular, Edit20Regular, Mail20Regular, CheckmarkCircle24Regular } from "@fluentui/react-icons";
import "../login/login.css";
//import { loginRequest, type ApiResult } from "../../services/auth.service";
import { buildModalFromResponse } from "../../utils/modal";
import type { ModalType } from "../../utils/modal";
//import { useNavigate } from "react-router-dom";
//import type { LoginResponse } from "../../types/auth";
type Student = {
    id: number;
    name: string;
    grade: number;
};

export default function Inicio() {

    const [loaded, setLoaded] = useState(false);
    const [Role, setRole] = useState(false);
    const [value, setValue] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const options = [
        { label: "Matemáticas", value: 1 },
        { label: "Historia", value: 2 },
        { label: "Lenguaje", value: 3 }
    ];

    const data: Student[] = [
        { id: 1, name: "Juan", grade: 4.5 },
        { id: 8, name: "Ana", grade: 3.8 },
        { id: 2, name: "Edward", grade: 4.5 },
        { id: 3, name: "Marcos", grade: 4.5 },
        { id: 4, name: "Claudia", grade: 4.5 },
        { id: 5, name: "Alonso", grade: 4.5 },
        { id: 6, name: "Ivonne", grade: 4.5 },
        { id: 7, name: "Valeria", grade: 4.5 },
    ];

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Nombre", accessor: "name" },
        { header: "Nota", accessor: "grade" },
        {
            header: "Editar",
            render: (row: Student) => (
                <div style={{ gap: 8 }}>

                    <button title="Editar" className="action-btn" onClick={() => console.log(row)}>
                        {<Edit20Regular />}
                    </button>

                </div>
            )
        },
        {
            header: "Enviar Correo",
            render: (row: Student) => (
                <div style={{ gap: 8 }}>

                    <button title="Enviar Correo" className="action-btn" onClick={() => console.log(row)}>
                        {<Mail20Regular />}
                    </button>

                </div>
            )
        },
        {
            header: "Status",
            render: (row: Student) => (
                <div style={{ gap: 8 }}>

                    <button title="Status estudiante" className="action-btn" onClick={() => console.log(row)}>
                        {<CheckmarkCircle24Regular color="#22c55e" />}
                    </button>

                </div>
            )
        }
    ] satisfies Column<Student>[];

    type ModalState = {
        visible: boolean;
        type: ModalType;
        title: string;
        message: string;
        showClose: boolean;
        showAccept: boolean;
        showCancel: boolean;
    };

    const [modal, setModal] = useState<ModalState>({
        visible: false,
        type: "info",
        title: "",
        message: "",
        showClose: true,
        showAccept: true,
        showCancel: false
    });

    useEffect(() => {
        const raw = sessionStorage.getItem("loginSuccess");

        if (!raw) return;

        const res = JSON.parse(raw);

        if (res != null) {
            setModal(buildModalFromResponse(res));
        }

        sessionStorage.removeItem("loginSuccess");
    }, []);

    return (
        <div>

            <div>

                <Stack tokens={{ childrenGap: 15 }}>

                    {/*<Combobox
                        label="Materia"
                        options={options}
                        value={value}
                        onChange={setValue}
                        placeholder="Selecciona una materia"
                    />*/}
                    <h2 style={{ paddingTop: 30, paddingLeft: 30 }}>Inicio</h2>
                    {/*<Datatable columns={columns} data={data} />*/}

                    <Spinner visible={loading} message={message} />

                    <Modal
                        visible={modal.visible}
                        type={modal.type}
                        title={modal.title}
                        message={modal.message}
                        showAccept={modal.showAccept}
                        showCancel={modal.showCancel}
                        showClose={modal.showClose}
                        onClose={() => setModal({ ...modal, visible: false })}
                    />


                </Stack>

            </div>

        </div>
    );
}