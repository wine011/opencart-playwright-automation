# OpenCart Automation Project

This repository contains an end-to-end test automation project for the OpenCart demo website, implemented using Playwright with TypeScript. It demonstrates automated testing of key user flows, including account registration, login, product search, shopping cart operations, and checkout.

### 📌 Project Overview

The project aims to simulate real-world user interactions and validate the functionality of OpenCart’s core features.

### Current Test Coverage (Positive Paths Only)

### Account Management

User registration (registerAccount.spec.ts)

Login (login.spec.ts)

Logout (logout.spec.ts)

### Product Operations

Search products (searchProduct.spec.ts)

Add products to cart (addProductToCart.spec.ts)

Modify shopping cart quantities (updateShoppingCart.spec.ts)

### End-to-End Flows

Guest user flow: Search → Add to Cart → Modify Cart → Checkout (guestFlowEndToEnd.spec.ts)

Registered user flow: Register → Search → Add to Cart → Modify Cart → Checkout → Logout (registeredUserFlowEndToEnd.spec.ts)

**💡 Future Enhancements (Negative Test Scenarios)**

#### 🛠 Technology Stack

**Language**: TypeScript

**Test Framework**: Playwright

**IDE**: Visual Studio Code

**Libraries & Tools**:

*@faker-js/faker* – generate random test data

*csv-parse* – read test data from CSV

*Allure Playwright* – test reporting


### Notes

- Currently, only positive/happy paths are automated.

- Negative tests (invalid input, missing fields, error messages) are planned as a next phase.

- Checkout flow in the demo site only allows filling personal details; payment is not implemented.


### 🚀 How to Run Tests

Install dependencies:

```npm install```

Run all tests:

```npx playwright test```

Run a specific test:

```npx playwright test tests/login.spec.ts```

Generate HTML report:

```npx playwright show-report```

Optionally, use ```--grep @regression``` or ```--grep @e2e``` to run tagged tests only.
