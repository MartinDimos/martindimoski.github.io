# Internet Signals

This project monitors selected public web sources and converts detected changes
into summarized market, product, and talent signals.

The goal is not data collection, but pattern detection using minimal infrastructure.

## Architecture
- GitHub Actions for scheduled execution
- Lightweight scrapers (no headless browsers)
- JSON-based outputs
- Static frontend consumption

## Signal Categories
- Product Velocity (changelogs)
- Talent Direction (job listings)
- Narrative Shifts (blogs, docs)

This repository acts as the intelligence engine.
