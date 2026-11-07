// ==========================================================================
// CONFIGURASI UTAMA
// ==========================================================================
const CONFIG = {
  name: "Riska",
  pin: "061026",          
  date: "30 SEPTEMBER • THE MOST SPECIAL DAY",
  phoneNumber: "+62 82181377058", // Ganti dengan nomor WhatsApp kamu
  
  letter: `Hai, selamat ulang tahun ya!

Pertama-tama, aku mau ngucapin selamat ulang tahun buat kamu. Semoga di umur yang baru ini, kamu selalu dikasih kesehatan, kebahagiaan, dan semua hal yang lagi kamu impikan bisa satu-satu terwujud dengan baik.

Walaupun sekarang kita jarang banget ngobrol,aku tetep kagum sama kamu. Kamu adalah sosok yang hebat, baik, dan selalu punya cara sendiri buat bikin orang di sekitar kamu terkesan. 

Makasih banyak ya, karena pernah jadi bagian yang bikin hari-hari aku jadi lebih berwarna dan seru. Kehadiran kamu tuh ngebuat hidup aku lebih berwarna.

Harapanku sederhana aja, semoga kedepannya kita bisa lebih akrab lagi dan mungkin kamu bisa ngebuka hati buat aku ahay srepet. Enjoy your special day, ya`
};

const PHOTOS = [
  { src: "WhatsApp Image 2026-10-14 at 21.07.35.jpeg", caption: "Pesona yang Memukau" },
  { src: "WhatsApp Image 2026-11-02 at 17.23.01.jpeg", caption: "Lucu & Gemas" },
  { src: "WhatsApp Image 2026-10-13 at 12.12.53.jpeg", caption: "Cantik Tiada Tara" },
  { src: "WhatsApp Image 2026-10-18 at 23.24.50.jpeg", caption: "Aura Hangatmu" }
];

const PLAYLIST = [
  { title: "Monokrom", artist: "Tulus", src: "Tulus_-_Monokrom.mp3" },
  { title: "Perfect", artist: "Ed Sheeran", src: "Ed_Sheeran_-_Perfect.mp3" },
  { title: "Beautiful In White", artist: "Westlife", src: "Westlife_-_Beautiful_In_White.mp3" },
];

const REASONS = [
  "Walaupun kita jarang chatan, nama kamu tetep jadi salah satu yang paling sering aku inget.",
  "Setiap kali HP aku getar, jujur aku selalu ngarep itu dari kamu.",
  "Liat profil kamu lagi online aja kadang udah bikin senyum-senyum sendiri.",
  "Obrolan singkat kita akhir-akhir ini tetep bikin hariku jadi seru lagi.",
  "Meskipun komunikasi kita gaada, rasa kagumku tetep jalan terus.",
  "Seneng aja rasanya, walaupun kita lagi jarang ngobrol, aku dapet kesempatan buat ngerayain ulang tahun kamu."
];

const QUOTES = [
  "Kamu seperti bunga yang mekar di setiap musim.",
  "Melihatmu, hariku selalu berwarna.",
  "Setiap kelopak ini kupetik sambil menyebut namamu.",
  "Semoga tahunmu penuh harum yang indah."
];

const TIMELINE = [
  ["Titik Awal", "Pertemuan yang Tak Direncanakan - dan sejak itu hariku tidak pernah sama."],
  ["Getar Pertama", "Saat Rasa Kagum itu Diam-diam Tumbuh - Aku sadar kalo kayanya aku suka kamu deh."],
  ["Menunggu Sapaan", "Waktu-waktu di mana aku sering bolak-balik ngecek layar HP, berharap adanotifikasi chat dari kamu."],
  ["Harapan Baru", "Aku masih di sini, berharap bisa jadi seseorang yang spesial di hari-hari kamu."]
];

const $ = (id) => document.getElementById(id);

// ==========================================================================
// SOUND EFFECT "TADA" HADIAH (WEBAUDIO API BAWAAN)
// ==========================================================================
function playTadaSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const notes = [
      { f: 523.25, t: 0, d: 0.15 },    // C5
      { f: 659.25, t: 0.12, d: 0.15 }, // E5
      { f: 783.99, t: 0.24, d: 0.15 }, // G5
      { f: 1046.50, t: 0.38, d: 0.6 }   // C6 (Tada!)
    ];

    notes.forEach(n => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);

      gain.gain.setValueAtTime(0, ctx.currentTime + n.t);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + n.t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + n.t);
      osc.stop(ctx.currentTime + n.t + n.d);
    });
  } catch (e) {
    console.log("Audio FX error:", e);
  }
}

// ==========================================================================
// EFEK PARTIKEL SALJU SELURUH FRAME
// ==========================================================================
function initGlobalSnow() {
  const container = $('snow-container');
  const snowFlakes = ['❄', '`', '❆', '•'];
  for (let i = 0; i < 35; i++) {
    const flake = document.createElement('span');
    flake.className = 'snowflake';
    flake.textContent = snowFlakes[Math.floor(Math.random() * snowFlakes.length)];
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = (Math.random() * 5 + 5) + 's';
    flake.style.animationDelay = (Math.random() * 5) + 's';
    flake.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
    flake.style.opacity = Math.random() * 0.7 + 0.3;
    container.appendChild(flake);
  }
}
initGlobalSnow();

// 1. Tampilan Awal Loading
setTimeout(() => {
  $('load').classList.add('fade-out');
  setTimeout(() => {
    $('load').hidden = true;
    $('lock').hidden = false;
    $('lock').classList.add('fade-in');
  }, 400);
}, 1800);

// 2. Logika Keypad PIN 6 DIGIT
let enteredCode = "";
const pad = $('pad');
const dots = $('dots');
const lockSubtitle = document.querySelector('#lock .soft');

'123456789'.split('').concat(['⌫', '0', '✓']).forEach((key) => {
  const btn = document.createElement('button');
  btn.textContent = key;
  if (key === '✓') btn.className = 'ok';
  
  btn.onclick = () => {
    if (key === '⌫') {
      enteredCode = enteredCode.slice(0, -1);
    } else if (key === '✓') {
      if (enteredCode === CONFIG.pin) {
        $('lock').classList.add('fade-out');
        setTimeout(() => {
          $('lock').hidden = true;
          $('gift').hidden = false;
          $('gift').classList.add('fade-in');
        }, 400);
      } else {
        lockSubtitle.textContent = "tanggal kamu bales chat aku";
        lockSubtitle.style.color = "#ff9ec0";
        dots.classList.add('shake');
        setTimeout(() => dots.classList.remove('shake'), 400);
        enteredCode = "";
      }
    } else if (enteredCode.length < 6) {
      enteredCode += key;
    }
    
    Array.from(dots.children).forEach((dot, idx) => {
      dot.className = idx < enteredCode.length ? 'on' : '';
    });
  };
  pad.appendChild(btn);
});

// 3. Logika Buka Hadiah & Efek "Tada" Sound
$('gb').onclick = () => {
  playTadaSound();
  
  const burstContainer = $('burst');
  const items = ['💙', '🎉', '🌸', '💎', '⭐'];
  for (let i = 0; i < 22; i++) {
    const span = document.createElement('span');
    span.textContent = items[i % items.length];
    span.style.left = Math.random() * 90 + 'vw';
    span.style.top = Math.random() * 85 + 'vh';
    span.style.animationDelay = Math.random() * 0.6 + 's';
    burstContainer.appendChild(span);
  }
  setTimeout(() => { burstContainer.innerHTML = ''; }, 3200);

  setTimeout(() => {
    $('gift').classList.add('fade-out');
    setTimeout(() => {
      $('gift').hidden = true;
      $('main').hidden = false;
      $('main').classList.add('fade-in');
      loadSong(0); 
    }, 400);
  }, 1400);
};

// 4. Nyalakan Lilin Kue
$('cake').onclick = function() {
  this.classList.toggle('lit');
};

// 5. Modal Surat
$('lt').onclick = () => {
  const paper = $('lp');
  paper.innerHTML = `<h3>${CONFIG.name},</h3>`;
  CONFIG.letter.split(/\n+/).forEach(paragraph => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    paper.appendChild(p);
  });
  $('lm').hidden = false;
};

$('lm').onclick = function(e) {
  if (e.target === this) this.hidden = true;
};

// 6. Buket Bunga Digital & Partikel Kelopak Bunga
let quoteIndex = 0;
const spawnPetals = () => {
  const container = $('petal-container');
  const petals = ['🌸', '🌹', '🌷', '🌺', '✨'];
  for (let i = 0; i < 12; i++) {
    const petal = document.createElement('span');
    petal.className = 'petal-particle';
    petal.textContent = petals[Math.floor(Math.random() * petals.length)];
    
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 30;
    
    petal.style.setProperty('--tx', `${x}px`);
    petal.style.setProperty('--ty', `${y}px`);
    
    container.appendChild(petal);
    setTimeout(() => petal.remove(), 1200);
  }
};

const pickFlower = () => {
  $('bq').textContent = QUOTES[quoteIndex++ % QUOTES.length];
  $('vase').textContent = ['💐', '🌷', '🌻', '🌹'][quoteIndex % 4];
  spawnPetals();
};

$('bp').onclick = pickFlower;
$('vase').onclick = pickFlower;

// 7. Galeri Foto Polaroid
const memContainer = $('mem');
memContainer.innerHTML = '';

PHOTOS.forEach((photo, idx) => {
  const card = document.createElement('div');
  card.className = 'pol';
  card.style.setProperty('--r', (idx % 2 ? 2 : -2) + 'deg');

  card.innerHTML = `
    <div class="ph-wrapper">
      <img src="${photo.src}" alt="${photo.caption}" class="ph-img blurred">
      <div class="ph-overlay">
        <span><br>Ketuk untuk melihat fotonya</span>
      </div>
    </div>
    <p>${photo.caption}</p>
  `;

  card.onclick = () => {
    const img = card.querySelector('.ph-img');
    const overlay = card.querySelector('.ph-overlay');
    if (img.classList.contains('blurred')) {
      img.classList.remove('blurred');
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  };

  memContainer.appendChild(card);
});

// 8. Timeline Perjalanan Pendekatan
TIMELINE.forEach(item => {
  const div = document.createElement('div');
  div.className = 'ti';
  div.innerHTML = `<b>${item[0]}</b><span class="soft">${item[1]}</span>`;
  $('tl').appendChild(div);
});

// 9. Toples Catatan Bersyukur & Partikel Salju Bulat
let reasonIndex = 0;
const spawnJarSnow = () => {
  const container = $('jar-snow-container');
  const snowSymbols = ['❄', '⚪', '•', '`'];
  for (let i = 0; i < 15; i++) {
    const snow = document.createElement('span');
    snow.className = 'jar-snow-particle';
    snow.textContent = snowSymbols[Math.floor(Math.random() * snowSymbols.length)];
    
    const x = (Math.random() - 0.5) * 120;
    const y = -Math.random() * 90 - 20;
    
    snow.style.setProperty('--tx', `${x}px`);
    snow.style.setProperty('--ty', `${y}px`);
    
    container.appendChild(snow);
    setTimeout(() => snow.remove(), 1000);
  }
};

$('jb').onclick = () => {
  const jar = $('jar');
  jar.classList.remove('shake');
  void jar.offsetWidth;
  jar.classList.add('shake');
  spawnJarSnow();
  setTimeout(() => {
    $('jn').textContent = REASONS[reasonIndex++ % REASONS.length];
  }, 350);
};

// 10. LOGIKA MUSIC PLAYER 
const audio = $('audio-player');
let currentSongIndex = 0;
let isPlaying = false;

function renderPlaylist() {
  const playlistContainer = $('playlist-list');
  playlistContainer.innerHTML = '';
  PLAYLIST.forEach((song, idx) => {
    const item = document.createElement('div');
    item.className = `playlist-item ${idx === currentSongIndex ? 'active' : ''}`;
    item.innerHTML = `<span><b>${idx + 1}. ${song.title}</b> - ${song.artist}</span> <span>🎵</span>`;
    item.onclick = () => {
      currentSongIndex = idx;
      loadSong(currentSongIndex);
      playSong();
    };
    playlistContainer.appendChild(item);
  });
}

function loadSong(index) {
  const song = PLAYLIST[index];
  $('song-title').textContent = song.title;
  $('song-artist').textContent = song.artist;
  audio.src = song.src;
  renderPlaylist();
}

function playSong() {
  isPlaying = true;
  audio.play().catch(e => console.log("Audio play blocked:", e));
  $('play-btn').textContent = '⏸';
  $('disc').classList.add('playing');
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  $('play-btn').textContent = '▶';
  $('disc').classList.remove('playing');
}

$('play-btn').onclick = () => {
  if (isPlaying) pauseSong();
  else playSong();
};

$('prev-btn').onclick = () => {
  currentSongIndex = (currentSongIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
  loadSong(currentSongIndex);
  playSong();
};

$('next-btn').onclick = () => {
  currentSongIndex = (currentSongIndex + 1) % PLAYLIST.length;
  loadSong(currentSongIndex);
  playSong();
};

audio.onended = () => {
  $('next-btn').click();
};

// 11. LOGIKA WHATSAPP REDIRECT
$('wa-btn').onclick = () => {
  const message = encodeURIComponent("Makasih Sya");
  window.open(`https://wa.me/${CONFIG.phoneNumber}?text=${message}`, '_blank');
};