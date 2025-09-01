const fs = require("fs");

/**
 * Convert number from any base to decimal
 * @param {string} value - The value in given base
 * @param {string} base - The base (2-36)
 * @returns {number} - Decimal value
 */
function convertToDecimal(value, base) {
  return parseInt(value, parseInt(base));
}

/**
 * Lagrange Interpolation to find polynomial value at x=0
 * @param {Array} points - Array of {x, y} coordinates
 * @returns {number} - The constant term (secret)
 */
function lagrangeInterpolation(points) {
  let result = 0;
  const n = points.length;

  for (let i = 0; i < n; i++) {
    let term = points[i].y;

    // Calculate Lagrange basis polynomial Li(0)
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        // Li(0) = (0 - xj) / (xi - xj) = -xj / (xi - xj)
        term *= -points[j].x / (points[i].x - points[j].x);
      }
    }

    result += term;
  }

  return Math.round(result); // Round to nearest integer for clean output
}

/**
 * Main function to solve the secret sharing problem
 * @param {string} filename - JSON file path
 */
function findConstantTerm(filename) {
  try {
    console.log(`\n=== Processing ${filename} ===`);

    // Step 1: Read JSON file
    const data = JSON.parse(fs.readFileSync(filename, "utf8"));
    const { n, k } = data.keys;

    console.log(`Number of roots provided (n): ${n}`);
    console.log(`Minimum roots needed (k): ${k}`);
    console.log(`Polynomial degree: ${k - 1}`);

    // Step 2: Decode the values and collect points
    const points = [];

    console.log("\n--- Decoding Points ---");
    for (let i = 1; i <= n; i++) {
      if (data[i.toString()]) {
        const { base, value } = data[i.toString()];
        const x = i;
        const y = convertToDecimal(value, base);

        points.push({ x, y });
        console.log(`Point ${i}: (${x}, ${y}) [Base ${base}: "${value}"]`);

        // We only need k points for k-1 degree polynomial
        if (points.length === k) break;
      }
    }

    // Step 3: Apply Lagrange Interpolation to find constant term
    console.log("\n--- Applying Lagrange Interpolation ---");
    console.log(`Using ${points.length} points for degree ${k - 1} polynomial`);

    const constantTerm = lagrangeInterpolation(points);

    console.log(`\n🎯 RESULT: The constant term (c) = ${constantTerm}`);

    // Verification step
    console.log("\n--- Verification ---");
    console.log("Lagrange formula used: f(0) = Σ yi * Π(-xj/(xi-xj)) for j≠i");

    return constantTerm;
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    return null;
  }
}

/**
 * Process multiple test cases
 */
function main() {
  console.log("🚀 Shamir Secret Sharing - Polynomial Constant Finder");
  console.log("📊 Using Lagrange Interpolation Method\n");

  // Test case file names (adjust based on your file structure)
  const testCases = ["testcase1.json", "testcase2.json"];

  const results = [];

  for (const filename of testCases) {
    if (fs.existsSync(filename)) {
      const result = findConstantTerm(filename);
      results.push({ file: filename, constant: result });
    } else {
      console.log(`⚠️  File ${filename} not found. Creating sample...`);
      createSampleFile(filename);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("📋 SUMMARY OF RESULTS:");
  console.log("=".repeat(50));
  results.forEach(({ file, constant }) => {
    console.log(`${file}: c = ${constant}`);
  });
}

/**
 * Create sample test files if they don't exist
 */
function createSampleFile(filename) {
  const sampleData = filename.includes("1")
    ? {
        keys: { n: 4, k: 3 },
        1: { base: "10", value: "4" },
        2: { base: "2", value: "111" },
        3: { base: "10", value: "12" },
        6: { base: "4", value: "213" },
      }
    : {
        keys: { n: 10, k: 7 },
        1: { base: "6", value: "13444211440455345511" },
        2: { base: "15", value: "aed7015a346d635" },
        3: { base: "15", value: "6aeeb69631c227c" },
        4: { base: "16", value: "e1b5e05623d881f" },
        5: { base: "8", value: "316034514573652620673" },
        6: { base: "3", value: "2122212201122002221120200210011020220200" },
        7: { base: "3", value: "20120221122211000100210021102001201112121" },
        8: { base: "6", value: "20220554335330240002224253" },
        9: { base: "12", value: "45153788322a1255483" },
        10: { base: "7", value: "1101613130313526312514143" },
      };

  fs.writeFileSync(filename, JSON.stringify(sampleData, null, 2));
  console.log(`✅ Created ${filename}`);
}

// Run the program
if (require.main === module) {
  main();
}
