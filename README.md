# Two-Phase Relationship Navigator

A lightweight, interactive web tool designed to help users analyze relationship dynamics and generate actionable communication strategies. Inspired by professional interpersonal frameworks, it guides users through a two-step analytical process.

## 🌟 Features

* **Phase 1: Quick Narrow-down**
    * Evaluates the relationship based on three core dimensions: **Power** (Bottom-up, Peer, Top-down), **Goal** (Instrumental, Shared), and **Boundary** (Formal, Informal).
* **Phase 2: Precise Positioning**
    * Maps the relationship on a 3x3 interactive matrix intersecting **Proximity** (Close, Neutral, Distant) with **Trust** (Low, Conditional, High).
* **Phase 3: Strategy Output**
    * Generates a tailored strategy containing the core insight.
    * Provides specific **Recommended Mechanics** and **Mechanics to Avoid**.
    * Flags potential **Conflict Signals** based on contradictory dimensions.
    * *Bonus:* Automatically generates an AI prompt for creating specific dialogue scripts based on the selected matrix.

## 🚀 How to Use (Local)

This tool is entirely client-side. No build tools, frameworks, or backend servers are required.

1.  Clone or download this repository.
2.  Simply open the `navigator.html` file in any modern web browser (Chrome, Firefox, Safari, Edge).

## 🛠️ Tech Stack

* **HTML5:** Semantic structure.
* **CSS3:** Custom variables (CSS properties) for a clean, modern, and soothing UI palette (Claude-style UI). Responsive and flexible.
* **Vanilla JavaScript (ES6+):** Handles state management, DOM manipulation, and dynamic rendering of strategy outputs without any external libraries.

## ⚙️ Customization

If you want to modify the strategies or add new rules, you can easily edit the `STRATS` and `CONFLICT_CHECKS` objects directly inside the `<script>` tag of the `navigator.html` file. 

* `STRATS`: Contains the arrays for `add` (Do's) and `avoid` (Don'ts) for every dimension and matrix cell.
* `CONFLICT_CHECKS`: Contains the logical rules for triggering warning messages when incompatible relationship dynamics are selected.

## 🌐 Deployment

You can host this tool for free using any static site hosting service:
* [GitHub Pages](https://pages.github.com/) (Recommended)
* [Netlify Drop](https://app.netlify.com/drop)
* [Vercel](https://vercel.com/)
