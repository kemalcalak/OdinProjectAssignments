// Node class
class Dugum {
  constructor(deger = null, sonrakiDugum = null) {
    this.deger = deger;
    this.sonrakiDugum = sonrakiDugum;
  }
}

// LinkedList class
class BagliListe {
  constructor() {
    this.ilkDugum = null;
  }

  // Append a new node to the end of the list
  sonaEkle(deger) {
    const yeniDugum = new Dugum(deger);
    if (this.ilkDugum === null) {
      this.ilkDugum = yeniDugum;
    } else {
      let mevcut = this.ilkDugum;
      while (mevcut.sonrakiDugum !== null) {
        mevcut = mevcut.sonrakiDugum;
      }
      mevcut.sonrakiDugum = yeniDugum;
    }
  }

  // Prepend a new node to the start of the list
  basaEkle(deger) {
    const yeniDugum = new Dugum(deger, this.ilkDugum);
    this.ilkDugum = yeniDugum;
  }

  // Return the size of the list
  boyut() {
    let sayac = 0;
    let mevcut = this.ilkDugum;
    while (mevcut !== null) {
      sayac++;
      mevcut = mevcut.sonrakiDugum;
    }
    return sayac;
  }

  // Return the first node (head) of the list
  bas() {
    return this.ilkDugum;
  }

  // Return the last node (tail) of the list
  son() {
    let mevcut = this.ilkDugum;
    if (!mevcut) return null;
    while (mevcut.sonrakiDugum !== null) {
      mevcut = mevcut.sonrakiDugum;
    }
    return mevcut;
  }

  // Return the node at a specific index
  indeksteki(indeks) {
    let sayac = 0;
    let mevcut = this.ilkDugum;
    while (mevcut !== null) {
      if (sayac === indeks) return mevcut;
      sayac++;
      mevcut = mevcut.sonrakiDugum;
    }
    return null;
  }

  // Remove the last node (pop)
  sonuSil() {
    if (!this.ilkDugum) return null;
    if (this.ilkDugum.sonrakiDugum === null) {
      this.ilkDugum = null;
      return;
    }
    let mevcut = this.ilkDugum;
    let onceki = null;
    while (mevcut.sonrakiDugum !== null) {
      onceki = mevcut;
      mevcut = mevcut.sonrakiDugum;
    }
    onceki.sonrakiDugum = null;
  }

  // Check if the list contains a specific value
  iceriyorMu(deger) {
    let mevcut = this.ilkDugum;
    while (mevcut !== null) {
      if (mevcut.deger === deger) return true;
      mevcut = mevcut.sonrakiDugum;
    }
    return false;
  }

  // Find the index of the node containing a value
  bul(deger) {
    let mevcut = this.ilkDugum;
    let indeks = 0;
    while (mevcut !== null) {
      if (mevcut.deger === deger) return indeks;
      mevcut = mevcut.sonrakiDugum;
      indeks++;
    }
    return null;
  }

  // Convert the list to a string
  listeyiYazdir() {
    let mevcut = this.ilkDugum;
    let str = "";
    while (mevcut !== null) {
      str += `( ${mevcut.deger} ) -> `;
      mevcut = mevcut.sonrakiDugum;
    }
    str += "null";
    return str;
  }

  // Insert a new node at a specific index
  indekseEkle(deger, indeks) {
    if (indeks === 0) {
      this.basaEkle(deger);
      return;
    }
    const yeniDugum = new Dugum(deger);
    let mevcut = this.ilkDugum;
    let onceki = null;
    let sayac = 0;
    while (mevcut !== null && sayac < indeks) {
      onceki = mevcut;
      mevcut = mevcut.sonrakiDugum;
      sayac++;
    }
    if (onceki !== null) {
      onceki.sonrakiDugum = yeniDugum;
      yeniDugum.sonrakiDugum = mevcut;
    }
  }

  // Remove the node at a specific index
  indekstenSil(indeks) {
    if (indeks === 0) {
      this.ilkDugum = this.ilkDugum.sonrakiDugum;
      return;
    }
    let mevcut = this.ilkDugum;
    let onceki = null;
    let sayac = 0;
    while (mevcut !== null && sayac < indeks) {
      onceki = mevcut;
      mevcut = mevcut.sonrakiDugum;
      sayac++;
    }
    if (onceki !== null && mevcut !== null) {
      onceki.sonrakiDugum = mevcut.sonrakiDugum;
    }
  }
}

// Testing the LinkedList class
const liste = new BagliListe();
liste.sonaEkle("köpek");
liste.sonaEkle("kedi");
liste.sonaEkle("papağan");
liste.sonaEkle("hamster");
liste.sonaEkle("yılan");
liste.sonaEkle("kaplumbağa");

console.log(liste.listeyiYazdir()); // Expected output: ( köpek ) -> ( kedi ) -> ( papağan ) -> ( hamster ) -> ( yılan ) -> ( kaplumbağa ) -> null
