# UI/UX Design Choices

## Color Scheme

Our color scheme is designed to be modern, clean, and visually appealing, supporting both light and dark modes.

- **Primary Accent:** `#6366F1` (Indigo 500) - Used for interactive elements, highlights, and calls to action.
- **Secondary Accent:** `#10B981` (Emerald 500) - Used for success states, positive indicators, and complementary accents.
- **Text Colors:**
  - Light Mode:
    - Primary Text: `#1F2937` (Gray 900)
    - Secondary Text: `#4B5563` (Gray 600)
  - Dark Mode:
    - Primary Text: `#F9FAFB` (Gray 50)
    - Secondary Text: `#D1D5DB` (Gray 300)
- **Background Colors:**
  - Light Mode:
    - Primary Background: `#F9FAFB` (Gray 50)
    - Secondary Background: `#FFFFFF` (White)
  - Dark Mode:
    - Primary Background: `#111827` (Gray 900)
    - Secondary Background: `#1F2937` (Gray 800)
- **Border/Divider Colors:**
  - Light Mode: `#E5E7EB` (Gray 200)
  - Dark Mode: `#374151` (Gray 700)

## Typography

We will use a modern, sans-serif font stack for readability and a clean aesthetic.

- **Font Family:** `Inter`, `system-ui`, `-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `"Helvetica Neue"`, `Arial`, `"Noto Sans"`, `sans-serif`, `"Apple Color Emoji"`, `"Segoe UI Emoji"`, `"Segoe UI Symbol"`, `"Noto Color Emoji"`
- **Headings:** Bold and prominent for clear hierarchy.
- **Body Text:** Optimized for readability across various screen sizes.

## Glassmorphism Elements

Glassmorphism will be subtly applied to certain UI components to add a modern, translucent, and layered effect. This will typically involve:

- **Background Blur:** `backdrop-filter: blur(10px);`
- **Transparency:** `background-color: rgba(255, 255, 255, 0.15);` (for light elements) or `rgba(0, 0, 0, 0.15);` (for dark elements)
- **Subtle Border:** A thin, semi-transparent border to define the element's edges.
- **Light Shadow:** A soft shadow to give a sense of depth.

**Application Areas:**
- Navbar (already implemented)
- Course cards
- Modals/Pop-ups (future)
- Input fields (subtle effect)

## Icons

We will primarily use SVG icons for scalability and crispness, integrated via Flowbite Svelte or custom SVG assets.
