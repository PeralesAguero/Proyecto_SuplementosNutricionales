document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const toggleLink = document.getElementById('toggle-link');
  const formTitle = document.getElementById('form-title');
  const formSubtitle = document.getElementById('form-subtitle');
  const rememberCheck = document.getElementById('remember-check');
  const mainBtn = document.getElementById('main-btn');
  const msg = document.getElementById('msg');

  // Limpiar clases de validación
  function clearValidation(inputs) {
    inputs.forEach(input => {
      input.classList.remove('is-invalid', 'is-valid');
    });
  }

  // Cambiar entre login y registro
  toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    msg.textContent = '';
    clearValidation([
      document.getElementById('email'),
      document.getElementById('password'),
      document.getElementById('new-email'),
      document.getElementById('new-password'),
      document.getElementById('confirm-password')
    ]);
    if (loginForm.classList.contains('d-none')) {
      loginForm.classList.remove('d-none');
      registerForm.classList.add('d-none');
      formTitle.textContent = 'Iniciar Sesión';
      formSubtitle.textContent = 'Accede a tu cuenta';
      rememberCheck.classList.remove('d-none');
      mainBtn.textContent = 'Entrar';
      toggleLink.textContent = '¿No tienes cuenta? Crea una aquí';
    } else {
      loginForm.classList.add('d-none');
      registerForm.classList.remove('d-none');
      formTitle.textContent = 'Crear Cuenta';
      formSubtitle.textContent = 'Regístrate gratis';
      rememberCheck.classList.add('d-none');
      toggleLink.textContent = '¿Ya tienes cuenta? Inicia sesión';
    }
  });

  // Validación de login
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    clearValidation([emailInput, passwordInput]);
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let valid = true;

    if (!email) {
      emailInput.classList.add('is-invalid');
      valid = false;
    } else {
      emailInput.classList.add('is-valid');
    }
    if (!password) {
      passwordInput.classList.add('is-invalid');
      valid = false;
    } else {
      passwordInput.classList.add('is-valid');
    }
    if (!valid) {
      msg.classList.remove('text-success');
      msg.classList.add('text-danger');
      msg.textContent = 'Completa todos los campos.';
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (users[email] && users[email] === password) {
      localStorage.setItem('usuarioActivo', email);
      window.location.href = 'index.html';
    } else {
      msg.classList.remove('text-success');
      msg.classList.add('text-danger');
      msg.textContent = 'Correo o contraseña incorrectos.';
      emailInput.classList.add('is-invalid');
      passwordInput.classList.add('is-invalid');
    }
  });

  // Validación de registro
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('new-email');
    const passwordInput = document.getElementById('new-password');
    const confirmInput = document.getElementById('confirm-password');
    clearValidation([emailInput, passwordInput, confirmInput]);
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    let valid = true;

    if (!email) {
      emailInput.classList.add('is-invalid');
      valid = false;
    } else {
      emailInput.classList.add('is-valid');
    }
    if (!password) {
      passwordInput.classList.add('is-invalid');
      valid = false;
    } else {
      passwordInput.classList.add('is-valid');
    }
    if (!confirm) {
      confirmInput.classList.add('is-invalid');
      valid = false;
    } else {
      confirmInput.classList.add('is-valid');
    }
    if (!valid) {
      msg.textContent = 'Completa todos los campos.';
      msg.classList.remove('text-success');
      msg.classList.add('text-danger');
      return;
    }
    if (password.length < 6) {
      msg.textContent = 'La contraseña debe tener al menos 6 caracteres.';
      msg.classList.remove('text-success');
      msg.classList.add('text-danger');
      passwordInput.classList.add('is-invalid');
      return;
    }
    if (password !== confirm) {
      msg.textContent = 'Las contraseñas no coinciden.';
      msg.classList.remove('text-success');
      msg.classList.add('text-danger');
      passwordInput.classList.add('is-invalid');
      confirmInput.classList.add('is-invalid');
      return;
    }
    if (users[email]) {
      msg.textContent = 'El correo ya está registrado.';
      msg.classList.remove('text-success');
      msg.classList.add('text-danger');
      emailInput.classList.add('is-invalid');
      return;
    }
    users[email] = password;
    localStorage.setItem('users', JSON.stringify(users));
    msg.classList.remove('text-danger');
    msg.classList.add('text-success');
    msg.textContent = '¡Cuenta creada! Ahora puedes iniciar sesión.';
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    confirmInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
    passwordInput.classList.add('is-valid');
    confirmInput.classList.add('is-valid');
    setTimeout(() => {
      toggleLink.click();
    }, 1500);
  });
});