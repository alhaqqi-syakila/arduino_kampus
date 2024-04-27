const container = document.querySelector('.status-container');
const statusCondition = document.querySelector('.status-condition');
const lockIcon = document.querySelector('.fa-lock');


const ws = new WebSocket('ws://localhost:8080'); // ganti dengan alamat IP server yang benar

// menghandle pesan dari arduino
ws.onmessage = (event) => {
  const status = event.data; // menerima data unlock/lock dari arduino
  if (status === "UNLOCKED") {
    isUnlocked = true;
  } else if (status === "LOCKED") {
    isUnlocked = false;
  }
  updateLockIcon(); // update ikon berdasarkan status perangkat
};

// inisialisasi variable kondisi
let isUnlocked = false;
let statusLock = '';

// membuat teks status dari kondisi perangkat saat ini
function statusText(){
    if(isUnlocked){
        statusLock = 'UNLOCKED'
    }else{
        statusLock = 'LOCKED'
    }
    return statusLock;
}

// update ikon sesuai dengan status perangkat 
function updateLockIcon() {
  if (isUnlocked) {
    statusCondition.textContent = 'Unlocked';
    lockIcon.classList.remove('fa-lock');
    lockIcon.classList.add('fa-unlock');
  } else {
    statusCondition.textContent = 'Locked';
    lockIcon.classList.remove('fa-unlock');
    lockIcon.classList.add('fa-lock');
  }
}

updateLockIcon();

// Toggle kondisi lock/unlock saat container diklik
container.addEventListener('click', () => {
  // update kondisi
  isUnlocked = !isUnlocked;
  if (isUnlocked) {
    container.classList.add('unlocked');
  } else {
    container.classList.remove('unlocked');
  }
  updateLockIcon();
});


const logContainer = document.getElementById('log-container');

//  Membuat log dan mengirimkan pesan dari kondisi perangkat
function createLogEntry(message) {
  // membuat div elemen baru untuk log
  const logEntry = document.createElement('div');
  // menambahkan class ke dalam elemen log
  logEntry.classList.add('log');
  // menambahkan text konten ke dalam elemen log
  logEntry.textContent = message;
  return logEntry;
}
// ketika dikllik maka mengirimkan pesan berupa waktu perubahan status perangkat dan juga status perangkat
container.addEventListener('click', () => {
  // membuat variable yang mengambil waktu lokal
  const timestamp = new Date().toLocaleString();
  // membuat pesan log berisi waktu dan status
  const message = `${timestamp} : KEY ${statusText()}`;
  // memasukkan pesan log ke dalam container log
  const logMessage = createLogEntry(message);
  // log terbaru akan selalu muncul paling atas
  logContainer.insertBefore(logMessage, logContainer.firstChild);
});

console.log(statusText())



















// #include <Serial.h>

// void setup() {
//   Serial.begin(9600); // Set baud rate for serial communication

//   // Define and initialize digital pins for buttons
//   const int unlockedButtonPin = 2;
//   const int lockedButtonPin = 3;

//   pinMode(unlockedButtonPin, INPUT);
//   pinMode(lockedButtonPin, INPUT);
// }

// void loop() {
//   // Read the state of the buttons
//   int unlockedButtonState = digitalRead(unlockedButtonPin);
//   int lockedButtonState = digitalRead(lockedButtonPin);

//   // Check button states and send messages accordingly
//   if (unlockedButtonState == HIGH) {
//     Serial.println("UNLOCKED"); // Send "UNLOCKED" when unlocked button is pressed
//   } else if (lockedButtonState == HIGH) {
//     Serial.println("LOCKED"); // Send "LOCKED" when locked button is pressed
//   }
// }
