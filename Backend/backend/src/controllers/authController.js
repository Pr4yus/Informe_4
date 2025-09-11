import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';  // Asegúrate de usar la misma clave secreta

export const login = async (req, res) => {
  const { registro, password } = req.body;

  try {
    // Usuario predeterminado para pruebas
    const defaultUser = {
      id: 1,
      registro: 'testuser',  // Registro del usuario predeterminado
      password_hash: bcrypt.hashSync('testpassword', 10),  // Contraseña predeterminada hasheada
      nombres: 'Juan',
      apellidos: 'Pérez',
      email: 'testuser@example.com'
    };

    // Verificar si el registro coincide con el usuario predeterminado
    if (registro !== defaultUser.registro) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña usando bcrypt
    const isPasswordCorrect = bcrypt.compareSync(password, defaultUser.password_hash);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Si las credenciales son correctas, generar el token JWT
    const token = jwt.sign(
      { sub: defaultUser.id, registro: defaultUser.registro },
      JWT_SECRET,
      { expiresIn: '2h' }  // El token expirará en 2 horas
    );

    // Devolver el token y los datos del usuario
    res.json({
      token,
      user: {
        id: defaultUser.id,
        registro: defaultUser.registro,
        nombres: defaultUser.nombres,
        apellidos: defaultUser.apellidos,
        email: defaultUser.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};
