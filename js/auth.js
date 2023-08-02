export const registerForm = document.querySelector('#register-form')
export const loginForm = document.querySelector('#login-form')

const changeToRegisterBtn = document.querySelector('#change-to-register')
const changeToLoginBtn = document.querySelector('#change-to-login')

const authSubTitle = document.querySelector('#auth-type')

const registerName = document.querySelector('#register-name')
const registerPhone = document.querySelector('#register-phone')
const registerPassword = document.querySelector('#register-password')

const loginPhone = document.querySelector('#login-phone')
const loginPassword = document.querySelector('#login-password')

changeToLoginBtn.addEventListener('click', () => {
	registerForm.classList.remove('active')
	loginForm.classList.add('active')
	authSubTitle.innerHTML = 'Sign in'
})

changeToRegisterBtn.addEventListener('click', () => {
	loginForm.classList.remove('active')
	registerForm.classList.add('active')
	authSubTitle.innerHTML = 'Register'
})
