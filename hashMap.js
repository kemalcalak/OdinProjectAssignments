class HashMap {
    constructor(ilkKapasite = 16, yuklemeFaktoru = 0.75) {
      this.kapasite = ilkKapasite; // Number of buckets
      this.boyut = 0; // Number of stored key-value pairs
      this.yuklemeFaktoru = yuklemeFaktoru;
      this.kovalar = Array(this.kapasite).fill(null).map(() => []); // Initialize buckets
    }
  
    // Hash function for keys (with modulo applied at each iteration)
    hash(anahtar) {
      let hashKodu = 0;
      const asalSayi = 31;
  
      for (let i = 0; i < anahtar.length; i++) {
        hashKodu = (asalSayi * hashKodu + anahtar.charCodeAt(i)) % this.kapasite; 
        // Apply modulo to avoid exceeding capacity
      }
  
      return hashKodu;
    }
  
    // Add key-value pair
    ekle(anahtar, deger) {
      const indeks = this.hash(anahtar); // Find the hash code for the key
      const kova = this.kovalar[indeks];
  
      // Check if the key already exists, if so overwrite the value
      for (let i = 0; i < kova.length; i++) {
        const [mevcutAnahtar] = kova[i];
        if (mevcutAnahtar === anahtar) {
          kova[i] = [anahtar, deger]; // Overwrite
          return;
        }
      }
  
      // Add new key-value pair
      kova.push([anahtar, deger]);
      this.boyut++;
  
      // Check if resizing is needed
      if (this.boyut / this.kapasite >= this.yuklemeFaktoru) {
        this.yenidenBoyutlandir();
      }
    }
  
    // Retrieve the value by key
    getir(anahtar) {
      const indeks = this.hash(anahtar); // Get the bucket index using the hash code
      const kova = this.kovalar[indeks];
  
      // Search the bucket for the key
      for (let [mevcutAnahtar, deger] of kova) {
        if (mevcutAnahtar === anahtar) {
          return deger; // Return the value if found
        }
      }
  
      return null; // Key not found
    }
  
    // Check if the key exists
    varMi(anahtar) {
      return this.getir(anahtar) !== null;
    }
  
    // Remove a key-value pair by key
    sil(anahtar) {
      const indeks = this.hash(anahtar);
      const kova = this.kovalar[indeks];
  
      // Find and remove the key-value pair
      for (let i = 0; i < kova.length; i++) {
        const [mevcutAnahtar] = kova[i];
        if (mevcutAnahtar === anahtar) {
          kova.splice(i, 1); // Remove the key-value pair
          this.boyut--;
          return true;
        }
      }
  
      return false; // Key not found
    }
  
    // Get the current number of keys
    uzunluk() {
      return this.boyut;
    }
  
    // Clear all key-value pairs
    temizle() {
      this.kovalar = Array(this.kapasite).fill(null).map(() => []); // Reset all buckets
      this.boyut = 0;
    }
  
    // Return an array of all keys
    anahtarlar() {
      const anahtarlar = [];
      for (let kova of this.kovalar) {
        for (let [anahtar] of kova) {
          anahtarlar.push(anahtar); // Collect all keys
        }
      }
      return anahtarlar;
    }
  
    // Return an array of all values
    degerler() {
      const degerler = [];
      for (let kova of this.kovalar) {
        for (let [, deger] of kova) {
          degerler.push(deger); // Collect all values
        }
      }
      return degerler;
    }
  
    // Return an array of all key-value pairs
    ciftler() {
      const ciftler = [];
      for (let kova of this.kovalar) {
        for (let cift of kova) {
          ciftler.push(cift); // Collect all key-value pairs
        }
      }
      return ciftler;
    }
  
    // Resize the hash map by doubling the capacity
    yenidenBoyutlandir() {
      const yeniKapasite = this.kapasite * 2;
      const yeniKovalar = Array(yeniKapasite).fill(null).map(() => []);
      const eskiKovalar = this.kovalar;
  
      // Rehash and insert all the entries into new buckets
      this.kapasite = yeniKapasite;
      this.kovalar = yeniKovalar;
      this.boyut = 0;
  
      for (let kova of eskiKovalar) {
        for (let [anahtar, deger] of kova) {
          this.ekle(anahtar, deger); // Rehash and insert
        }
      }
    }
  }
  
  // Example test
  const test = new HashMap();
  test.ekle('elma', 'kirmizi');
  test.ekle('muz', 'sari');
  test.ekle('havuc', 'turuncu');
  test.ekle('kopek', 'kahverengi');
  test.ekle('fil', 'gri');
  test.ekle('kurbaga', 'yesil');
  test.ekle('uzum', 'mor');
  test.ekle('sapka', 'siyah');
  test.ekle('dondurma', 'beyaz');
  test.ekle('ceket', 'mavi');
  test.ekle('ucurtma', 'pembe');
  test.ekle('aslan', 'altin');
  
  // Overwrite existing value
  test.ekle('elma', 'yesil');
  
  // Add a new entry after reaching 0.75 load factor
  test.ekle('ay', 'gumus');
  
  console.log(test.getir('elma')); // 'yesil'
  console.log(test.varMi('aslan')); // true
  console.log(test.sil('muz')); // true
  console.log(test.uzunluk()); // 12
  console.log(test.anahtarlar()); // Array of all keys
  console.log(test.degerler()); // Array of all values
  console.log(test.ciftler()); // Array of key-value pairs
  test.temizle(); // Clear all
  console.log(test.uzunluk()); // 0
  