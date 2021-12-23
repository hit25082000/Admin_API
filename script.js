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

      user.users.forEach((x)=>{
        if(user.login.value === x.login || user.password.value === x.password){
          window.location.href = "http://127.0.0.1:5500/menu.html?";
        }        
        else{
          throw new Error('Usuario ou senha incorretos')
        }
      })
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

      if(user.password.value !== user.passwordConfirm.value ||
         user.login.value === "" ||
         user.password.value === ""){
        throw new Error('Dados incorretos')
      }
      user.users.forEach((USR) => {
        if(USR.login === user.login.value){
          throw new Error('usuario ja cadastrado')
        }
      }) 

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
    if(user.login.value === "" ||
       user.password.value === ""){
      throw new Error("Por favor, preencha todos os campos")
    }
    if(user.login.value.length < 0 ||
       user.password.value.length < 0){
      throw new Error("Por favor, preencha todos os campos")
    }
  },  
}



