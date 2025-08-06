# Resident Home Dashboard

A minimal, elegant dashboard screen for the Dhanman mobile app featuring the Lavender Mist theme with generous whitespace and clean design.

## Features

### 🎨 Design Philosophy
- **Minimal & Spacious**: Generous whitespace and large, readable typography
- **Lavender Mist Theme**: Primary color #A78BFA with supporting pastel tones
- **No Full Black**: Uses lighter navy (#4F46E5) for contrast instead
- **Soft Gradients**: Clean card designs with subtle gradient backgrounds

### 🏠 Dashboard Components

#### Welcome Header
- Personalized greeting based on time of day
- User name and unit number display
- Profile avatar placeholder
- Notification bell with badge indicator

#### Summary Card
- Monthly dues with due date and trend indicators
- Visitor statistics (today's count, pending approvals)
- Ticket status (open vs resolved)
- Upcoming events counter
- Mini chart visualization using react-native-gifted-charts

#### Quick Actions Grid
- **Invite Guest**: Navigate to guest invitation flow
- **Create Ticket**: Open ticket creation screen
- **Pay Dues**: Access payment interface
- **View All**: See comprehensive overview

#### Upcoming Events
- Event listings with date, time, and location
- Clean card layout with FontAwesome icons
- "View All" link for complete event calendar

#### Floating Action Button (FAB)
- Context-aware quick actions
- Positioned for easy thumb access
- Lavender shadow for visual depth

### 🎨 Color Palette

```javascript
// Primary Colors
primary: '#A78BFA',           // Lavender Mist
primaryLight: '#C4B5FD',      // Light Lavender
primaryUltraLight: '#EDE9FE', // Ultra Light Lavender

// Supporting Pastels
offWhite: '#FAFAFA',          // Off-white background
mutedGold: '#F3E8D3',         // Muted gold accents
pastelMint: '#D1FAE5',        // Pastel mint for success
lighterNavy: '#4F46E5',       // Lighter navy (no full black)

// Text Colors
textPrimary: '#334155',       // Primary text
textSecondary: '#64748B',     // Secondary text
textTertiary: '#94A3B8',      // Tertiary text
textAccent: '#6366F1',        // Accent text
```

### 📐 Spacing System

The theme uses a generous spacing system for a minimal feel:

```javascript
spacing: {
  xs: 6,    // Tight spacing
  sm: 12,   // Small spacing
  md: 24,   // Medium spacing (increased)
  lg: 32,   // Large spacing (increased)
  xl: 48,   // Extra large (increased)
  xxl: 64,  // Extra extra large (increased)
}
```

### 🔧 Technical Implementation

#### File Structure
```
src/screens/UserHome/
├── ResidentHomeDashboard.js           # Main dashboard component
├── ResidentHomeDashboardDemo.js       # Standalone demo
└── Components/
    ├── WelcomeHeader.js               # Header with greeting & profile
    ├── SummaryCard.js                 # Stats overview with charts
    ├── QuickActionCard.js             # Action buttons
    └── UpcomingEventsCard.js          # Events listing

src/commonStyles/
└── residentTheme.js                   # Complete theme system
```

#### Dependencies
- `react-native-linear-gradient`: Soft gradient backgrounds
- `react-native-gifted-charts`: Mini chart visualizations
- `@fortawesome/react-native-fontawesome`: Consistent icons
- `react-native-vector-icons`: Additional icon support

#### Props & Configuration

**ResidentHomeDashboard**
```javascript
{
  navigation: NavigationProp,  // React Navigation object
  fcmToken: string,           // Firebase Cloud Messaging token
}
```

**Summary Data Structure**
```javascript
summaryData = {
  dues: {
    amount: 2450,
    status: 'pending',
    dueDate: '2024-01-15',
  },
  visitors: {
    today: 3,
    pending: 1,
    approved: 2,
  },
  tickets: {
    open: 2,
    resolved: 8,
    total: 10,
  },
  events: {
    upcoming: 2,
    thisWeek: 4,
  },
}
```

### 🔗 Navigation Integration

Added to `MainRoute.tsx` as a new tab:

```javascript
<Tab.Screen name="Resident Dashboard">
  {(props) => <ResidentHomeDashboard {...props} fcmToken={fcmToken} />}
</Tab.Screen>
```

### 📱 Responsive Design

- Uses existing responsive utilities from `src/utils/responsive`
- Adapts to different screen sizes
- Maintains generous spacing on all devices
- Touch targets are appropriately sized for mobile interaction

### 🚀 Usage

The dashboard automatically displays when users navigate to the "Resident Dashboard" tab. It integrates with the existing authentication context to show personalized information.

```javascript
import ResidentHomeDashboard from './src/screens/UserHome/ResidentHomeDashboard';

// Use in navigation
<Stack.Screen 
  name="Dashboard" 
  component={ResidentHomeDashboard} 
/>
```

### 🎯 Accessibility

- Large touch targets (minimum 44x44 points)
- High contrast text on backgrounds
- Semantic color usage (red for errors, green for success)
- Clear visual hierarchy with typography scales
- Icon + text combinations for better comprehension

### 🔮 Future Enhancements

- Real-time data integration with existing APIs
- Pull-to-refresh functionality
- Customizable quick actions
- Dark mode support
- Animation transitions between states
- Accessibility improvements (screen reader support)