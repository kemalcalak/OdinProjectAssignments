function atHamleleri(baslangic, hedef) {
    // Possible knight moves (L-shaped)
    const hareketler = [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ];
  
    // Check if a move is within board boundaries
    function gecerliHamle(x, y) {
      return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
  
    // BFS to find the shortest path
    function bfs(baslangic, hedef) {
      const kuyruk = [[baslangic]];  // Queue for BFS, initialized with start position path
      const ziyaretEdilenler = new Set();  // Track visited squares
      ziyaretEdilenler.add(baslangic.toString());  // Mark start as visited
  
      // BFS loop
      while (kuyruk.length > 0) {
        const yol = kuyruk.shift();  // Get the current path
        const [x, y] = yol[yol.length - 1];  // Get the last position in the path
  
        // If we've reached the target, return the path
        if (x === hedef[0] && y === hedef[1]) {
          return yol;
        }
  
        // Check all possible moves from the current position
        for (const [dx, dy] of hareketler) {
          const yeniX = x + dx;
          const yeniY = y + dy;
  
          // If it's a valid move and not visited yet, add the new path to the queue
          if (gecerliHamle(yeniX, yeniY) && !ziyaretEdilenler.has([yeniX, yeniY].toString())) {
            ziyaretEdilenler.add([yeniX, yeniY].toString());  // Mark as visited
            kuyruk.push([...yol, [yeniX, yeniY]]);  // Add new path to the queue
          }
        }
      }
    }
  
    // Find the shortest path using BFS
    const yol = bfs(baslangic, hedef);
  
    // Output the result
    console.log(`${yol.length - 1} hamlede ulaştınız! İşte yolunuz:`);
    yol.forEach(adim => console.log(adim));
  
    return yol;
  }
  
  // Test cases
  atHamleleri([0, 0], [1, 2]);  // [[0, 0], [1, 2]]
  atHamleleri([0, 0], [3, 3]);  // Example paths: [[0, 0], [2, 1], [3, 3]] or [[0, 0], [1, 2], [3, 3]]
  atHamleleri([3, 3], [0, 0]);  // Example paths: [[3, 3], [2, 1], [0, 0]] or [[3, 3], [1, 2], [0, 0]]
  atHamleleri([0, 0], [7, 7]);  // Multiple possible shortest paths
  