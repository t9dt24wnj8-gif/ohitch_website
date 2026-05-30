import { b as createComponent, m as maybeRenderHead, g as renderTemplate, r as renderComponent, f as renderSlot, e as renderHead, a as addAttribute, c as createAstro } from './astro/server_BUiRGs7h.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="site-header"> <div class="container header-inner"> <a class="brand" href="/"> <img src="/assets/images/logo_image.gif" alt="Oliver Hitchens logo" class="logo"> <span class="name">Oliver Hitchens</span> </a> <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="main-nav"> <span class="sr-only">Toggle navigation</span> <span class="nav-icon"><span></span><span></span><span></span></span> </button> <nav id="main-nav" class="main-nav" aria-label="Main navigation"> <a href="/">Engineering</a> <a href="/research">Research</a> <a href="/ep-video-archive">EP Video Archive</a> </nav> </div> </header>`;
}, "/Users/Ollie/git/ohitch_website/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer"> <div class="container"> <p>© Oliver Hitchens</p> </div> </footer>`;
}, "/Users/Ollie/git/ohitch_website/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title = "", description = "" } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>', '</title><meta name="description"', '><meta name="theme-color" content="#000000"><link rel="icon" href="/assets/images/logo_image.gif"><link rel="stylesheet" href="/assets/css/style.css">', "</head> <body> ", " ", " ", '  <script src="/assets/js/main.js" defer><\/script> </body> </html>'])), title, addAttribute(description, "content"), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/Users/Ollie/git/ohitch_website/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };
