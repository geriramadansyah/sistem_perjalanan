const URL = "https://script.google.com/macros/s/AKfycbzc7YI8_v6i8XR-dOshBESSgehdMEbwxgPPE1EjBE1dvHPL6Ed5Xyc2rs6d2e_8No1S/exec";

function login(){

  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  let btn = document.getElementById("btnLogin");
  let error = document.getElementById("errorMsg");

  if(!username || !password){
    error.innerText = "Harap isi semua field";
    return;
  }

  btn.disabled = true;
  btn.classList.add("loading");
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

      window.location.href = "app/app.html";

    }else{
      error.innerText = "ID atau Password salah";
    }

  })
  .catch(()=>{
    error.innerText = "Koneksi gagal";
  })
  .finally(()=>{
  btn.disabled = false;
  btn.classList.remove("loading");
  });

}