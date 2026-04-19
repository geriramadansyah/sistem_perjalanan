const URL = "https://script.google.com/macros/s/AKfycbx6ODbk7T9rK40UrJAUDlK7LLEePgVdONfV_FzQ9hXJ0C3zWm6iGyFFdFn0c-7saYA5/exec";

let currentUser = localStorage.getItem("nama");
let selectedId = "";
let loadingAmbil = {};
if(!currentUser){
  location.href = "index.html";
}

let dataGlobal = [];
let menu = "pesanan";
let tab = "jalan";
let removedIds = new Set();

document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("namaKurir").innerText = currentUser;

  setMenu("pesanan");
  setTab("jalan");

  loadDataRealtime();
});

function loadDataRealtime(){
  loadData();
  setInterval(loadData, 3000);
}

function loadData(){
  fetch(URL)
  .then(res=>res.json())
  .then(data=>{
    dataGlobal = data.filter(d => !removedIds.has(d.id));

    dataGlobal.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp));

    render();
  })
  .catch(err=>{
    console.log("ERROR LOAD:", err);
  });
}

function setMenu(m){
  menu = m;

  document.getElementById("btnPesanan").classList.toggle("active", m==="pesanan");
  document.getElementById("btnDiambil").classList.toggle("active", m==="diambil");

  document.getElementById("tabDiambil").style.display =
    (m==="diambil") ? "flex" : "none";

  document.getElementById("tanggalFilter").value = "";
  document.getElementById("totalKM").innerText = "";
  
  render();
}

function setTab(t){
  tab = t;

  document.getElementById("btnJalan").classList.toggle("active", t==="jalan");
  document.getElementById("btnSelesai").classList.toggle("active", t==="selesai");

  render();
}

function render(){

  let filterBar = document.getElementById("filterBar");
  let totalKMEl = document.getElementById("totalKM");

  if(filterBar) filterBar.style.display = "none";
  if(totalKMEl) totalKMEl.innerText = "";

  let html = "";

  if(menu === "pesanan"){

    let tersedia = dataGlobal.filter(d => d.status === "TERSEDIA");
    let diambilOrang = dataGlobal.filter(d =>
      d.status === "DALAM_PERJALANAN" && d.kurir !== currentUser
    );

    if(tersedia.length === 0 && diambilOrang.length === 0){
      html = `<div class="card">Tidak ada pesanan</div>`;
    }

    tersedia.forEach(d=>{
      html += `
      <div class="card">
        <div class="timeTop">${formatJamShort(d.timestamp)}</div>

        <i>${d.jenis} Ke: </i><b>${d.rute} (${d.km} KM)</b><br>
        <i>Pemesan: </i><b>${d.purchasing}</b><br>
        <i>Keterangan Pesanan: </i> ${d.ket_pesanan || "-"}<br><br>

        <button onclick="ambil('${d.id}')" id="btn-${d.id}">
          <span id="text-${d.id}">Ambil</span>
          <span id="spin-${d.id}" class="spinner"></span>
        </button>
      </div>`;
    });

    diambilOrang.forEach(d=>{
      html += `
      <div class="card disabled">
        <div class="timeTop">${formatJamShort(d.timestamp)}</div>

        <i>${d.jenis} Ke: </i><b>${d.rute} (${d.km} KM)</b><br>
        <i>Pemesan: </i><b>${d.purchasing}</b><br>
        <i>Keterangan Pesanan: </i> ${d.ket_pesanan || "-"}<br>
        <i>Di Ambil:</i> ${formatWaktu(d.waktu_ambil)}<br>
        <i>Kurir:</i> <b>${d.kurir}</b>
      </div>`;
    });
  }

  if(menu === "diambil"){

    if(tab === "jalan"){

      let jalan = dataGlobal.filter(d =>
        d.kurir === currentUser &&
        d.status === "DALAM_PERJALANAN"
      );

      if(jalan.length === 0){
        html = `<div class="card">Tidak ada pesanan berjalan</div>`;
      }

      jalan.forEach(d=>{
        html += `
        <div class="card">
          <div class="timeTop">${formatJamShort(d.timestamp)}</div>

          <i>${d.jenis} Ke: </i><b>${d.rute} (${d.km} KM)</b><br>
          <i>Pemesan: </i><b>${d.purchasing}</b><br>
     
          <i>Keterangan Pesanan:</i> ${d.ket_pesanan || "-"}<br>
          <i>Di Ambil:</i> ${formatWaktu(d.waktu_ambil)}<br><br>

          <button onclick="showPopup('${d.id}')">Selesai</button>
          <button onclick="batal('${d.id}')">Batal</button>
        </div>`;
      });
    }

    if(tab === "selesai"){

      if(filterBar) filterBar.style.display = "flex";

      let tanggal = document.getElementById("tanggalFilter").value;

      let selesai = dataGlobal.filter(d =>
        d.kurir === currentUser &&
        d.status === "SELESAI"
      );

      if(tanggal){
        selesai = selesai.filter(d=>{
          let tgl = new Date(d.waktu_ambil).toLocaleDateString("en-CA");
          return tgl === tanggal;
        });
      }

      let totalKM = 0;

      if(selesai.length === 0){
        html = `<div class="card">Belum ada pesanan selesai</div>`;
      }

      selesai.forEach(d=>{
        totalKM += d.km;

        html += `
        <div class="card">
          <div class="timeTop">${formatJamShort(d.timestamp)}</div>
		  <i>${d.jenis} Ke: </i>
          <b>${d.rute} (${d.km} KM)</b><br>
          <i>Pemesan : </i><b>${d.purchasing}</b><br>
         
          <i>Keterangan Pesanan:</i> ${d.ket_pesanan || "-"}<br>
          <i>Di Ambil:</i> ${formatWaktu(d.waktu_ambil)}<br>
          <i>Selesai:</i> ${formatWaktu(d.waktu_selesai)}<br>
          <i>Keterangan Saya:</i> ${d.ket_kurir || "-"}<br>
          <i>Parkir:</i> ${d.parkir || 0}
        </div>`;
      });

      document.getElementById("totalKM").innerText = "Total KM: " + totalKM;
    }
  }

  document.getElementById("content").innerHTML = html;
}

function ambil(id){

  if(loadingAmbil[id]) return;
  loadingAmbil[id] = true;

  let text = document.getElementById(`text-${id}`);
  let spin = document.getElementById(`spin-${id}`);
  let btn  = document.getElementById(`btn-${id}`);

  if(text) text.innerText = "...";
  if(spin) spin.style.display = "inline-block";
  if(btn) btn.disabled = true;

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"ambil",
      id:id,
      kurir:currentUser
    })
  })
  .then(res=>res.json())
  .then(res=>{

    if(res.status === "ok"){
      loadData(); 
    }else{
      alert("Pesanan sudah diambil kurir lain!");
    }

  })
  .catch(()=>{
    alert("Terjadi error koneksi!");
  })
  .finally(()=>{
    loadingAmbil[id] = false;

    if(text) text.innerText = "Ambil";
    if(spin) spin.style.display = "none";
    if(btn) btn.disabled = false;
  });
}

function batal(id){
  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"batal",
      id:id
    })
  }).then(loadData);
}

function showPopup(id){
  selectedId = id;

  document.getElementById("inputKet").value = "";
  document.getElementById("inputParkir").value = "";

  document.getElementById("popup").style.display = "flex";
}

function formatWaktu(date){
  let d = new Date(date);
  if(isNaN(d)) return "-";

  return d.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function closePopup(){
  document.getElementById("popup").style.display = "none";
}

function logout(){
  localStorage.clear();
  location.href = "index.html";
}

function submitSelesai(){

  let ket = document.getElementById("inputKet").value || "-";
  let parkir = document.getElementById("inputParkir").value || 0;

  let text = document.getElementById("textSubmit");
  let spin = document.getElementById("spinSubmit");
  let btn  = document.getElementById("btnSubmit");

  text.innerText = "";
  spin.style.display = "inline-block";
  btn.disabled = true;

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"selesai",
      id:selectedId,
      keterangan:ket,
      parkir:parkir
    })
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.status === "ok"){
      closePopup();
      loadData();
    }else{
      alert("Gagal menyimpan!");
    }
  })
  .catch(()=>{
    alert("Error koneksi!");
  })
  .finally(()=>{
    text.innerText = "Simpan";
    spin.style.display = "none";
    btn.disabled = false;
  });
}

function formatJamShort(date){

  if(!date || date === "-" || date === "") return "-";

  let d = new Date(date);
  if(isNaN(d)) return "-";

  let jam = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit"
  });

  let tgl = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short"
  });

  return jam + " " + tgl;
}
