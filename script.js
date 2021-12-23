const Storage = {
  get() {
      return JSON.parse(localStorage.getItem("Admin:usuarios")) || []
  },  

  set(usuarios) {    
      localStorage.setItem("Admin:usuarios", JSON.stringify(usuarios))
  }
}

const user = {  
  users: Storage.get(),

  login: document.querySelector('input#login'),
  password: document.querySelector('input#password'),
  passwordConfirm: document.querySelector('input#passwordConfirm'),

  log(event){
    event.preventDefault();
    try {
      user.validate()
    } catch (error) {
      alert(error.message)
    }
  },

  getValues(){
    return {
      login: user.login.value,
      password: user.password.value
    }
  },

  clear(){
    
  },

  submit(event){
    event.preventDefault()
    try {
      

      const usuario = user.getValues()
      console.log(usuario)
      
      user.users.push(usuario)  
      Storage.set(user.users)
      
      
      user.clear()
      
    } catch (error) {
      alert(error.message)
    }
  },

  validate(){
    if(user.login.value === "",
       user.password.value === ""){
      throw new Error("Por favor, preencha todos os campos")
    }
    if(user.login.value.length < 4,
       user.password.value.length < 4){
      throw new Error("Por favor, preencha todos os campos")
    }
  },  
}



