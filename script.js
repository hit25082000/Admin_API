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
  ind: 0,

  login: document.querySelector('input#login'),
  password: document.querySelector('input#password'),
  passwordConfirm: document.querySelector('input#passwordConfirm'),

  log(event){
    event.preventDefault();
    try { 
      user.validate()  

      let validUser = false
      let validPassword = false

      user.users.forEach((x)=>{
        if(user.login.value === x.login){
          validUser = true
          if(user.password.value === x.password){
            validPassword = true           
          }                  
        }   
        console.log(x)    
      })    

      if(validUser === true){
        if(validPassword === true){
          window.location.href = "http://127.0.0.1:5500/menu.html?";        
        }
        else{
          throw new Error('Senha incorreta')
        }
      }
      else{
        throw new Error('Usuario não encontrado')
      }
      
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

  clear() {
    user.login.value = ""
    user.password.value = ""
    user.passwordConfirm.value = ""
  },

  clearTable(){
    menu.tBody.innerHTML = ""
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
      window.location.href = "http://127.0.0.1:5500/menu.html?";
      
    } catch (error) {
      alert(error.message)
    }
  },

  remove(index){
    user.users.splice(index, 1)

    Storage.set(user.users) 
  },

  edit(index){    
    console.log(user.users[index])    
    
    const modalLogin = document.querySelector('#divLogin')
    const modalPassword = document.querySelector('#divPassword')    
    
    modalLogin.innerHTML = `
    <label for="modalLogin"></label>
    <input id="modalLogin"type="text" placeholder="${user.users[index].login}">
    `
    modalPassword.innerHTML = `
    <label for="modalPassword"></label>
    <input id="modalPassword"type="text" placeholder="${user.users[index].password}">
    `
    
    document.querySelector('.modal').classList.toggle('active')  

    return user.ind = index       
  },

  salvar(event){
    event.preventDefault()

    const newLogin = document.querySelector('#modalLogin')
    const newPassword = document.querySelector('#modalPassword')   
    
    console.log(user.users[user.ind])
    
    user.users[user.ind].login = newLogin.value
    user.users[user.ind].password = newPassword.value
    
    console.log(user.users[user.ind])

    document.querySelector('.modal').classList.toggle('active')
    
    Storage.set(user.users) 

    user.clearTable()

    menu.innerUser()

    return ind = 0
  },

  validate(){   

    if(user.login.value === "" ||
       user.password.value === ""){
      throw new Error("Por favor, preencha todos os campos")
    }
    // if(user.login.value.length < 0 ||
    //    user.password.value.length < 0){
    //   throw new Error("Por favor, preencha todos os campos")
    // }
    
  },  
}

const menu = {
  tBody: document.querySelector('table tbody'),

  innerUser(){    
    user.users.forEach((x, index)=>{       
      
      const tr = document.createElement('tr')

      const userTable = `
      <tr>
            <td>${x.login}</td>
            <td>${x.password}</td>            
            <td > <a onclick="user.edit(${index})">Editar</a> </td>            
            <td > <a onclick="user.remove(${index})" href="">Remover</a> </td>            
            <td hidden> ${index}  </td>            
      </tr>
      `
      tr.innerHTML = userTable

      tr.dataset.index = index

      menu.tBody.appendChild(tr)
    })
    
  }
}

menu.innerUser()







