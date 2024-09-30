function validatePasswords() {
    var password = document.getElementById('pwd').value;
    var confirmPassword = document.getElementById('confirm_pass').value;
    var errorMessage = document.getElementById('password_error');

    if (password !== confirmPassword) {
        errorMessage.style.display = "inline";  
        return false; 
    } else {
        errorMessage.style.display = "none";  
        return true; 
    }
}
