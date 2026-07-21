# Finviz → TradingView watchlist

A tiny, single-file web tool that turns messy [Finviz](https://finviz.com) screener
output into a clean, de-duplicated, comma-separated ticker list ready to **Import** into
a [TradingView](https://www.tradingview.com) watchlist.

**Live:** https://auroragrowth.github.io/finviz-tradingview/

## What it does

- Paste a Finviz Elite CSV, a Tickers-view block, or a bare list (comma / space / newline,
  multiple pages at once) → get one clean line, duplicates removed.
- Two built-in screen presets (**F13** and **Flexible VAX**) that deep-link into Finviz
  and show the decoded filters.
- An optional **bookmarklet** — drag it to your bookmarks bar, then click it on your Finviz
  screener page and it pages through every result, de-dupes, and hands you the finished list.
- Guards: warns if you paste a URL / page code by mistake, and flags TradingView's
  1,000-symbols-per-watchlist cap.

Everything runs in the browser — nothing is uploaded anywhere. It's just `index.html`.

## Import into TradingView

Click the watchlist name in the right toolbar → **Import list…** → choose the `.txt`.
TradingView wants a `.txt`, comma-separated, `EXCHANGE:TICKER` prefix (bare US tickers
usually resolve too).

## Notes

The bookmarklet pages through Finviz's free results, which their `robots.txt` asks bots to
avoid — keep it to occasional personal use. For heavy or fully-sanctioned automation, use
[Finviz Elite](https://finviz.com/elite.ashx)'s export API instead.
