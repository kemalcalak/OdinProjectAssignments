// 1. capitalize function
function ilkHarfiBuyut(metin) {
  if (!metin) return "";
  return metin[0].toUpperCase() + metin.slice(1);
}

// 2. reverseString function
function stringTersCevir(metin) {
  return metin.split("").reverse().join("");
}

// 3. calculator object
const hesapMakinesi = {
  topla: (a, b) => a + b,
  cikar: (a, b) => a - b,
  bol: (a, b) => (b !== 0 ? a / b : "Hata"),
  carp: (a, b) => a * b,
};

// 4. caesarCipher function

// Helper function for caesarCipher
function karakterKaydir(karakter, kaydirma) {
  const buyukHarfMi = karakter === karakter.toUpperCase();
  const base = buyukHarfMi ? 65 : 97;
  return String.fromCharCode(
    ((karakter.charCodeAt(0) - base + kaydirma) % 26) + base
  );
}

// Helper function to check if a character is alphabetic
function alfabetikMi(karakter) {
  return /^[A-Za-z]$/.test(karakter);
}

// Main caesarCipher function
function sezarSifresi(metin, kaydirma) {
  return metin
    .split("")
    .map((karakter) => {
      if (alfabetikMi(karakter)) {
        return karakterKaydir(karakter, kaydirma);
      }
      return karakter;
    })
    .join("");
}

// 5. analyzeArray function
function diziAnalizEt(dizi) {
  const ortalama = dizi.reduce((a, b) => a + b, 0) / dizi.length;
  const min = Math.min(...dizi);
  const max = Math.max(...dizi);
  const uzunluk = dizi.length;

  return { ortalama, min, max, uzunluk };
}

// Function to get user input
function kullaniciGirdisiAl() {
  // capitalize
  let capitalizeGirdisi = prompt(
    "Bir metin girin (ilk harfi büyük yapmak için): "
  );
  alert(`Capitalize Sonucu: ${ilkHarfiBuyut(capitalizeGirdisi)}`);

  // reverseString
  let tersCevirGirdisi = prompt("Bir metin girin (ters çevirmek için): ");
  alert(`Ters String Sonucu: ${stringTersCevir(tersCevirGirdisi)}`);

  // calculator operations
  let sayi1 = parseFloat(
    prompt("İlk sayıyı girin (hesap makinesi işlemleri için): ")
  );
  let sayi2 = parseFloat(
    prompt("İkinci sayıyı girin (hesap makinesi işlemleri için): ")
  );
  alert(`Toplama Sonucu: ${hesapMakinesi.topla(sayi1, sayi2)}`);
  alert(`Çıkarma Sonucu: ${hesapMakinesi.cikar(sayi1, sayi2)}`);
  alert(`Çarpma Sonucu: ${hesapMakinesi.carp(sayi1, sayi2)}`);
  alert(`Bölme Sonucu: ${hesapMakinesi.bol(sayi1, sayi2)}`);

  // caesarCipher
  let sezarGirdisi = prompt("Bir metin girin (Sezar şifresi için): ");
  let kaydirma = parseInt(
    prompt("Kaydırma faktörünü girin (Sezar şifresi için): ")
  );
  alert(`Sezar Şifresi Sonucu: ${sezarSifresi(sezarGirdisi, kaydirma)}`);

  // analyzeArray
  let diziGirdisi = prompt(
    "Sayıları virgülle ayırarak girin (dizi analizi için): "
  );
  let dizi = diziGirdisi.split(",").map(Number);
  let analizSonucu = diziAnalizEt(dizi);
  alert(`Dizi Analizi Sonucu: 
      Ortalama: ${analizSonucu.ortalama}
      Min: ${analizSonucu.min}
      Max: ${analizSonucu.max}
      Uzunluk: ${analizSonucu.uzunluk}`);
}

// Run the program
kullaniciGirdisiAl();
