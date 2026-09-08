# Infocreon Internship - Unit Economics & Break-Even Simulator

Interactive Finance & Cash simulator for contribution margin, CAC/LTV, fixed-cost absorption and break-even planning.

## Purpose

This application demonstrates how changes in:

- price
- variable cost
- fixed cost
- volume
- CAC
- retention

affect profitability and customer economics.

## Visualizations

The simulator contains four primary visualizations:

1. Contribution waterfall
2. Break-even curve
3. CAC / LTV scatter
4. Sensitivity tornado

## Cinematic interface

The application is designed around the Financial Rail cinematic direction:

- cold obsidian background
- slate-purple undertone
- restrained violet accent
- dark high-contrast visual stage
- full-screen visualization area
- dynamic Intelligence Panel
- transparent Infocreon header
- project information modal
- developer signature

The Intelligence Panel is hidden when the application starts.

Clicking a visualization opens the panel from the right.

The X button closes the panel.

## Technology

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Apache ECharts
- lucide-react

### Backend

- FastAPI
- Pydantic
- Pandas
- httpx
- DuckDB dependency

### External context

- FRED
- World Bank Indicators

## Synthetic data

All product, customer and cost records are synthetic demonstration data.

They must not be interpreted as real company data.

Files:

- `data/products.csv`
- `data/customers.csv`
- `data/costs.csv`

## Installation

### Backend

Windows PowerShell:

```powershell
cd backend

python -m venv .venv

.venv\Scripts\Activate.ps1

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8001