# Website Generation Instructions

This folder "reference_material" is temporary input used to generate a complete static website.

After the website is generated, this folder will be deleted and must NOT be relied on in the final project.

---

## 1. Goal

Create a fast, modern, static website based on the contents of the reference_material folder.

The final site will be deployed to:
- GitHub
- Cloudflare Pages

No backend or server-side logic should be required.

---

## 2. Input Structure

Each subfolder inside `reference_material/` represents one page.

Each page may contain:
- content file (Markdown)
- images folder
- optional metadata or notes

---

## 3. Output Requirements

Generate a complete Astro static site (preferred) or equivalent HTML/CSS/JS site.

Must include:
- full folder structure
- all files required for deployment
- reusable layout system
- navigation between pages
- mobile responsive design
- SEO meta tags

No partial output is allowed.

---

## 4. Design Style

- clean, minimal, engineering-focused aesthetic
- modern typography
- simple layout hierarchy
- high readability
- no unnecessary animation or bloat

---

## 5. Performance Requirements

The site must be highly performant.

Special requirement:

### YouTube Video Page

One page will contain ~30 YouTube videos split into 5 categories.

Must implement:

- 5 collapsible dropdown sections (accordion UI)
- videos must NOT be embedded on initial page load
- only thumbnails should load initially
- YouTube iframe must only load when a video is clicked
- ensure minimal network and JS overhead

Goal: fast initial load even with many videos.

this ethos should be the same for youtube videos on other pages of the site too

---

## 6. Content Rules

- Use provided content where available
- If content is missing, use placeholders like [TODO: add text]
- Do not discard sections due to missing data
- Preserve structure even if incomplete

---

## 7. Engineering Constraints

- No unnecessary frameworks
- Prefer Astro static output
- No backend/server code
- Clean reusable components
- Avoid duplication (e.g. shared layout for nav/footer)

---

## 8. Final Behaviour

After generating the site:
- reference_material folder will be deleted
- final website must be fully self-contained
- no dependency on input folder

---

## 9. Output Format Required from AI

1. Project folder structure
2. Full code for every file
3. Deployment instructions for GITHub and Cloudflare Pages


---

## 10. 

- the top banner should contain my logo (logo_image/logo_image.gif) and my name (Oliver Hitchens) as well as links to all the pages on my site.
- My logo is also my favicon.
- the top banner should also have a search function that allows people to search for any words on my site and go to where they are. This will be specifically useful because in the "EP Video Archive" section, there will be many thrusters that people may want to search for.


---

## 11. 

- for each thruster (of which there are many) I have the following template:

heading: ...

text: ...

small italic text: ...

embedd: ...
