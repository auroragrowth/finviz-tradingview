# Adding the tool to the Aurora Growth website

The tool is a live web page: **https://auroragrowth.github.io/finviz-tradingview/**

Below are four ways to bring it onto your site, easiest first. Pick whichever suits
how your site is built — you only need one.

---

## Option 1 — A markdown page (if your site accepts markdown)

Paste this straight into a new page/post on your site:

```markdown
## Finviz → TradingView Watchlist Tool

Turn a Finviz stock screen into a clean, de-duplicated ticker list you can paste
straight into a TradingView watchlist — in a couple of clicks.

**[→ Open the tool](https://auroragrowth.github.io/finviz-tradingview/)**

Built by Aurora Growth Academy. Runs entirely in your browser; nothing is uploaded.
```

---

## Option 2 — A branded button (paste into any HTML page)

Drop this anywhere in your site's HTML (Wix/Squarespace/WordPress all have an
"embed HTML" or "custom code" block for this):

```html
<a href="https://auroragrowth.github.io/finviz-tradingview/"
   style="display:inline-flex;align-items:center;gap:8px;text-decoration:none;
          font:600 15px/1 Inter,system-ui,sans-serif;color:#06121f;
          background:linear-gradient(90deg,#22D3EE,#A78BFA);
          padding:12px 22px;border-radius:10px;">
  ▸ Open the Finviz → TradingView tool
</a>
```

---

## Option 3 — Embed the whole tool inside one of your pages

This shows the tool *inside* a page on your site (in an iframe), so visitors never
leave. Paste into an HTML/embed block:

```html
<iframe src="https://auroragrowth.github.io/finviz-tradingview/"
        title="Finviz to TradingView tool"
        style="width:100%;height:1400px;border:0;border-radius:12px;"
        loading="lazy"></iframe>
```

Adjust `height` to taste. (This is the simplest embed and works everywhere.)

---

## Option 4 — Put it on your own domain (most seamless)

Serve the tool from a subdomain of your brand, e.g. **tools.auroragrowth.co.uk**,
so it looks fully part of your site. Two small steps:

1. **In the repo:** add a file named `CNAME` containing just your chosen subdomain
   (e.g. `tools.auroragrowth.co.uk`). *(I can do this for you.)*
2. **At your DNS provider:** add a `CNAME` record for that subdomain pointing to
   `auroragrowth.github.io`.

Once DNS propagates (minutes to a few hours) the tool is live at your own address,
with free HTTPS. Tell me the subdomain you want and I'll set up step 1.

---

*The live tool, source, and this guide all live at
https://github.com/auroragrowth/finviz-tradingview*
