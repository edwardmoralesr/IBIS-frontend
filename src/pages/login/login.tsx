import { useEffect, useState } from "react";
import { TextField, PrimaryButton, Stack, Link } from "@fluentui/react";
import "./login.css";

export default function Login() {
  const [loaded, setLoaded] = useState(false);

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
          <TextField label="Correo electrónico" />
          <TextField label="Contraseña" type="password" />

          <PrimaryButton text="Ingresar" />

          <Link href="#" className="links">
            ¿Olvidaste tu contraseña?
          </Link>
        </Stack>

      </div>

    </div>
  );
}