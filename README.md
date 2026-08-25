# LedgerLogic

Business Math concepts turned into interactive finance tools — built while working through my ADC (finance) coursework, one chapter at a time.

The idea: instead of learning finance/business math and web development as two separate tracks, each chapter becomes a small interactive tool. This keeps both skill sets growing together instead of in isolation.

## Concepts covered so far

**Chapter: Co-ordinate Geometry**
- Linear functions → Total Cost & Total Revenue equations
- Slope → marginal cost interpretation
- Straight-line equations & intersection → Break-Even Analysis
- Quadratic functions & vertex → Revenue Maximization

## Tools in this repo

- **Break-Even Analyzer** — enter fixed cost, variable cost/unit, and selling price/unit to find the break-even quantity, with the Total Cost and Total Revenue lines plotted and their intersection marked.
- **Revenue Maximizer** — enter demand parameters to find the price that maximizes revenue, with the revenue curve plotted and its peak marked.

Both tools live on one page (`math/break-even.html`) as tabs.

## Tech used

- HTML / CSS / vanilla JavaScript
- Canvas API for graphing (mapping math coordinates to pixel coordinates manually — no chart libraries)

## Structure

```
LedgerLogic/
├── math/
│   ├── break-even.html
│   └── break-even.js
├── accounting/       (coming soon)
└── statistics/        (coming soon)
```

## Why this project

Built as a way to make ADC coursework double as web development practice — each new business math chapter becomes the next feature.
