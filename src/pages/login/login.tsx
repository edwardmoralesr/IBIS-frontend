import { useEffect, useState } from "react";
import { Stack, Link } from "@fluentui/react";
import { Button, Input, Checkbox, Combobox, Datatable } from "../../components";
import type { Column } from "../../components/Datatable/Datatable";
import { PersonCircle24Regular, LockClosed24Regular, Edit24Regular, Mail24Regular, CheckmarkCircle20Color } from "@fluentui/react-icons";
import "./login.css";

type Student = {
  id: number;
  name: string;
  grade: number;
};


export default function Login() {
  const year = new Date().getFullYear();
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(false);
  const [value, setValue] = useState<number>(0);

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
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            type="password"
            icon={<LockClosed24Regular />}
          />

          <Checkbox
            label="Ingreso Docentes y Administrativos"
            checked={active}
            onChange={setActive}
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
            onClick={() => console.log("login")}
          >
            Ingresar
          </Button>

          <Link href="#" className="links">
            ¿Olvidaste tu contraseña?
          </Link>
        </Stack>
      <p className="footer">© {year} Edward Morales. Todos los derechos reservados.</p>
      </div>
            
    </div>
  );
}