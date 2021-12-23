const user = {
  login: document.getElementById('login'),
  password: document.getElementById('password'),

  submit(event){
    event.preventDefault();
    try {
      user.validate()
    } catch (error) {
      alert(error.message)
    }
  },
  validate(){
    if(user.login.value === "",
       user.password.value === ""){
       throw new Error("Por favor, preencha todos os campos")
    }
    if(user.login.value.length < 4){
      throw new Error("Por favor, preencha todos os campos")

    }
  }  
}

