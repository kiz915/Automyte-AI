---
name: Digital Blueprint
colors:
  surface: '#f9f9f6'
  surface-dim: '#dadad7'
  surface-bright: '#f9f9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f1f1ee'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#005db7'
  on-secondary: '#ffffff'
  secondary-container: '#5499fd'
  on-secondary-container: '#003064'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#a9c7ff'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#00468c'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#f9f9f6'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e0'
  surface-muted: '#F5F5F2'
  border-subtle: '#E5E5E5'
  success-leaf: '#22C55E'
  error-alert: '#EF4444'
typography:
  display-hero:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-xs:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-v-desktop: 120px
  section-v-mobile: 64px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
---

## Brand & Style

This design system embodies the **Professional Orchestrator** persona. It balances the precision of an Operating System with the nostalgic, tactile charm of pixel-art illustrations. The aesthetic is a sophisticated mix of **Modern Corporate** and **Lo-Fi Technical**, designed to evoke a sense of high-fidelity automation that remains approachable and human-centric.

The visual narrative centers on "The Blueprint"—a clean, structured environment where complex agent workflows are rendered with absolute clarity. We use generous whitespace, a strictly neutral foundation, and high-contrast typography to ensure the product feels like a reliable tool for serious business infrastructure. The pixel-art elements serve as a "visual hearth," softening the technical edge of the AI automation and grounding the product in a creative, builder-focused culture.

## Colors

The palette is anchored by a "warm-white" neutral base (`#FBFBF8`) which provides a more comfortable, paper-like reading experience than pure white. 

- **Primary:** A deep, near-black used for all high-emphasis text and primary UI actions to convey authority.
- **Secondary:** A technical blue used sparingly for interactive highlights, links, and system indicators.
- **Backgrounds:** Utilize `surface-muted` for card backgrounds and section differentiation to create a layered "sheet" effect.
- **Accents:** Vibrant success and error colors are reserved for data visualization and status indicators within agent logs. 
- **Pixel Art:** The colors within pixel illustrations should remain distinct from the UI palette, introducing organic greens and sky blues to contrast against the monochromatic interface.

## Typography

This system uses a tiered typographic approach to separate brand messaging from technical utility.

1.  **Headlines (Hanken Grotesk):** Provides a clean, sharp, and modern feel for large-scale marketing copy.
2.  **Body (Inter):** Chosen for its exceptional legibility in dense dashboard environments and descriptive paragraphs.
3.  **Utility & Meta (JetBrains Mono):** Used for agent logs, status badges, and technical metadata. This reinforces the "AI operating system" aesthetic and differentiates automated outputs from human-written content.

Keep line lengths for body text between 60-75 characters for optimal readability.

## Layout & Spacing

The layout follows a **Fixed Grid** model within a centered 1280px container. We use a strict 8px base unit for all internal component spacing and a 12-column grid for desktop views.

- **Generous Breathing Room:** High-level sections are separated by significant vertical padding to allow the pixel-art assets and text to coexist without feeling cluttered.
- **Card-Based Reflow:** On mobile, grid-based card layouts (like the Chapter cards) reflow into a single-column stack.
- **UI Windows:** Mockup elements should use consistent internal padding (24px to 32px) to maintain the "Blueprint" look.

## Elevation & Depth

This design system utilizes a **Tonal Layering** approach supplemented by **Low-contrast outlines**. 

- **Surface Levels:** The primary background is the neutral foundation. Secondary "sheets" or cards use a slightly different tint or a pure white fill to indicate elevation.
- **Shadows:** Avoid heavy drop shadows. Use a single, highly-diffused ambient shadow (`0 4px 20px rgba(0,0,0,0.04)`) exclusively for floating elements like pop-overs or active task cards.
- **Strokes:** Use 1px borders in `border-subtle` to define structure within the dashboard mockups. This "blueprint" line-work is the primary driver of hierarchy rather than depth.

## Shapes

The shape language is disciplined and "Soft-Industrial." 

- **Components:** Standard buttons and input fields use a tight 4px-6px radius to maintain a professional, high-end tool feel.
- **Containers:** Dashboard windows and large feature cards use a more pronounced 12px radius to soften the layout and frame the internal content.
- **Status Dots:** Success/Error indicators are always perfect circles to contrast against the rectangular grid.

## Components

### Buttons
- **Primary:** Solid black fill with white text. Sharp corners (4px). High contrast.
- **Secondary:** Transparent fill with 1px black border. Used for secondary actions like "Learn More."
- **Ghost:** No border or fill, primary text color. Used for navigation and tertiary actions.

### Cards & Sheets
- Cards should have a white background and a subtle `border-subtle` stroke. 
- In the "Agentic Departments" view, cards should use the `surface-muted` background to denote they are part of a larger container.

### Status Badges (Monospaced)
- Use `label-xs` typography. Small colored dot to the left of the text. 
- Background should be a very pale version of the status color (e.g., 10% opacity) or no background at all, relying on the dot and label.

### Form Inputs
- Minimalist design. Bottom border only or a very light 4-sided stroke. 
- Focus state uses the secondary blue color for the border.

### Visual Illustrations
- Pixel-art landscapes should always be full-bleed or framed in wide aspect ratios to act as a "window" out of the clinical UI.
- Use the pixel-art style for "Human in the Loop" indicators to represent human agents.