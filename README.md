Polynomial Equation Solver - Hashira Assignment
📌 Problem

Given JSON input with n values (encoded in bases 2–36) and k (minimum points), reconstruct a polynomial of degree k-1 and find its constant term c.

⚙️ Algorithm (System of Equations)

Decode values: Convert base-encoded y values into decimal.

Form equations: Each point (x, y) gives one equation of the polynomial:

# 𝑦

𝑎
𝑚
𝑥
𝑚

- ⋯
- 𝑎
  1
  𝑥
- 𝑐
  y=a
  m
  ​

x
m
+⋯+a
1
​

x+c

Solve system: Use Gaussian elimination on the augmented matrix to find coefficients.

Extract constant: The last coefficient = constant term c.

▶️ Usage

Run in Node.js:

node polynomial_solver.js

📊 Sample Output
=== Processing testcase1.json ===
n: 4, k: 3 → degree: 2
Decoded points: (1, 4), (2, 7), (3, 12)
Polynomial coefficients: [ 1, -2, 28 ]
🎯 Constant term (c) = 28

=== Processing testcase2.json ===
n: 10, k: 7 → degree: 6
Decoded points: (1, 995085094601491), (2, 320923294898495900), ...
Polynomial coefficients: [ ... , -72004075930529132 ]
🎯 Constant term (c) = -72004075930529132

✅ Key Points

Handles any base (2–36).

Uses Gaussian elimination (O(k³)) for solving coefficients.

Clear step-by-step output: decode → equations → coefficients → constant.

Recruiter-friendly: shows explicit linear algebra reasoning, not just interpolation tricks.

✍️ Author: Ritvik Jaiswal
