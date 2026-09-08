import { NextRequest, NextResponse } from "next/server";

const FRED_URL =
  "https://api.stlouisfed.org/fred/series/observations";

const ALLOWED_SERIES = new Set([
  "DGS10",
  "DFF",
  "CPIAUCSL",
  "UNRATE",
  "GDPC1",
]);

export async function GET(request: NextRequest) {
  const apiKey = process.env.FRED_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "FRED_API_KEY is not configured",
      },
      { status: 500 }
    );
  }

  const series =
    request.nextUrl.searchParams.get("series") || "DGS10";

  const limit =
    request.nextUrl.searchParams.get("limit") || "60";

  if (!ALLOWED_SERIES.has(series)) {
    return NextResponse.json(
      {
        error: `FRED series ${series} is not allowed`,
      },
      { status: 400 }
    );
  }

  const url = new URL(FRED_URL);

  url.searchParams.set("series_id", series);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("file_type", "json");
  url.searchParams.set("sort_order", "desc");
  url.searchParams.set("limit", limit);

  try {
    const response = await fetch(url.toString(), {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          error: "FRED request failed",
          details: errorText,
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    const observations = (data.observations || [])
      .filter(
        (item: { value: string }) =>
          item.value !== "."
      )
      .map(
        (item: {
          date: string;
          value: string;
        }) => ({
          date: item.date,
          value: Number(item.value),
        })
      )
      .reverse();

    return NextResponse.json({
      series,
      observations,
      count: observations.length,
      source: "FRED",
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to connect to FRED",
      },
      { status: 500 }
    );
  }
}