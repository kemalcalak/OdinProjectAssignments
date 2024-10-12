class Dugum {
  constructor(veri, sol = null, sag = null) {
    this.veri = veri;
    this.sol = sol;
    this.sag = sag;
  }
}

class Agac {
  constructor(dizi) {
    // Remove duplicates and sort the array, then build a balanced tree
    this.kok = this.agacKur([...new Set(dizi)].sort((a, b) => a - b));
  }

  // Build a balanced tree from a sorted array
  agacKur(dizi) {
    if (dizi.length === 0) return null;
    const orta = Math.floor(dizi.length / 2);
    const kok = new Dugum(dizi[orta]);
    kok.sol = this.agacKur(dizi.slice(0, orta)); // Sol alt ağaç
    kok.sag = this.agacKur(dizi.slice(orta + 1)); // Sağ alt ağaç
    return kok;
  }

  // Insert a value in the BST
  ekle(deger, dugum = this.kok) {
    if (!dugum) return new Dugum(deger);
    if (deger < dugum.veri) {
      dugum.sol = this.ekle(deger, dugum.sol);
    } else if (deger > dugum.veri) {
      dugum.sag = this.ekle(deger, dugum.sag);
    }
    return dugum;
  }

  // Find the minimum value in a subtree
  minimumBul(dugum) {
    while (dugum.sol !== null) {
      dugum = dugum.sol;
    }
    return dugum;
  }

  // Delete a node from the tree
  sil(deger, dugum = this.kok) {
    if (!dugum) return dugum;

    if (deger < dugum.veri) {
      dugum.sol = this.sil(deger, dugum.sol);
    } else if (deger > dugum.veri) {
      dugum.sag = this.sil(deger, dugum.sag);
    } else {
      // Node found
      if (!dugum.sol) return dugum.sag;
      if (!dugum.sag) return dugum.sol;

      const minDugum = this.minimumBul(dugum.sag);
      dugum.veri = minDugum.veri;
      dugum.sag = this.sil(minDugum.veri, dugum.sag);
    }

    return dugum;
  }

  // Find a node by its value
  bul(deger, dugum = this.kok) {
    if (!dugum || dugum.veri === deger) return dugum;
    if (deger < dugum.veri) return this.bul(deger, dugum.sol);
    return this.bul(deger, dugum.sag);
  }

  // Breadth-first traversal (level-order)
  seviyeSirasi(callback) {
    if (!callback) throw new Error("Bir callback fonksiyonu gereklidir.");
    const kuyruk = [this.kok];
    while (kuyruk.length > 0) {
      const dugum = kuyruk.shift();
      callback(dugum);
      if (dugum.sol) kuyruk.push(dugum.sol);
      if (dugum.sag) kuyruk.push(dugum.sag);
    }
  }

  // Depth-first traversal (in-order)
  ortaSirali(callback, dugum = this.kok) {
    if (!callback) throw new Error("Bir callback fonksiyonu gereklidir.");
    if (dugum) {
      this.ortaSirali(callback, dugum.sol);
      callback(dugum);
      this.ortaSirali(callback, dugum.sag);
    }
  }

  // Depth-first traversal (pre-order)
  onSirali(callback, dugum = this.kok) {
    if (!callback) throw new Error("Bir callback fonksiyonu gereklidir.");
    if (dugum) {
      callback(dugum);
      this.onSirali(callback, dugum.sol);
      this.onSirali(callback, dugum.sag);
    }
  }

  // Depth-first traversal (post-order)
  sonSirali(callback, dugum = this.kok) {
    if (!callback) throw new Error("Bir callback fonksiyonu gereklidir.");
    if (dugum) {
      this.sonSirali(callback, dugum.sol);
      this.sonSirali(callback, dugum.sag);
      callback(dugum);
    }
  }

  // Calculate height of the tree
  yukseklik(dugum) {
    if (!dugum) return -1;
    const solYukseklik = this.yukseklik(dugum.sol);
    const sagYukseklik = this.yukseklik(dugum.sag);
    return Math.max(solYukseklik, sagYukseklik) + 1;
  }

  // Calculate the depth of a node
  derinlik(dugum, kok = this.kok) {
    if (!kok) return -1;
    if (dugum.veri === kok.veri) return 0;

    const altDerinlik =
      dugum.veri < kok.veri
        ? this.derinlik(dugum, kok.sol)
        : this.derinlik(dugum, kok.sag);

    return altDerinlik === -1 ? -1 : altDerinlik + 1;
  }

  // Check if the tree is balanced
  dengelimi(dugum = this.kok) {
    if (!dugum) return true;
    const solYukseklik = this.yukseklik(dugum.sol);
    const sagYukseklik = this.yukseklik(dugum.sag);
    return (
      Math.abs(solYukseklik - sagYukseklik) <= 1 &&
      this.dengelimi(dugum.sol) &&
      this.dengelimi(dugum.sag)
    );
  }

  // Rebalance the tree
  yenidenDengele() {
    const dugumler = [];
    this.ortaSirali((dugum) => dugumler.push(dugum.veri)); // Get sorted nodes
    this.kok = this.agacKur(dugumler);
  }

  // Pretty print the tree structure
  agaciGoster(dugum = this.kok, onEk = "", solMu = true) {
    if (dugum === null) return;
    if (dugum.sag !== null) {
      this.agaciGoster(dugum.sag, `${onEk}${solMu ? "│   " : "    "}`, false);
    }
    console.log(`${onEk}${solMu ? "└── " : "┌── "}${dugum.veri}`);
    if (dugum.sol !== null) {
      this.agaciGoster(dugum.sol, `${onEk}${solMu ? "    " : "│   "}`, true);
    }
  }
}

// Helper function to generate random numbers
const rastgeleDiziOlustur = (boyut, maksimum) =>
  Array.from({ length: boyut }, () => Math.floor(Math.random() * maksimum));

// Create random tree and test functionalities
const rastgeleDizi = rastgeleDiziOlustur(15, 100);
const bst = new Agac(rastgeleDizi);

console.log("İlk Dengeli Ağaç:");
bst.agaciGoster();

// Check if balanced
console.log("Ağaç dengeli mi?", bst.dengelimi());

// Traversals
console.log("Seviye sırası:");
bst.seviyeSirasi((dugum) => console.log(dugum.veri));

console.log("Ön sırada:");
bst.onSirali((dugum) => console.log(dugum.veri));

console.log("Orta sırada:");
bst.ortaSirali((dugum) => console.log(dugum.veri));

console.log("Son sırada:");
bst.sonSirali((dugum) => console.log(dugum.veri));

// Unbalance tree by adding numbers > 100
bst.ekle(150);
bst.ekle(200);
bst.ekle(250);

console.log("\n>100 Değerler Eklendikten Sonra (Dengesiz):");
bst.agaciGoster();
console.log("Ağaç dengeli mi?", bst.dengelimi());

// Rebalance the tree
bst.yenidenDengele();
console.log("\nYeniden Dengelenmiş Ağaç:");
bst.agaciGoster();
console.log("Ağaç dengeli mi?", bst.dengelimi());
