import { b as createComponent, r as renderComponent, g as renderTemplate, e as renderHead } from '../chunks/astro/server_BUiRGs7h.mjs';
import 'kleur/colors';
import 'html-escaper';
export { renderers } from '../renderers.mjs';

const $$Engineering = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`import BaseLayout from '../layouts/BaseLayout.astro'
const title = 'Engineering — Oliver Hitchens'
---
${renderComponent($$result, "BaseLayout", BaseLayout, { "title": title, "description": "" }, { "default": ($$result2) => renderTemplate`<head><meta http-equiv="refresh" content="0; url=/">${renderHead()}</head><main class="container page-content"><p>Redirecting to <a href="/">/</a>…</p></main>` })}`;
}, "/Users/Ollie/git/ohitch_website/src/pages/engineering.astro", void 0);

const $$file = "/Users/Ollie/git/ohitch_website/src/pages/engineering.astro";
const $$url = "/engineering";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Engineering,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
