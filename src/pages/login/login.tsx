import { useEffect, useState } from "react";
import { Stack, Link } from "@fluentui/react";
import { Button, Input, Checkbox, Combobox, Datatable, Spinner, Modal } from "../../components";
import type { Column } from "../../components/Datatable/Datatable";
import { PersonCircle24Regular, LockClosed24Regular, Edit24Regular, Mail24Regular, CheckmarkCircle20Color } from "@fluentui/react-icons";
import "./login.css";
import { loginRequest } from "../../services/auth.service";
import { buildModalFromResponse } from "../../utils/modal";
import type { ModalType } from "../../utils/modal";
import { useNavigate } from "react-router-dom";

type Student = {
  id: number;
  name: string;
  grade: number;
};


export default function Login() {

  const navigate = useNavigate();

  const year = new Date().getFullYear();
  const [loaded, setLoaded] = useState(false);
  const [Role, setRole] = useState(false);
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [Documento, setDocumento] = useState("");
  const [Password, setPassword] = useState("");

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
        <div style={{ display: "flex", gap: 8 }}>

          <button title="Editar" className="action-btn" onClick={() => console.log(row)}>
            {<Edit24Regular />}
          </button>

        </div>
      )
    },
    {
      header: "Enviar Correo",
      render: (row: Student) => (
        <div style={{ display: "flex", gap: 8 }}>

          <button title="Enviar Correo" className="action-btn" onClick={() => console.log(row)}>
            {<Mail24Regular />}
          </button>

        </div>
      )
    },
    {
      header: "Status",
      render: (row: Student) => (
        <div style={{ display: "flex", gap: 8 }}>

          <button title="Status estudiante" className="action-btn" onClick={() => console.log(row)}>
            {<CheckmarkCircle20Color />}
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

  const handleLogin = async () => {
    setMessage("Autenticación en progreso...");
    setLoading(true);

    const res = await loginRequest(Documento, Password, Role);

    if (res.status < 300 && res.data) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/inicio");
    }

    setLoading(false);
    setModal(buildModalFromResponse(res));
  };


  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className={`login-container ${loaded ? "fade-in" : ""}`}>

      <div className="login-card">

        <img src="src/assets/images/logo.png" className="logo" />
        <img src="src/assets/images/logo-entidad.png" className="logo-entidad" />


        <p className="subtitle">Sistema Institucional Seguimiento Académico</p>

        <Stack tokens={{ childrenGap: 15 }}>
          <Input
            label="Usuario"
            placeholder="Número de documento"
            type="email"
            icon={<PersonCircle24Regular />}
            tooltip="Ingresa documento del usuario"
            id="Documento"
            autoFocus="true"
            value={Documento}
            onChange={setDocumento}
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            type="password"
            icon={<LockClosed24Regular />}
            id="Password"
            value={Password}
            onChange={setPassword}
          />

          <Checkbox
            label="Ingreso Docentes y Administrativos"
            checked={Role}
            onChange={setRole}
          />

          {/*<Combobox
            label="Materia"
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Selecciona una materia"
          />

          <Datatable columns={columns} data={data} />*/}

          <Button
            variant="primary"
            fullWidth
            onClick={handleLogin}
          >
            Ingresar
          </Button>

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

          <Link href="#" className="links">
            ¿Olvidaste tu contraseña?
          </Link>
        </Stack>
        <p className="footer">© {year} Edward Morales. Todos los derechos reservados.</p>
      </div>

    </div>
  );
}