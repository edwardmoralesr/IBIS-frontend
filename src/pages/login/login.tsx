import { useEffect, useState } from "react";
import { Stack, Link } from "@fluentui/react";
import { Button, Input, Checkbox, Spinner, Modal } from "../../components";
import { PersonCircle24Regular, LockClosed24Regular } from "@fluentui/react-icons";
import "./login.css";
import { loginRequest } from "../../services/auth.service";
import { buildModalFromResponse } from "../../utils/modal";
import type { ModalType } from "../../utils/modal";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const year = new Date().getFullYear();
  const [loaded, setLoaded] = useState(false);
  const [Role, setRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [Documento, setDocumento] = useState("");
  const [Password, setPassword] = useState("");

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
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("user", JSON.stringify(res.data.user));
      sessionStorage.setItem("menus", JSON.stringify(res.data.menus));
      sessionStorage.setItem("loginSuccess", JSON.stringify(res));

      navigate("/inicio");
    }

    setLoading(false);
    if (res.status > 300)
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