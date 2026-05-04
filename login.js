const URL = "https://script.google.com/macros/s/AKfycbwBXPtgVue5OjfDyeCff-XFAIj0TS91g9ZcUQ2MS2UDEVBqLK3jyha2_Q5U2lWRMhMl/exec";

function login(){

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let btn = document.getElementById("btnLogin");
  let spinner = document.getElementById("spinner");
  let text = document.getElementById("btnText");
  let error = document.getElementById("errorMsg");

  if(!username || !password){
    error.innerText = "⚠️ Harap isi semua field";
    return;
  }

  btn.disabled = true;
  spinner.style.display = "inline-block";
  text.style.display = "none";

  fetch(URL,{
    method:"POST",
    body: JSON.stringify({
      action:"login",
      username: username,
      password: password
    })
  })
  .then(res=>res.json())
  .then(res=>{

    if(res.status === "success"){

      localStorage.setItem("nama", res.nama);
      localStorage.setItem("posisi", res.posisi);
      localStorage.setItem("username", username);

      window.location.href = "app.html";

    }else{
      error.innerText = "❌ ID atau Password salah";
    }

  })
  .catch(()=>{
    error.innerText = "❌ Koneksi gagal";
  })
  .finally(()=>{
    btn.disabled = false;
    spinner.style.display = "none";
    text.style.display = "inline";
  });

}