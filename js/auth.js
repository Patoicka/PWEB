// ====================================================================================
// === LÓGICA DE AUTENTICACIÓN (LOGIN Y LOGOUT) ===
// ====================================================================================

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    }
}

function handleLogin() {
    // Simulación de login: verifica que los campos no estén vacíos.
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (username && password) {
        // Simulación de guardar sesión
        localStorage.setItem('loggedIn', 'true');
        if (rememberMe) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }

        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('dashboard-content').classList.remove('hidden');
        
        // 🔑 LLAMADA CLAVE: Aumenta y muestra el contador después del login exitoso
        incrementAndGetVisitCounter(); 

        // Necesario para que el mapa se muestre correctamente después de salir de 'display: none'
        if (typeof map !== 'undefined') {
            map.invalidateSize(); 
        }
        setMode('place');
    } else {
        alert('Por favor, ingrese usuario y contraseña.');
    }
}

function handleLogout() {
    // Simula cerrar la sesión
    localStorage.removeItem('loggedIn'); 
    document.getElementById('dashboard-content').classList.add('hidden');
    document.getElementById('login-overlay').style.display = 'flex';
    // Limpiar la contraseña al salir
    document.getElementById('password').value = ''; 
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    const rememberedUser = localStorage.getItem('rememberedUser');
    
    if (rememberedUser) {
        document.getElementById('username').value = rememberedUser;
        document.getElementById('remember-me').checked = true;
    }

    if (isLoggedIn) {
        document.getElementById('login-overlay').style.display = 'none';
        document.getElementById('dashboard-content').classList.remove('hidden');
        // Forzar la actualización del mapa y el modo si ya estaba loggeado
        if (typeof map !== 'undefined') {
            map.invalidateSize();
        }
        setMode('place'); 
        
        // 🔑 LLAMADA CLAVE: Si ya está loggeado, se llama a la función (que incrementa y obtiene el total)
        incrementAndGetVisitCounter();
    } else {
        document.getElementById('login-overlay').style.display = 'flex';
        document.getElementById('dashboard-content').classList.add('hidden');
        // Si no está loggeado, establecemos un mensaje de carga inicial
        const counterElement = document.getElementById('visit-counter');
        if(counterElement) counterElement.innerText = 'Cargando...';
    }
}

