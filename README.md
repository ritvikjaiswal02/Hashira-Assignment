# Shamir Secret Sharing - Lagrange Interpolation Solution

## Implementation Details

- **Language:** JavaScript (Node.js)
- **Algorithm:** Lagrange Interpolation
- **Time Complexity:** O(k²)
- **Approach:** Direct calculation of f(0) to find constant term

## Solution Steps

1. **Parse JSON:** Extract n, k values and encoded roots
2. **Base Conversion:** Convert values from bases 2-36 to decimal using `parseInt(value, base)`
3. **Lagrange Interpolation:** Apply formula `f(0) = Σ yi × Π(-xj/(xi-xj))` for j≠i

## Key Implementation Features

- **Dynamic file reading:** Uses `fs.readFileSync()` to read JSON test cases
- **Robust base handling:** Supports all bases from 2 to 36 including hexadecimal
- **Precision handling:** Uses JavaScript's native number precision for large integers
- **Error handling:** Validates file existence and JSON parsing

## Code Structure

```javascript
convertToDecimal(value, base); // Base conversion utility
lagrangeInterpolation(points); // Core mathematical algorithm
findConstantTerm(filename); // Main solution function
```

## Test Results

- **testcase1.json:** c = 3
- **testcase2.json:** c = -6290016743746478000

## Usage

```bash
node secret_sharing.js
```

## Files

- `secret_sharing.js` - Complete solution implementation
- `testcase1.json` - Test case 1
- `testcase2.json` - Test case 2

**Author:** Ritvik Jaiswal
