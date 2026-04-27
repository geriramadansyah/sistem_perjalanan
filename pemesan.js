const dataRute = [
["278",18], ["AA MART",14], ["ABBIYU",30], ["Adam Katering",19], ["Adima Dwi Tunggal / ADJ",36], ["ASN",3], ["AFCO AYAM",8], ["Agen Telut Rafi",1], ["AKENA PLASTIK",2], ["ANDES",16], ["Andyan Gorust",8], ["Aneka Jaya Printing",8], ["Antilop",9], ["APM Frozen",8], ["Ario",4], ["ARTHA CATHERING",22], ["ASF KG",22], ["ASF MGC",17], ["Atu Ua Iga",29], ["AYAM JALU BOILER",9], ["Babeh Tongseng",15], ["Baking Story",5], ["Bakukita Galaxy",2], ["Bakukita Rawalumbu",7], ["Balik Arah",2], ["BAROKAH MANDIRI BEEF",12], ["Baron",26], ["BCA",3], ["BCA Plastik",2], ["Bebek Joss",40], ["Bels Mart",1], ["BERKAH LESTARI",10], ["Bintang Lia Catering",22], ["BIRO PROVOS POLRI",24], ["BOGA JAYA GEMILANG",14], ["BOILER AYAM",2], ["Brother Chicken",25], ["Bu Dhadi",6], ["BUDS CHICKEN",2], ["Bellsmart",1], ["Chef Wangsa HERMOSA",44], ["Chicken Country",6], ["CIK CIK",33], ["CLEOPATRA HOUSE",9], ["COLUMBIA WAREHOUSE",25], ["Communal",9], ["CUP JATINEGARA",20], ["Dadar Shop",5], ["Daffi Frozen",25], ["Darmi",14], ["De Supplies",8], ["DELVI KITCHEN",3], ["DEMEN JAJAN SERBUK",14], ["DEMINIMALIST",6], ["Dianti BRI",10], ["Dikta",43], ["Dousepath",2], ["DPP",5], ["Dubai Ocean",38], ["Elang Frozen",7], ["Ellyana Residence",7], ["Elysium",24], ["Ezra Cafe",2], ["FJA",14], ["Flowey SCBD",23], ["Flowey Sentul",45], ["FOTOCOPY GALAXY",1], ["Frozen Lussy",16], ["Frozenology",9], ["Gandoang",25], ["Gastro Hnur",32], ["GKBR AGUS SALIM",10], ["GOODYBAG BINTARA",9], ["GRIYA JATISARI JAKASAMPURNA",7], ["Gudang Stek 21",30], ["Hangout Salihara",23], ["Harmuni Catering",5], ["Harto Ayam",2], ["Helios",45], ["HEMA",4], ["Hermina Jatinegara",19], ["Hermosa",45], ["Hijrah Food",2], ["Hokindo / Srikandi",5], ["Home Bu Ani",17], ["HOME CHEF JHONY",3], ["Home Mba Adinda",4], ["HOME PAK BOY",3], ["HOME PAK HERMAN",4], ["HOME PAK MURING",5], ["HOME SAUDARA MBA TUTI",2], ["House Point",3], ["Ibu Ainun",3], ["IBU AYU",1], ["IBU DHADI",4], ["IBU INA CONDET",16], ["IBU MIMI DWI",53], ["IBU RARA DANAMON",25], ["IBU TIWI",4], ["Ina Condet",16], ["Interaksi Bekasi",1], ["Interaksi Depok",30], ["Iqbal Seafood",39], ["IRVAN BINTARO",41], ["JEDA KOPI",6], ["Jl Medan Raya Pak Gimen",9], ["JNE",6], ["JNT",2], ["Joelle",22], ["Joglo Printing",8], ["Joinhead",18], ["Joni Steak",28], ["Juwita Frozen",4], ["Kaboga Catering",18], ["KANTOR PAJAK",7], ["Karunia Catering",22], ["Kawan Lama",30], ["Kei Sushi",2], ["KGI KITCHEN",27], ["KGI OFFICE BANGKA",22], ["KIARA HOME",1], ["KOPI TALA",2], ["KOPIERTE CAFE",2], ["KOZI RAMEN",2], ["Kuka Meat Shop",3], ["Laila Frozen",9], ["Lestari Pangkalan 1",8], ["Lestari Cipendawa",4], ["Lotus Garden",1], ["Lusi Frozen",36], ["MANDAYA",40], ["Mantra",46], ["Mas Brewok Lenteng Agung",22], ["Matea Bekasi",3], ["Matea Cempaka Putih",22], ["Matea Blok M",25], ["Matea Puncak",59], ["MEAT ME",27], ["Meat Town",2], ["Menara 1 Kelapa Gading",22], ["Midisindo",13], ["MITLOIN JATIBENING",6], ["MITLOIN PANCORAN",19], ["MITLOIN PANCORAN BUNCIT",24], ["MNF",2], ["Mpok Judes",34], ["MSN",36], ["MTH 37 OFFICE",16], ["MTL",3], ["NGI",9], ["Nolda Pocha",42], ["NAS",10], ["Obi Yakimono",9], ["OCEAN",39], ["Oje Steak",7], ["Omah Bara",37], ["OMG",15], ["Pak Angga",8], ["PAK ATE",7], ["Pakis",2], ["Panglima Chicken",14], ["PASAR BARU BEKASI",10], ["PASAR KECAPI",9], ["PASAR Jatiasih",2], ["Pasar Kranji",7], ["PHBB",6], ["PHBT",10], ["PHBU",12], ["PML",2], ["PNP Gading",22], ["PNP Greenville",32], ["Ponyo",8], ["Primachef",6], ["PRINTING GALAXY",2], ["Prompt",14], ["PSY BINTARO",39], ["PT Estika",18], ["PT Indo Jaya Food",18], ["PT PANGANSARI",20], ["PT SIP",20], ["PT Bintang Lia Catering",22], ["PT SRI PARPOSTEL",7], ["PUKIS KOTA BARU SUNTER",29], ["PURI KRANJI REGENCY",7], ["PURNAMA ALAM",27], ["Putri Kembar",56], ["Qisty",11], ["Ratu Daging",9], ["RAU",10], ["RDN",3], ["Ridho",8], ["RJB",5], ["RMB",6], ["RSI Muara Angke",38], ["Ruko Festival",11], ["Ruko Festival Steak 21",12], ["Ruko RSK",2], ["Rumah Bang Angky",5], ["Rumah Mas Adhi",3], ["Rumah Bang Jendra",8], ["Rumah Bu Ina",16], ["Saidi MAHACHANUM",36], ["Salmonku",34], ["Sarana Inti Pangan",20], ["Sasuki Home",2], ["SAU",18], ["SCOTLATE FREEZER",3], ["Segar Mulia",50], ["Sentra Daging Kemang",4], ["SERBUK TANGSEL",40], ["Setia Jaya",1], ["Shamrock",20], ["Simeta",3], ["SIMETRI",8], ["Sinyo Groceries",12], ["SIP",20], ["Situ Cafe",10], ["SM AYAM",14], ["Steak 21 HI",13], ["STEAK WITH U",3], ["STEROFOAM RAWALUMBU",6], ["Sudo Brew",16], ["Sujudi",34], ["SUKIBRAY",1], ["SUKIBRAY CIKUNIR",3], ["Sukibray Home",3], ["Sukibray Resto",2], ["SUTEKI",2], ["TELU STEAK",2], ["TENGGIRI JAKUT",36], ["Tens Mart",12], ["Tiga Dara Ayam",12], ["Tinta Print",4], ["TJM",35], ["Toko Buku",2], ["TOKO DAGING MESIN",10], ["TOKO IRWAN PLASTIK",2], ["Toko Kue Kartika",30], ["Tuna Jaya Makmur",35], ["UMARA",27], ["Uniko Cibubur",17], ["UNIVERS",25], ["WARNA MEDIA",7], ["WAROENG DIGITAL",2], ["WAYANG BISTRO",21], ["Wiens Food",7], ["WIRA JATIASIH",7], ["WPU",20], ["WTT",1], ["Yantira",10], ["YOSHI RAMEN",2],["Berkat Kranji",7],["Irwan Plastik 2",2]];


const URL = "https://script.google.com/macros/s/AKfycbx6ODbk7T9rK40UrJAUDlK7LLEePgVdONfV_FzQ9hXJ0C3zWm6iGyFFdFn0c-7saYA5/exec";

let allData = [];
let loading = false;

let currentUser = localStorage.getItem("nama");

if(!currentUser){
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function(){

  document.getElementById("app").style.display = "block";

  document.getElementById("namaUser").innerText = currentUser;

  initAutocomplete();
  loadHariIni();

  setInterval(()=>{
    loadHariIni();
  },3000);
});

function logout(){
  localStorage.clear();
  location.href = "index.html";
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

function initAutocomplete(){

  const inputRute = document.getElementById("rute");
  const suggestionBox = document.getElementById("suggestions");

  inputRute.addEventListener("input", function(){

    let val = this.value.toLowerCase();
    suggestionBox.innerHTML = "";

    if(val === "") return;

    let filtered = dataRute.filter(d =>
      d[0].toLowerCase().startsWith(val)
    );

    filtered.forEach(d=>{
      let div = document.createElement("div");
      div.textContent = d[0];

      div.onclick = function(){
        inputRute.value = d[0];
        document.getElementById("km").value = d[1];
        suggestionBox.innerHTML = "";
      };

      suggestionBox.appendChild(div);
    });
  });
}

function kirim(){

  if(loading) return;

  let ruteVal = document.getElementById("rute").value.trim();
  let kmVal = document.getElementById("km").value;

  if(!ruteVal){
    showPopup("❌ Rute wajib dipilih!");
    return;
  }

  if(!kmVal){
    showPopup("❌ KM tidak valid!");
    return;
  }

  loading = true;

  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"tambah",
      rute: ruteVal,
      km: kmVal,
      jenis: jenis.value,
      keterangan: ket.value,
      purchasing: currentUser
    })
  })
  .then(()=>{
    showPopup("✅ Pesanan berhasil dikirim");

    document.getElementById("rute").value = "";
    document.getElementById("km").value = "";
    document.getElementById("ket").value = "";

    loadHariIni();
  })
  .finally(()=>{
    loading = false;
  });
}

function loadHariIni(){

  fetch(URL)
  .then(res=>res.json())
  .then(data=>{

    let today = formatDate(new Date());

    data.sort((a,b)=> new Date(b.timestamp) - new Date(a.timestamp));

    allData = data;

    let html = "";

    data.forEach(d=>{

      if(d.purchasing !== currentUser) return;

      let tgl = formatDate(d.timestamp);

      if(tgl === today){
        html += renderItem(d);
      }
    });

    document.getElementById("listHariIni").innerHTML =
      html || "Tidak ada pesanan hari ini";
  });
}

function loadRiwayat(){

  fetch(URL)
  .then(res=>res.json())
  .then(data=>{
    allData = data;

    document.getElementById("tanggal").value = formatDate(new Date());
    filterTanggal();
  });
}

function filterTanggal(){

  let tanggal = document.getElementById("tanggal").value;

  let html = "";
  let sorted = [...allData].sort((a,b)=>
    new Date(b.waktu_ambil) - new Date(a.waktu_ambil)
  );
  sorted.forEach(d=>{

    if(d.purchasing !== currentUser) return;

    let tgl = formatDate(d.waktu_ambil);

    if(tgl === tanggal){
      html += renderItem(d);
    }
  });

  document.getElementById("listRiwayat").innerHTML =
    html || "Tidak ada Riwayat";
}

function renderItem(d){

  return `
  <div style="position:relative">

    <!-- WAKTU POJOK KANAN -->
    <div style="
      position:absolute;
      top:10px;
      right:10px;
      font-size:12px;
      color:#888;
    ">
      ${formatJamShort(d.timestamp)}
    </div>

    <h3> Rute ${d.rute} (${d.km} KM)</h3>

    <span class="status ${d.status}">
      ${d.status}
    </span>

    <p>🚚 ${d.jenis}</p>
    <p>keterangan: ${d.ket_pesanan || "-"}</p>
    <p>🏍 Kurir: ${d.kurir}</p>

    <p>🅿️ Parkir: ${
      d.status === "SELESAI"
        ? (d.parkir ? d.parkir : "-")
        : "-"
    }</p>

    <p>📝 Ket. Kurir: ${d.ket_kurir || "-"}</p>
    <p>⏱️ Ambil: ${formatWaktu(d.waktu_ambil)}</p>
    <p>✅ Selesai: ${formatWaktu(d.waktu_selesai)}</p>

    ${d.status === "TERSEDIA"
      ? `<button onclick="hapus('${d.id}')">❌ Batal</button>`
      : ""}
  </div>`;
}

function hapus(id){
  fetch(URL,{
    method:"POST",
    body:JSON.stringify({
      action:"hapus",
      id:id
    })
  }).then(loadHariIni);
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

function showPopup(text){
  document.getElementById("popupText").innerText = text;
  let popup = document.getElementById("popup");
  popup.style.display = "flex";

  setTimeout(()=>{
    popup.style.display = "none";
  }, 2000); 
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
