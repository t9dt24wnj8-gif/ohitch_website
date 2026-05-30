import { b as createComponent, r as renderComponent, g as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BUiRGs7h.mjs';
import 'kleur/colors';
import 'html-escaper';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`import BaseLayout from '../layouts/BaseLayout.astro'
const title = 'Engineering — Oliver Hitchens'
const description = 'Engineering projects and test facilities — Oliver Hitchens.'
---
${renderComponent($$result, "BaseLayout", BaseLayout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<main class="container page-content"><section class="hero-intro"><div class="intro-text"><br><br><h1>Hello, I'm Ollie</h1><p>I'm an engineer working on electric propulsion systems. This site shares a selection of projects, publications and an archive of electric propulsion videos. Take a look around.</p><div class="links-grid" aria-label="Social and professional links"><a href="https://www.linkedin.com/in/oliverhitchens/">LinkedIn</a><a href="https://www.researchgate.net/profile/Oliver_Hitchens">ResearchGate</a><a href="https://orcid.org/0000-0001-8870-7489">ORCiD</a><a href="https://x.com/oliver_hitchens">X/Twitter</a></div></div><figure class="hero-image"><img src="/assets/images/chamber_portrait.jpg" alt="Test chamber portrait"></figure></section><section id="gauss"><br><br><h2>GAUSS (Rocket Lab)</h2><p>Key member of the team developing an in-house hall-effect thruster. Lead Test Engineer — Hall-Effect Thrusters. Responsible Engineer — Hall-Effect Thruster Vacuum Test Facility.</p><p>Significant design contributions to the development of Rocket Lab's GAUSS thruster, a magnetically shielded hall-effect thruster with a coaxial heaterless hollow cathode.</p><figure><img src="/assets/images/GAUSS.gif" alt="GAUSS ignition"><figcaption>Video of GAUSS ignition on a 2 axis slider.</figcaption></figure><div class="video-entry"><div class="youtube-player" data-id="mnMCXzbCjCI" data-title="GAUSS ignition"></div><div class="youtube-player" data-id="UsaoajXERfY" data-title="GAUSS ignition 2"></div></div></section><section id="phd-viva"><br><br><h2>PhD Viva Presentation</h2><p>Recording of my PhD viva open presentation "Performance Increase of Electron Cyclotron Resonance Magnetic Nozzle Thruster Via Magnetically Thickened Resonance Region".</p><div class="video-entry"><div class="youtube-player" data-id="KiUDiWP14og" data-title="PhD Viva Presentation"></div></div></section><section id="large-ecr"><br><br><h2>Large ECR Thruster (PhD Project)</h2><p>Developed an Electron Cyclotron Resonance (ECR) Magnetic Nozzle thruster. Found a novel method for increasing thrust and efficiency.</p><div class="video-entry"><div class="youtube-player" data-id="aOGulPuc-So" data-title="Large ECR test fire"></div></div></section><section id="plasma-toroid"><br><br><h2>Plasma Toroid (Personal Project)</h2><figure><img src="/assets/images/plasma_toroid.gif" alt="Plasma toroid"><figcaption>Plasma Toroid testing, Mar 2023.</figcaption></figure></section><section id="small-ecr"><br><br><h2>Small ECR Thruster (PhD Project)</h2><p>Investigated effects of magnetic field strength gradient on electron power absorption.</p><div class="side-by-side"><figure><img src="/assets/images/small_ecr.jpg" alt="Small ECR test"><figcaption>Test fire of the small Electron Cyclotron Resonance (ECR) thruster.</figcaption></figure><figure><img src="/assets/images/ecr_infographic.jpg" alt="ECR infographic"></figure></div></section><section id="rfa-hotfire"><br><br><h2>Rocket Engine Test Rig (Internship)</h2><p>Developed and operated the test rig for Rocket Factory Augsburg’s liquid NM-N2O cryogenic pressure-fed kick stage rocket engine.</p><figure><img src="/assets/images/rfa_hotfire.gif" alt="RFA hotfire"><figcaption>Hot fire of RFA's kick stage engine.</figcaption></figure></section><section id="aquajet"><br><br><h2>AQUAJET (PhD Project)</h2><p>Worked with AVS-UK Ltd. as a test engineer on the AQUAJET thruster.</p><figure><img src="/assets/images/xjet.gif" alt="AQUAJET ignition"><figcaption>Ignition of the AQUAJET Thruster, Feb 2021.</figcaption></figure></section></main>` })}`;
}, "/Users/Ollie/git/ohitch_website/src/pages/index.astro", void 0);

const $$file = "/Users/Ollie/git/ohitch_website/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
