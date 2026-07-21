/* Finviz → TradingView auto-collector.
   Loaded on demand by the bookmarklet (a thin loader), so this file is the single
   source of truth — fixing a bug here updates everyone's bookmark with no re-drag.
   Runs on a finviz.com/screener page: pages through every result, de-dupes, and
   shows a panel with the finished comma-separated list. */
(function () {
  // Accept both the modern /screener path and the legacy /screener.ashx.
  if (!/(^|\.)finviz\.com$/i.test(location.hostname) || !/\/screener/i.test(location.pathname)) {
    alert("Open your Finviz screener first: go to finviz.com, set up (or open) your screen, then click this button while that results page is showing.");
    return;
  }
  var existing = document.getElementById("fvtvBox");
  if (existing) existing.remove();

  var params = new URLSearchParams(location.search);
  params.set("v", "111");   // force a table view so ticker cells are present
  params.delete("r");
  var baseQ = params.toString();
  var seen = Object.create(null), list = [], pages = 0, MAX = 100;

  var box = document.createElement("div");
  box.id = "fvtvBox";
  box.style.cssText = "position:fixed;top:16px;right:16px;z-index:2147483647;width:330px;font:13px/1.5 system-ui,-apple-system,sans-serif;background:#0C1E42;color:#F1F5F9;border:1px solid #22345C;border-radius:12px;box-shadow:0 12px 44px rgba(0,0,0,.55);padding:16px";
  box.innerHTML = '<img src="https://auroragrowth.github.io/finviz-tradingview/aurora-logo.png" alt="Aurora Growth Academy" style="height:24px;width:auto;display:block;margin-bottom:10px" onerror="this.style.display=\'none\'"><div style="font:600 10px/1 ui-monospace,monospace;letter-spacing:.14em;text-transform:uppercase;color:#22D3EE;margin-bottom:10px">Finviz → Watchlist</div><div id="fvtvS">Starting…</div>';
  document.body.appendChild(box);
  var S = box.querySelector("#fvtvS");

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function done() {
    var line = list.join(",");
    var over = list.length > 1000 ? ' · <span style="color:#e0b04a">over TradingView’s 1000 cap, split it</span>' : "";
    S.innerHTML = '<div><b style="font:600 22px ui-monospace,monospace;color:#22D3EE">' + list.length + '</b> tickers' + over + '</div>' +
      '<textarea readonly style="width:100%;height:88px;margin-top:10px;box-sizing:border-box;background:#020617;color:#F1F5F9;border:1px solid #22345C;border-radius:8px;padding:8px;font:12px/1.6 ui-monospace,monospace;resize:vertical;word-break:break-all">' + esc(line) + '</textarea>' +
      '<div style="display:flex;gap:8px;margin-top:10px"><button id="fvtvC" style="flex:1;cursor:pointer;font:600 13px system-ui;background:#22D3EE;color:#06110c;border:0;border-radius:8px;padding:9px">Copy</button><button id="fvtvD" style="flex:1;cursor:pointer;font:600 13px system-ui;background:transparent;color:#22D3EE;border:1px solid #22D3EE;border-radius:8px;padding:9px">Download</button><button id="fvtvX" style="cursor:pointer;background:transparent;color:#94A3B8;border:1px solid #22345C;border-radius:8px;padding:9px 11px">✕</button></div>';
    var ta = box.querySelector("textarea");
    box.querySelector("#fvtvC").onclick = function () {
      ta.focus(); ta.select(); var ok = false;
      try { if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(line); ok = true; } } catch (e) {}
      if (!ok) { try { document.execCommand("copy"); } catch (e) {} }
      var b = box.querySelector("#fvtvC"); b.textContent = "Copied ✓"; setTimeout(function () { b.textContent = "Copy"; }, 1400);
    };
    box.querySelector("#fvtvD").onclick = function () {
      var bl = new Blob([line], { type: "text/plain;charset=utf-8" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(bl); a.download = "watchlist.txt";
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
    };
    box.querySelector("#fvtvX").onclick = function () { box.remove(); };
  }

  function step(r) {
    if (pages >= MAX) { done(); return; }
    S.textContent = "Fetching page " + (pages + 1) + "… " + list.length + " tickers so far";
    fetch(location.pathname + "?" + baseQ + (r > 1 ? "&r=" + r : ""), { credentials: "same-origin" })
      .then(function (res) { if (!res.ok) throw new Error("HTTP " + res.status); return res.text(); })
      .then(function (html) {
        pages++;
        var re = /data-boxover-ticker="([A-Z0-9.\-]+)"/g, m, added = 0;
        while (m = re.exec(html)) { var t = m[1]; if (!seen[t]) { seen[t] = 1; list.push(t); added++; } }
        if (added < 20) { done(); return; }            // short page = last page (free tier = 20/page)
        setTimeout(function () { step(r + 20); }, 500); // gentle
      })
      .catch(function (err) {
        S.innerHTML = "Stopped: " + esc(err.message) + '<br><span style="color:#94A3B8">' + list.length + " collected so far.</span>";
        if (list.length) done();
      });
  }
  step(1);
})();
