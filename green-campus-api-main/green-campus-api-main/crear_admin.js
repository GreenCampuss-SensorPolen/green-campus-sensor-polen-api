process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function crearAdmin() {
  console.log("Llamando a la puerta secreta de la API...");
  
  try {
    const response = await fetch('https://localhost:3000/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer super-secreto-admin' 
      },
      body: JSON.stringify({
        email: 'tecnico@greencampus.com',
        password: 'GreenCampus2026!', // <-- Contraseña fuerte (Mayúscula, número y símbolo)
        firstName: 'Tecnico',           // <-- Ahora sí, nombre
        lastName: 'Mantenimiento',        // <-- Y apellido
        role: 'TECNICO'             // <-- Rol oficial
      })
    });
    
    const status = response.status;
    const data = await response.text();
    
    if (status === 200 || status === 201) {
      console.log("✅ ¡Usuario creado con éxito!");
      console.log("Ya puedes entrar en la web con tecnico@greencampus.com y GreenCampus2026!");
    } else {
      console.error(`❌ Falló la creación (Error ${status}):`);
      console.error(data);
    }
  } catch (err) {
    console.error("Error de conexión:", err.message);
  }
}

crearAdmin();