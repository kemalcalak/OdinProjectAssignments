function fibonacci(n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}
function writeFibonacci(a) {
  for (var i = 0; i <= a; i++) {
    console.log(fibonacci(i));
  }
}

writeFibonacci(10); // 0 1 1 2 3 5 8 13 21 34 55
