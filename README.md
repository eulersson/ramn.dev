Personal project and portfolio site. I wanted it to reflect both my background
in **computer graphics** and my experience with **full-stack architecture**.

---

> A overview of the efforts behind the project to offer insight, inspiration,
> or to be used as reference for others—_How nice would that be!_

## Interactive Physics

The `WebGL` hero section was built from scratch, featuring a custom, no-library
**vanilla physics solver** based on [this white
paper](http://www.cs.cmu.edu/afs/cs/academic/class/15462-s13/www/lec_slides/Jakobsen.pdf),
commonly used in video games.

## Curtain Navigation

I designed a creative navbar that "floats" and swipes through sections as you
scroll the page. It involved several challenges—especially when handling
**sticky elements** like the careers section on narrow screens where the navbar
layout becomes vertical.

## Dynamic Content

The **experience** section is powered by `JSON` files, and the **projects** are
written in `MDX` files. These include metadata for generating project listings
and **Open Graph social images**.

## GitHub README Transclusion

Each project page includes personal reflections—such as motivation and
context—while **dynamically embedding** the corresponding GitHub `README.md` to
document technical details without duplication.

## Modal Parallel Routes

I implemented **modals with parallel routing**, allowing users to browse through
projects without triggering full route changes or page reloads.

## Dynamic Social Images

Project metadata in the `MDX` files is used to generate **dynamic Open Graph
images** for better sharing and visibility on social platforms.

## Complex Background Tile Layout

The website is designed around **interactive, animated tiles**, with a
responsive spacing system that adapts proportionally based on tile size—offering
a clean and consistent grid layout across devices.

## Look and Feel

The visual design reflects my personality and engineering mindset—**everything
measured, squared, and aligned**. The themes, especially the dark mode, take
inspiration from **technical blueprints** and architectural drafts.

Simultaneously I wanted to have echoes from my background with is <Hi>Computer
Graphics for the VFX Industry</Hi>, which can be seen in places such as:

- **Physics animation** in the hero section.
- **Film strip** and **3D animated** cubes in the projects section.

## Orchestrated Animations

I used [motion.dev](https://motion.dev/) (formerly `Framer Motion`) to build
**precise and orchestrated animations**, aiming to make the UI feel fluid,
responsive, and intentional.

## Mocked-Up Showcasing

Interactive components were designed to showcase web application screens as they
would appear on a laptop device. Features include **screen transitions on
hover**, **fullscreen (maximized) view on click**, and **keyboard navigation**
to cycle through each screen—offering an intuitive and dynamic way to explore
the UI.
