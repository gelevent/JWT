const jwt = require('jsonwebtoken');

const kunciRahasia = "kunci_anda";

function buatTokenLiburan(nama, destinasi, waktuShalat, waktuMakan, waktuIstirahat) {
    const payload = {
        nama: nama,
        destinasi: destinasi,
        waktuShalat: waktuShalat,
        waktuMakan: waktuMakan,
        waktuIstirahat: waktuIstirahat,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
    };
    const token = jwt.sign(payload, kunciRahasia);
    return token;
}

function verifikasiTokenLiburan(token) {
    try {
        const decoded = jwt.verify(token, kunciRahasia);
        return decoded;
    } catch (err) {
        return err.message;
    }
}

const liburanDestinasi = [
    { nama: "alexbijer", destinasi: "Gunung", waktuShalat: "06:00 Pagi", waktuMakan: "01:00 Siang", waktuIstirahat: "04:00 Sore" },
    { nama: "muim", destinasi: "Pantai", waktuShalat: "07:00 Pagi", waktuMakan: "12:00 Siang", waktuIstirahat: "03:00 Sore" },
    { nama: "aldi", destinasi: "Kolam Renang", waktuShalat: "08:00 Pagi", waktuMakan: "11:00 Siang", waktuIstirahat: "02:00 Sore" },
    { nama: "padil", destinasi: "Hutan", waktuShalat: "05:00 Pagi", waktuMakan: "02:00 Siang", waktuIstirahat: "06:00 Sore" },
    { nama: "diaraki", destinasi: "Desa Wisata", waktuShalat: "09:00 Pagi", waktuMakan: "10:00 Siang", waktuIstirahat: "01:00 Sore" }
];

const tokenLiburanArray = liburanDestinasi.map(destinasi => {
    return buatTokenLiburan(destinasi.nama, destinasi.destinasi, destinasi.waktuShalat, destinasi.waktuMakan, destinasi.waktuIstirahat);
});

console.log("Token Liburan Array:", tokenLiburanArray);

const verifikasiLiburanArray = tokenLiburanArray.map(token => {
    return verifikasiTokenLiburan(token);
});

console.log("Verifikasi Token Liburan Array:", verifikasiLiburanArray);