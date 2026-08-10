# YT Transcript Grabber

**Một bookmarklet duy nhất — lấy transcript YouTube sạch, không quảng cáo, không dấu thời gian, sẵn sàng paste vào bất kỳ đâu.**

Không cần cài extension. Không cần backend. Không gửi dữ liệu đi đâu cả — toàn bộ code nằm ngay trong bookmark, chạy 100% trong trình duyệt của bạn, trên đúng trang YouTube bạn đang mở.

👉 **[Trang cài đặt từng bước](https://tinlh2407-netizen.github.io/yt-transcript-bookmarklet/)** — copy-paste 1 đoạn mã vào Bookmark Manager, 2 phút, không cần biết code.

---

## Vấn đề

YouTube có transcript, nhưng lấy nó ra dùng lại rất phiền: phải mở panel transcript, copy từng đoạn dính timestamp, dọn tay từng dòng "00:12", "Show transcript", số thứ tự rác... Tốn vài phút mỗi video nếu làm thủ công.

## Cách hoạt động

1. Mở video YouTube bất kỳ (có transcript).
2. Bấm bookmarklet trên thanh bookmark.
3. Nó tự tìm và mở panel transcript nếu chưa mở, đợi transcript load, tự dọn sạch timestamp/rác, và hiện popup với nội dung sẵn để bấm **Copy**.
4. Dán vào Google Docs, Claude, Notion, ChatGPT... tùy bạn.

Không lưu trữ, không gọi API ngoài, không theo dõi hành vi. Mã nguồn đầy đủ nằm trong [`bookmarklet.js`](./bookmarklet.js) — đọc được, audit được.

## Vì sao cài bằng copy-paste, không kéo-thả?

Toàn bộ code (~6.600 ký tự) nằm ngay trong URL của bookmark — không tải gì từ ngoài về (YouTube chặn script domain ngoài bằng Content-Security-Policy, nên kiến trúc "loader tải code từ CDN" không hoạt động được trên YouTube). URL dài như vậy khi **kéo-thả** dễ bị một số trình duyệt cắt cụt giữa chừng → bookmark hỏng im lặng, bấm không thấy gì. **Copy-paste qua Bookmark Manager** giữ nguyên vẹn 100% — đây là cách cài chính thức. Trang cài đặt có hướng dẫn từng bước kèm nút copy sẵn.

## Bấm bookmark mà không thấy gì?

Thứ tự xử lý:

1. Cuộn xuống phần **mô tả video** (bấm "...more" / "Xem thêm").
2. Tìm và bấm nút **"Show transcript"** / **"Hiện bản chép lời"** — panel transcript sẽ mở bên phải video.
3. **Bấm bookmark lại lần nữa** — lần này chắc chắn lấy được.
4. Nếu video không có nút "Show transcript" → YouTube chưa có transcript cho video đó, tool không thể lấy.
5. Nếu vẫn không được: right-click bookmark → Edit → kiểm tra ô URL phải bắt đầu bằng `javascript:` và kết thúc bằng `%3B`. Bị cắt cụt → xóa, cài lại bằng copy-paste.

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

*Được build bằng AI, bởi một người không viết code chuyên nghiệp — mình là dân strategic planning, dùng Claude làm công cụ build. Theo dõi hành trình build sản phẩm bằng AI và các bài phân tích/phỏng vấn dài tại **[The Great Interviews](https://thegreatinterviews.substack.com/)**.*

---

# English

**A single bookmarklet — grab a clean YouTube transcript, no ads, no timestamps, ready to paste anywhere.**

No extension to install. No backend. No data leaves your browser — the entire code lives inside the bookmark itself and runs 100% client-side, on the YouTube page you already have open.

👉 **[One-click install](https://tinlh2407-netizen.github.io/yt-transcript-bookmarklet/)**

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

*Built with AI by a non-engineer — I work in strategic planning, and use Claude as my build tool. I write long-form interview essays and share the AI-build journey at **[The Great Interviews](https://thegreatinterviews.substack.com/)**.*
