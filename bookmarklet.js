/**
 * YT Transcript Grabber — bookmarklet source
 *
 * CÁCH CÀI THỦ CÔNG (nếu không dùng trang cài đặt tự động index.html):
 * 1. Copy TOÀN BỘ nội dung file `bookmarklet.min.js` (bản 1 dòng, đã minify).
 * 2. Tạo bookmark mới trong trình duyệt (bất kỳ trang nào, đặt tên ví dụ "Grab Transcript").
 * 3. Dán nội dung `bookmarklet.min.js` vào ô URL của bookmark đó (phải giữ nguyên
 *    tiền tố "javascript:" ở đầu).
 * 4. Lưu lại. Mở video YouTube bất kỳ, bấm bookmark để chạy.
 *
 * File này (bookmarklet.js) là bản ĐỌC ĐƯỢC — chỉ để review code, KHÔNG dùng trực
 * tiếp làm bookmark (trình duyệt sẽ không hiểu newline/comment trong URL bookmark).
 */
(function () {
  var ID = '__yttr2';

  // Bấm lần 2 để đóng popup nếu đang mở
  if (document.getElementById(ID)) {
    document.getElementById(ID).remove();
    return;
  }

  // Dọn từng dòng: bỏ timestamp (00:12 hoặc 00:12:30), bỏ nhãn UI rác của YouTube
  function cleanLines(raw) {
    return raw
      .split('\n')
      .map(function (l) { return l.trim(); })
      .filter(function (l) {
        return (
          l.length > 0 &&
          !/^\d{1,2}:\d{2}(:\d{2})?$/.test(l) &&
          l !== 'Transcript' &&
          l !== 'Search in video' &&
          l !== 'Search transcript' &&
          !/^\d+$/.test(l) &&
          !/^[A-Za-z]+ - CC/.test(l)
        );
      })
      .join(' ');
  }

  // Thử đọc transcript đã render trong DOM (2 kiểu selector khác nhau tùy layout YouTube)
  function getTranscript() {
    var sel = [
      'ytd-transcript-segment-renderer',
      'ytd-transcript-body-renderer [class*="segment"]'
    ];
    for (var i = 0; i < sel.length; i++) {
      var segs = document.querySelectorAll(sel[i]);
      if (segs.length > 5) {
        var t = Array.from(segs).map(function (s) { return s.innerText || ''; }).join(' ');
        var c = cleanLines(t);
        if (c.length > 200) return c;
      }
    }
    var panels = document.querySelectorAll('ytd-engagement-panel-section-list-renderer');
    for (var j = 0; j < panels.length; j++) {
      var txt = panels[j].innerText || '';
      if (txt.length > 200) {
        var c2 = cleanLines(txt);
        if (c2.length > 200) return c2;
      }
    }
    return null;
  }

  // Tự bấm nút "Show transcript" nếu panel chưa mở
  function clickTranscript() {
    var btns = Array.from(document.querySelectorAll('button,tp-yt-paper-button'));
    for (var i = 0; i < btns.length; i++) {
      if (/show transcript/i.test((btns[i].innerText || btns[i].textContent || '').trim())) {
        btns[i].click();
        return true;
      }
    }
    var items = document.querySelectorAll('ytd-menu-service-item-renderer');
    for (var i = 0; i < items.length; i++) {
      if (/transcript/i.test(items[i].innerText || '')) {
        items[i].click();
        return true;
      }
    }
    return false;
  }

  // Retry loop: thử lấy transcript vài lần, chờ panel load (YouTube render bất đồng bộ)
  function tryGet(n, cb) {
    var t = getTranscript();
    if (t && t.length > 200) { cb(t); return; }
    if (n >= 4) { cb(null); return; }
    if (n === 0) {
      var ok = clickTranscript();
      if (!ok) {
        var ex = document.querySelector('#expand,tp-yt-paper-button#expand');
        if (ex) ex.click();
        setTimeout(clickTranscript, 700);
      }
    }
    setTimeout(function () { tryGet(n + 1, cb); }, [1800, 2600, 3400, 4200][n]);
  }

  // Vẽ popup overlay hiển thị transcript + nút Copy
  function showUI(tr) {
    var title = document.title.replace(/ - YouTube$/, '').trim();
    var wc = tr ? tr.split(/\s+/).filter(Boolean).length : 0;

    var ov = document.createElement('div');
    ov.id = ID;
    ov.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:2147483647;display:flex;align-items:center;justify-content:center;font-family:-apple-system,sans-serif;';

    var box = document.createElement('div');
    box.style.cssText = 'background:#fff;border-radius:16px;padding:24px;width:720px;max-width:96vw;max-height:92vh;display:flex;flex-direction:column;gap:12px;box-sizing:border-box;position:relative;';

    var x = document.createElement('button');
    x.textContent = '\u00d7';
    x.style.cssText = 'position:absolute;top:16px;right:18px;border:none;background:none;font-size:20px;cursor:pointer;color:#999;';
    x.onclick = function () { ov.remove(); };

    var ttl = document.createElement('div');
    ttl.style.cssText = 'font-size:13px;font-weight:600;color:#111;padding-right:32px;line-height:1.4;';
    ttl.textContent = title;

    var meta = document.createElement('div');
    meta.style.cssText = 'font-size:11px;color:' + (tr ? '#16a34a' : '#dc2626') + ';';
    meta.textContent = tr
      ? '\u2713 \u0110\u00e3 l\u1ea5y transcript \u2014 ~' + wc.toLocaleString() + ' words'
      : '\u26a0 Ch\u01b0a l\u1ea5y \u0111\u01b0\u1ee3c. V\u00e0o YT \u2192 click "Show transcript" trong m\u00f4 t\u1ea3 video \u2192 b\u1ea5m bookmark l\u1ea1i.';

    var ta = document.createElement('textarea');
    ta.value = tr || '';
    ta.placeholder = 'Transcript tr\u1ed1ng \u2014 paste th\u1ee7 c\u00f4ng v\u00e0o \u0111\u00e2y ho\u1eb7c th\u1eed l\u1ea1i sau khi m\u1edf transcript.';
    ta.style.cssText = 'flex:1;min-height:300px;width:100%;font-size:13px;line-height:1.75;border:1px solid #e0e0e0;border-radius:10px;padding:14px;resize:none;color:#222;box-sizing:border-box;font-family:inherit;outline:none;';

    var row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:10px;';

    var bc = document.createElement('button');
    bc.textContent = 'Copy transcript';
    bc.style.cssText = 'background:#111;color:#fff;border:none;border-radius:8px;padding:10px 22px;font-size:13px;font-weight:600;cursor:pointer;';
    bc.onclick = function () {
      ta.select();
      try { navigator.clipboard.writeText(ta.value); } catch (e) { document.execCommand('copy'); }
      bc.textContent = 'Copied \u2713';
      bc.style.background = '#16a34a';
      setTimeout(function () { bc.textContent = 'Copy transcript'; bc.style.background = '#111'; }, 2000);
    };

    var bx = document.createElement('button');
    bx.textContent = '\u0110\u00f3ng';
    bx.style.cssText = 'background:#f5f5f5;color:#555;border:none;border-radius:8px;padding:10px 18px;font-size:13px;cursor:pointer;';
    bx.onclick = function () { ov.remove(); };

    row.appendChild(bc);
    row.appendChild(bx);
    box.appendChild(x);
    box.appendChild(ttl);
    box.appendChild(meta);
    box.appendChild(ta);
    box.appendChild(row);
    ov.appendChild(box);
    ov.addEventListener('click', function (e) { if (e.target === ov) ov.remove(); });
    document.body.appendChild(ov);

    if (tr) { ta.focus(); ta.select(); }
  }

  tryGet(0, function (t) { showUI(t); });
})();
