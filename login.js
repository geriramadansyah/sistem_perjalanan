const URL = "https://script.google.com/macros/s/AKfycbx6ODbk7T9rK40UrJAUDlK7LLEePgVdONfV_FzQ9hXJ0C3zWm6iGyFFdFn0c-7saYA5/exec";

let role = "KURIR";
let loading = false;

function setRole(r){
  role = r;

  document.getElementById("btnKurir").classList.toggle("active", r==="KURIR");
  document.getElementById("btnPemesan").classList.toggle("active", r==="PEMESAN");
}

function login(){

  if(loading) return;
  loading = true;

  let text = document.getElementById("textLogin");
  let spin = document.getElementById("spinnerLogin");
  let error = document.getElementById("errorLogin");

  text.innerText = "";
  spin.style.display = "inline-block";
  error.innerText = "";

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"login",
      username: username.value,
      password: password.value
    })
  })
  .then(res=>res.json())
  .then(res=>{

    if(res.status === "success"){

      if(res.posisi !== role){
        error.innerText = "Role tidak sesuai!";
        return;
      }

      localStorage.setItem("nama", res.nama);
      localStorage.setItem("role", res.posisi);

      if(res.posisi === "KURIR"){
        location.href = "kurir.html";
      } else {
        location.href = "pemesan.html";
      }

    } else {
      error.innerText = "Masuk Gagal!";
    }

  })
  .finally(()=>{
    loading = false;
    text.innerText = "Masuk";
    spin.style.display = "none";
  });
}