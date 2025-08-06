# Visual Design Description - Resident Home Dashboard

## Layout Overview

```
┌─────────────────────────────────────────┐
│ StatusBar (light background)           │
├─────────────────────────────────────────┤
│                                         │
│  Good Morning          🔔² [👤]        │  ← Welcome Header
│  John                                   │    (Large typography)
│  Unit A-101                             │
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Summary                         📈 │ │  ← Summary Card
│ │                                   │ │    (White card with shadow)
│ │ 💰 ₹2,450      👥 3              │ │
│ │ Monthly Dues    Visitors Today    │ │
│ │ ↓ Due Jan 15    ↑ 1 pending      │ │
│ │                                   │ │
│ │ 🎫 2           📅 2              │ │
│ │ Open Tickets    Events            │ │
│ │ 8 resolved      this week         │ │
│ └─────────────────────────────────────┘ │
│                                         │
├─────────────────────────────────────────┤
│ Quick Actions                           │  ← Section Title
│                                         │
│ ┌──────────┐  ┌──────────┐             │  ← Quick Action Cards
│ │    👥    │  │    🎫    │             │    (Pastel backgrounds)
│ │  Invite  │  │  Create  │             │
│ │  Guest   │  │  Ticket  │             │
│ └──────────┘  └──────────┘             │
│                                         │
│ ┌──────────┐  ┌──────────┐             │
│ │    💰    │  │    ➤     │             │
│ │   Pay    │  │  View    │             │
│ │   Dues   │  │   All    │             │
│ └──────────┘  └──────────┘             │
│                                         │
├─────────────────────────────────────────┤
│ ┌─────────────────────────────────────┐ │
│ │ Upcoming Events          View All  │ │  ← Events Card
│ │                                   │ │    (White card)
│ │ Community Meeting                 │ │
│ │ 📅 Jan 20  🕙 10:00 AM  📍 Hall  │ │
│ │                                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│                                    ┌─┐ │  ← Floating Action Button
│                                    │+│ │    (Lavender, bottom right)
│                                    └─┘ │
└─────────────────────────────────────────┘
```

## Color Scheme

### Background
- **Main Background**: Soft gradient from #FFFFFF to #F8FAFC
- **Card Backgrounds**: Pure white (#FFFFFF) with lavender shadows
- **Section Backgrounds**: Off-white (#FAFAFA)

### Primary Elements
- **Headers**: Lavender Mist (#A78BFA)
- **Icons**: Lighter Navy (#4F46E5) - no full black
- **Text Primary**: Slate (#334155)
- **Text Secondary**: Gray (#64748B)

### Quick Action Cards
- **Invite Guest**: Pastel Mint (#D1FAE5)
- **Create Ticket**: Muted Gold (#F3E8D3)
- **Pay Dues**: Ultra Light Lavender (#EDE9FE)
- **View All**: Off-White (#FAFAFA)

### Status Indicators
- **Success/Up Trend**: Green (#10B981)
- **Error/Down Trend**: Red (#EF4444)
- **Neutral**: Tertiary Gray (#94A3B8)

## Typography Hierarchy

```
Hero Text (User Name):     28px, Bold, Slate
Section Titles:            20px, SemiBold, Slate
Card Values:               20px, Bold, Slate
Card Labels:               12px, Medium, Gray
Body Text:                 16px, SemiBold, Slate
Caption Text:              12px, Regular, Light Gray
Greeting Text:             14px, Regular, Gray
```

## Spacing & Layout

### Generous Whitespace
- **Section Padding**: 32px horizontal, 48px vertical
- **Card Padding**: 32px all sides
- **Element Spacing**: 24px between major elements
- **Icon Spacing**: 12px from text

### Card Design
- **Border Radius**: 18px for large cards, 16px for action cards
- **Shadow**: Subtle lavender-tinted shadows (rgba(160, 139, 250, 0.08))
- **Elevation**: 2-8 depending on hierarchy

### Interactive Elements
- **Touch Targets**: Minimum 44x44 points
- **Button Heights**: 56px for FAB, 120px for action cards
- **Active States**: 0.8 opacity on press

## Iconography

All icons use FontAwesome with consistent sizing:
- **Large Icons**: 24px (action cards, FAB)
- **Medium Icons**: 20px (navigation, status)
- **Small Icons**: 18px (summary stats)
- **Micro Icons**: 12px (event details, trends)

## Animation & Interaction

### Micro-Interactions
- **Card Press**: Scale down to 0.98 with 0.8 opacity
- **FAB Press**: Slight bounce effect
- **Loading States**: Skeleton placeholders with lavender tints

### Transitions
- **Navigation**: Slide transitions between screens
- **Data Updates**: Fade in/out for number changes
- **Chart Animations**: Progressive line drawing

## Accessibility Features

### Color Contrast
- All text meets WCAG 2.1 AA standards
- Icons have sufficient contrast against backgrounds
- No color-only information conveyance

### Text Scaling
- Supports iOS/Android dynamic type
- Maintains layout integrity at 200% scale
- Preserves touch target sizes

### Visual Hierarchy
- Clear size and weight differences
- Logical reading order
- Semantic color usage (red = error, green = success)

This design achieves the requested minimal, spacious aesthetic while maintaining functionality and accessibility. The lavender mist theme creates a calm, modern feel appropriate for a residential management app.