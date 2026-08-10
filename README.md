# YT Transcript Grabber

**Một bookmarklet duy nhất — lấy transcript YouTube sạch, không quảng cáo, không dấu thời gian, sẵn sàng paste vào bất kỳ đâu.**

Không cần cài extension. Không cần backend. Transcript của bạn không được lưu trữ hay gửi đi đâu — chỉ xử lý ngay trong trình duyệt, trên đúng trang YouTube bạn đang mở. (Bookmark chỉ chứa 1 đoạn loader ngắn, tự tải file `bookmarklet.js` từ GitHub mỗi lần bấm — xem mục "Cách hoạt động kỹ thuật" bên dưới.)

👉 **[Cài đặt bằng 1 cú kéo-thả](https://TIN_GITHUB_USERNAME.github.io/yt-transcript-bookmarklet/)**

---

## Vấn đề

YouTube có transcript, nhưng lấy nó ra dùng lại rất phiền: phải mở panel transcript, copy từng đoạn dính timestamp, dọn tay từng dòng "00:12", "Show transcript", số thứ tự rác... Tốn vài phút mỗi video nếu làm thủ công.

## Cách hoạt động

1. Mở video YouTube bất kỳ (có transcript).
2. Bấm bookmarklet trên thanh bookmark.
3. Nó tự tìm và mở panel transcript nếu chưa mở, đợi transcript load, tự dọn sạch timestamp/rác, và hiện popup với nội dung sẵn để bấm **Copy**.
4. Dán vào Google Docs, Claude, Notion, ChatGPT... tùy bạn.

Không lưu trữ transcript, không theo dõi hành vi. Mã nguồn đầy đủ nằm trong [`bookmarklet.js`](./bookmarklet.js) — đọc được, audit được.

## Cách hoạt động kỹ thuật (cho ai muốn audit)

Bookmark chỉ chứa một đoạn "loader" ~250 ký tự — đủ ngắn để kéo-thả không bị trình duyệt cắt cụt (bug đã gặp ở bản đầu, khi nhét thẳng toàn bộ ~6.600 ký tự code vào URL bookmark). Loader này tạo 1 thẻ `<script>` trỏ tới [`bookmarklet.js`](./bookmarklet.js) trên GitHub và chạy nó ngay trong tab hiện tại. Hệ quả:

- Mỗi lần bấm, trình duyệt tải bản mới nhất của `bookmarklet.js` — sửa lỗi/nâng cấp không cần người dùng cài lại.
- Có gọi ra ngoài để tải chính đoạn code (không phải để gửi dữ liệu của bạn đi) — nếu bạn muốn zero network call, dùng bản inline đầy đủ trong [`bookmarklet.min.js`](./bookmarklet.min.js) và cài bằng copy-paste thủ công (không kéo-thả, vì URL quá dài dễ bị cắt cụt).

## Giới hạn đã biết

- Chỉ hoạt động khi YouTube **có sẵn transcript** cho video đó (auto-generated hoặc uploader cung cấp).
- Nếu YouTube đổi cấu trúc DOM, script có thể cần cập nhật lại selector — đây là rủi ro chung của mọi tool dựa vào DOM scraping, không có gì đảm bảo vĩnh viễn.
- Video quá dài hoặc transcript load chậm có thể cần bấm lại bookmarklet lần 2.

## Cài đặt

Xem trang cài đặt: **[link GitHub Pages ở trên](#)** — kéo nút vào thanh bookmark là xong, không cần biết code.

Muốn cài thủ công: mở [`bookmarklet.js`](./bookmarklet.js), đọc hướng dẫn comment ở đầu file.

## License

MIT — dùng, sửa, chia sẻ tự do.

---

*Được build bằng AI, bởi một người không viết code chuyên nghiệp — mình là dân strategic planning, dùng Claude làm công cụ build. Theo dõi hành trình build sản phẩm bằng AI và các bài phân tích/phỏng vấn dài tại **[The Great Interviews](https://thegreatinterviews.substack.com/)** (thêm link Substack của bạn vào đây).*

---

# English

**A single bookmarklet — grab a clean YouTube transcript, no ads, no timestamps, ready to paste anywhere.**

No extension to install. No backend. Your transcript is never stored or sent anywhere — processed entirely client-side, on the YouTube page you already have open. (The bookmark itself is a short loader that fetches `bookmarklet.js` fresh from GitHub each time you click — see "How it works" in the Vietnamese section above for details.)

👉 **[One-click install](https://TIN_GITHUB_USERNAME.github.io/yt-transcript-bookmarklet/)**

## The problem

YouTube has transcripts, but getting them out cleanly is annoying: open the transcript panel, copy segments glued to timestamps, manually strip out "00:12", "Show transcript", stray numbers... a few minutes of cleanup per video if done by hand.

## How it works

1. Open any YouTube video that has a transcript.
2. Click the bookmarklet.
3. It auto-opens the transcript panel if needed, waits for it to load, strips out timestamps/noise, and shows a popup with the cleaned text ready to **Copy**.
4. Paste into Google Docs, Claude, Notion, ChatGPT — wherever.

No storage, no external API calls, no tracking. Full source in [`bookmarklet.js`](./bookmarklet.js) — readable and auditable.

## Known limitations

- Only works when YouTube **has a transcript available** for that video.
- If YouTube changes its DOM structure, selectors may need updating — a general risk of any DOM-scraping tool.
- Very long videos or slow transcript loads may need a second click.

## License

MIT.

---

*Built with AI by a non-engineer — I work in strategic planning, and use Claude as my build tool. I write long-form interview essays and share the AI-build journey at **[The Great Interviews](https://thegreatinterviews.substack.com/)** (add your Substack link here).*
