class Passenger {
  constructor(bookingId, seatNo) {
    this.bookingId = bookingId.trim();
    this.seatNo = seatNo.toLowerCase(); 
  }
}

function parseSeat(seatNo) {
  const match = seatNo.match(/^([a-d])([1-9]\d?)$/i);
  if (!match) throw new Error("Invalid seat number: " + seatNo);
  return [match[1].toLowerCase(), parseInt(match[2], 10)];
}

function generateBoardingSequence(passengerList) {
  const seatPriority = { a: 1, d: 2, b: 3, c: 4 };
  return [...passengerList].sort((p1, p2) => {
    const [seat1, row1] = parseSeat(p1.seatNo);
    const [seat2, row2] = parseSeat(p2.seatNo);
    if (row1 !== row2) return row2 - row1;
    return seatPriority[seat1] - seatPriority[seat2];
  });
}


const bookingForm = document.getElementById("bookingForm");
const messageEl = document.getElementById("message");
const passengerListEl = document.getElementById("passengerList");
const boardingTableBody = document.querySelector("#boardingTable tbody");

const passengers = [];

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const bookingId = document.getElementById("bookingId").value.trim();
  const seatNo = document.getElementById("seatNo").value.trim();
  try {
    if (!bookingId || !seatNo) throw new Error("Both fields are required");
    parseSeat(seatNo); 
    passengers.push(new Passenger(bookingId, seatNo));
    renderPassengerList();
    bookingForm.reset();
    messageEl.textContent = "";
  } catch (err) {
    messageEl.textContent = err.message;
  }
});

document.getElementById("generateOrder").addEventListener("click", () => {
  const sequence = generateBoardingSequence(passengers);
  renderBoardingTable(sequence);
});

function renderPassengerList() {
  passengerListEl.innerHTML = passengers
    .map((p) => `<li>${p.bookingId} — ${p.seatNo.toUpperCase()}</li>`)
    .join("");
}

function renderBoardingTable(sequence) {
  boardingTableBody.innerHTML = sequence
    .map(
      (p, i) =>
        `<tr><td>${i + 1}</td><td>${p.bookingId}</td><td>${p.seatNo.toUpperCase()}</td></tr>`
    )
    .join("");
}