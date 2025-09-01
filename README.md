# Hashira Placement Assignment - Secret Sharing Solution

## Problem Description

This solution implements Shamir's Secret Sharing to find the constant term of a polynomial using Lagrange Interpolation.

## Algorithm: Lagrange Interpolation

- **Input**: k points from a polynomial of degree k-1
- **Output**: Constant term (secret) when x=0
- **Formula**: f(0) = Σ yi × Π(-xj/(xi-xj)) for j≠i

## Usage

```bash
node secret_sharing.js
```
