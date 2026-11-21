# The public guide

"Building a Game with an AI Partner", a 3-page PDF for anyone making a
game with an AI coding tool, drawn from `WORKFLOW*.md`, and its post
image (0.3.455, D-1019). Not part of the game: nothing here is packed,
loaded or shipped.

| File | What it is |
| --- | --- |
| `Building-a-Game-with-an-AI-Partner.pdf` | the guide, US Letter, 3 pages |
| `post.png` | the post image, 1080 × 1350 |
| `guide.html` | the guide's source page |
| `post.html` | the image's source page |

The shared copy is a view-only Google Drive link, in the owner's Drive.

To rebuild after an edit, with the pre-installed Playwright:

1. Print `guide.html` to the PDF: `page.pdf({ format: 'Letter',
   preferCSSPageSize: true, printBackground: true })`.
2. Draw the PDF's pages beside `post.html` as `pg-1.png` to `pg-3.png`
   (`pdftoppm -r 110 -png <the PDF> pg`).
3. Screenshot `post.html` at 1080 × 1350 to `post.png`, then delete the
   `pg-*.png` files.
