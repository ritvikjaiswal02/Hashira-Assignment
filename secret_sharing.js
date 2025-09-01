const fs = require("fs");

/**
 * Decode base-value string to decimal integer
 */
function decode(base, value) {
  return parseInt(value, parseInt(base));
}

/**
 * Solve system of linear equations using Gaussian Elimination
 * Input: augmented matrix of size n x (n+1)
 * Returns: array of solutions [a, b, ..., c]
 */
function gaussianElimination(matrix) {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    // Pivot row
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(matrix[k][i]) > Math.abs(matrix[maxRow][i])) {
        maxRow = k;
      }
    }
    [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];

    const divisor = matrix[i][i];
    if (divisor === 0) throw new Error("No unique solution");

    // Normalize pivot row
    for (let j = i; j <= n; j++) {
      matrix[i][j] /= divisor;
    }

    // Eliminate column
    for (let k = 0; k < n; k++) {
      if (k === i) continue;
      const factor = matrix[k][i];
      for (let j = i; j <= n; j++) {
        matrix[k][j] -= factor * matrix[i][j];
      }
    }
  }

  return matrix.map((row) => row[n]); // last column is solution vector
}

/**
 * Solve polynomial coefficients using k points
 */
function solvePolynomial(points, degree) {
  const n = degree + 1; // number of coefficients
  const matrix = [];

  // Build augmented matrix
  for (let { x, y } of points) {
    const row = [];
    for (let p = degree; p >= 0; p--) {
      row.push(Math.pow(x, p));
    }
    row.push(y);
    matrix.push(row);
  }

  return gaussianElimination(matrix);
}

/**
 * Main: process JSON input
 */
function processFile(filename) {
  console.log(`\n=== Processing ${filename} ===`);
  const data = JSON.parse(fs.readFileSync(filename, "utf8"));
  const { n, k } = data.keys;
  const degree = k - 1;

  // Step 1: Decode k points
  const points = [];
  console.log(`n: ${n}, k: ${k} → degree: ${degree}`);
  console.log("Decoded points:");
  for (let i = 1; i <= n && points.length < k; i++) {
    if (data[i]) {
      const { base, value } = data[i];
      const y = decode(base, value);
      points.push({ x: i, y });
      console.log(`(${i}, ${y}) [base ${base}: "${value}"]`);
    }
  }

  // Step 2: Solve system of equations
  const coeffs = solvePolynomial(points, degree);

  // Step 3: Constant term
  const constant = coeffs[coeffs.length - 1];
  console.log("Polynomial coefficients (highest → lowest):", coeffs);
  console.log(`🎯 Constant term (c) = ${constant}`);
}

// Run program on both testcases
processFile("testcase1.json");
processFile("testcase2.json");
