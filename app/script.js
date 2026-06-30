
const URL = "https://script.google.com/macros/s/AKfycbzEbZA_c4QgOKqr-fHORL2PxErWUIVYMJOaw3E1yIagnqqwvm2xeZSA7zDiMgnYpgtD/exec";

let allData = [];
let loading = false;
let openedDetailId = null;
let lastDataHash = "";
let currentUser = localStorage.getItem("nama");

if (!currentUser) {
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", async function () {

  document.getElementById("app").style.display = "block";
  document.getElementById("namaUser").innerText = currentUser;


  loadHariIni();
  setInterval(() => {

  if(
    document.getElementById("inputPage")
      .classList.contains("active")
  ){
    loadHariIni();
  }

}, 3000);
});


function logout(){
  localStorage.clear();
  location.href = "../index.html";
}

function showPage(page){

  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));

  if(page === "input"){
    document.getElementById("inputPage").classList.add("active");
    loadHariIni();
  } 
  else if(page === "riwayat"){
    document.getElementById("riwayatPage").classList.add("active");
    loadRiwayat();
  }

  document.getElementById("menu").classList.remove("show");
}

function doPost(e) {
  return ContentService
    .createTextOutput(JSON.stringify(handleRequest(e)))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify(handleRequest(e)))
    .setMimeType(ContentService.MimeType.JSON);
}

function loadHariIni(){

  fetch(URL)
  .then(res=>res.json())
  .then(data=>{

    let today = formatDate(new Date());

    data = data.filter(d=>{

      let tgl = formatDate(d.timestamp);
      let status = (d.status || "").toUpperCase();

      if(
        status === "TERSEDIA" ||
        status === "DALAM_PERJALANAN" ||
        status === "TELAH_TIBA"
      ){
        return true;
      }

      if(status === "SELESAI"){
        return tgl === today;
      }

      return false;
    });

    data.sort((a,b)=>{

      if(a.status === "TERSEDIA" && b.status !== "TERSEDIA") return -1;
      if(a.status !== "TERSEDIA" && b.status === "TERSEDIA") return 1;

      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    let html = "";

	data.forEach((d,index)=>{
	  html += renderItem(d,index);
	});
	let newHash = JSON.stringify(data);

	if(newHash !== lastDataHash){

	  lastDataHash = newHash;

	  let openedId = openedDetailId;

	  document.getElementById("listHariIni").innerHTML =
		html || "Tidak ada pesanan";

	  if(openedId){

		setTimeout(()=>{

		  let detail =
			document.getElementById(
			  "detail" + openedId
			);

		  if(detail){

			detail.classList.add("show");
			openedDetailId = openedId;

		  }else{

			openedDetailId = null;
		  }

		},0);
	  }
	}
  });
}

function loadRiwayat(){

  fetch(URL)
  .then(res=>res.json())
  .then(data=>{

    let currentUser = localStorage.getItem("nama");

    allData = data.filter(d => d.kurir === currentUser);

    document.getElementById("tanggal").value = formatDate(new Date());

    filterTanggal();
  });
}

function filterTanggal(){

  let tanggal = document.getElementById("tanggal").value;
  let currentUser = localStorage.getItem("nama");

  let html = "";
  let totalKM = 0;

  let sorted = [...allData].sort((a,b)=>
    new Date(b.waktu_ambil) - new Date(a.waktu_ambil)
  );

  sorted.forEach(d=>{

    if(d.kurir !== currentUser) return;

    if(!d.waktu_ambil || d.waktu_ambil === "-") return;

    let tgl = formatDate(d.waktu_ambil);

    if(tgl === tanggal){

      html += renderItem(d);

      if(d.status === "SELESAI"){
        totalKM += Number(d.km) || 0;
      }
    }
  });

  document.getElementById("listRiwayat").innerHTML =
    html || "Tidak ada Riwayat";

  document.getElementById("totalKM").innerText = totalKM;
}

function renderItem(d, index){

  let currentUser = localStorage.getItem("username");

  let tombol = "";

  if(d.status === "TERSEDIA"){

    tombol += `
      <button onclick="event.stopPropagation(); ambil('${d.id}')">
  Ambil
</button>`;
  }

  else if(
    d.status === "DALAM_PERJALANAN" &&
    d.kurir === localStorage.getItem("nama")
  ){

    tombol += `
      <button onclick="event.stopPropagation(); batal('${d.id}')">
  Batal
</button>

      <button onclick="event.stopPropagation(); openSelesaiPopup('${d.id}')">
  Telah Tiba
</button>
    `;
  }

  return `
  <div class="pesananCard">

      <div
        class="pesananHeader"
        onclick="toggleDetail('${d.id}')"

        <div>

            <div>
                <span class="ruteText">
                  ${d.rute}
                </span>
                <span class="kmText">
                  ${d.km} KM
                </span>
              <span class="status ${d.status}">
                ${d.status} 
              </span>
            </div>
        <div class="timeTop">
          ${formatJamShort(d.timestamp)}
        </div>

        </div>

      </div>

    <div
        id="detail${d.id}"
        class="pesananDetail">
        <hr>
    <div class="detailTable">

      <div class="row">
        <span>Jenis</span>
        <span>: ${d.jenis || "-"}</span>
      </div>

      <div class="row">
        <span>Pemesan</span>
        <span>: ${d.pemesan || "-"}</span>
      </div>

      <div class="row">
        <span>Keterangan</span>
        <span>: ${d.ket_pesanan || "-"}</span>
      </div>

      <div class="row">
        <span>Kurir</span>
        <span>: ${d.kurir || "-"}</span>
      </div>

      <div class="row">
        <span>Diambil</span>
        <span>: ${
          d.waktu_ambil
          ? formatWaktu(d.waktu_ambil)
          : "-"
        }</span>
      </div>

      <div class="row">
        <span>Selesai</span>
        <span>: ${
          d.waktu_selesai
          ? formatWaktu(d.waktu_selesai)
          : "-"
        }</span>
      </div>

      <div class="row">
        <span>Parkir</span>
        <span>: ${d.parkir || "-"}</span>
      </div>

      ${
      d.ket_kurir
      ? `
        <div class="row">
          <span>Ket. Kurir</span>
          <span>: ${d.ket_kurir}</span>
        </div>
      `
      : ""
      }

    </div>

      <div class="btnArea">
        ${tombol}
      </div>
    </div>

  </div>
  `;
}

function renderKurir(d){
  if(!d.kurir || d.kurir === "-") return "";
  return `<p><b>Kurir: </b>${d.kurir}</p>`;
}

function renderWaktuAmbil(d){
  if(!d.waktu_ambil || d.waktu_ambil === "-") return "";
  return `<p><b>Di Ambil: </b>${formatWaktu(d.waktu_ambil)}</p>`;
}

function renderParkir(d){
  if(d.status !== "SELESAI" &&
  d.status !== "TELAH_TIBA") return "";
  return `<p><b>Parkir: </b>${d.parkir ? d.parkir : "-"}</p>`;
}

function renderWaktuSelesai(d){
  if(d.status !== "SELESAI" &&
  d.status !== "TELAH_TIBA") return "";
  return `<p><b>Selesai: </b>${formatWaktu(d.waktu_selesai)}</p>`;
}

function renderKetKurir(d){
  if(d.status !== "SELESAI" &&
  d.status !== "TELAH_TIBA") return "";
  return `<p><b>Ket. Kurir: </b>${d.ket_kurir || "-"}</p>`;
}

function formatWaktu(date){

  if(!date || date === "-" || date === ""){
    return "-";
  }

  let d = new Date(date);

  if(isNaN(d.getTime())) return "-";

  return d.toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatDate(date){
  let d = new Date(date);
  return d.toLocaleDateString("en-CA");
}


function toggleMenu(){
	document.getElementById("menu").classList.toggle("show");
	} 
	
	document.addEventListener("click", function(e){ let menu = document.getElementById("menu");
	if(!menu.contains(e.target) && !e.target.closest(".menuBtn")){ 
	menu.classList.remove("show");
	} });
	
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

function ambil(id){

  openedDetailId = id;

  let btn = event.target;

  setLoading(btn,true);

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"ambil",
      id:id,
      kurir:currentUser
    })
  })
  .then(()=>{
    loadHariIni();
  })
  .finally(()=>{
    setLoading(btn,false);
  });
}

function openSelesaiPopup(id){
  currentId = id;
  document.getElementById("popupSelesai").style.display = "flex";
}

function closePopup(){
  document.getElementById("popupSelesai").style.display = "none";
}

function submitSelesai(){

  openedDetailId = currentId;

  let ket =
    document.getElementById("inputKetKurir").value;

  let parkir =
    document.getElementById("inputParkir").value;

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"telahTiba",
      id:currentId,
      keterangan:ket,
      parkir:parkir
    })
  })
  .then(()=>{
    closePopup();
    loadHariIni();
  });
}

function batal(id){

  openedDetailId = id;

  let btn = event.target;

  setLoading(btn,true);

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"batal",
      id:id,
      kurir:localStorage.getItem("nama")
    })
  })
  .then(()=>{
    loadHariIni();
  })
  .finally(()=>{
    setLoading(btn,false);
  });
}

document.addEventListener("DOMContentLoaded", function(){
  generateParkir();
});

function generateParkir(){

  let select = document.getElementById("inputParkir");

  let html = `<option value="">Pilih Parkir</option>`;

  for(let i=0; i<=15; i++){
    html += `<option value="${i}">${i}</option>`;
  }

  select.innerHTML = html;
}

function setLoading(btn, state){
  if(!btn) return;

  if(state){
    btn.classList.add("loading");
    btn.disabled = true;
  } else {
    btn.classList.remove("loading");
    btn.disabled = false;
  }
}

function kirimLaporan(){

  let jenis = document.getElementById("jenisLaporan").value;
  let ket = document.getElementById("ketLaporan").value.trim();

  if(!jenis){
    alert("Pilih jenis laporan");
    return;
  }

  if(!ket){
    alert("Isi keterangan");
    return;
  }

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"kirimLaporan",
      jenis_laporan: jenis,
      keterangan: ket,
      pelapor: localStorage.getItem("nama")
    })
  })
  .then(res=>res.json())
  .then(res=>{

    if(res.status === "ok"){
      closeLaporan();
    }else{
      alert("Gagal kirim laporan");
    }

  })
  .catch(()=>{
    alert("Terjadi error");
  });
}

function openLaporan(){
  document.getElementById("popupLaporan").style.display = "flex";
}

function closeLaporan(){
  document.getElementById("popupLaporan").style.display = "none";

  document.getElementById("jenisLaporan").value = "";
  document.getElementById("ketLaporan").value = "";
}

function toggleDetail(id){

  let detail = document.getElementById("detail" + id);

  if(detail.classList.contains("show")){
    detail.classList.remove("show");
    openedDetailId = null;
    return;
  }

  document
    .querySelectorAll(".pesananDetail")
    .forEach(el=>el.classList.remove("show"));

  detail.classList.add("show");
  openedDetailId = id;
}

document.addEventListener("click", function(e){

  if(!e.target.closest(".pesananCard")){

    document
      .querySelectorAll(".pesananDetail")
      .forEach(el=>el.classList.remove("show"));

    openedDetailId = null;
  }

});
