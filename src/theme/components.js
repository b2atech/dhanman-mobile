import { spacing, layout } from './spacing';

// Component style definitions that can be themed
export const createComponentStyles = (colors) => ({
  // Card styles with consistent spacing and shadows
  card: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderPrimary,
    ...layout.elevation.sm,
    shadowColor: colors.shadow,
  },
  
  // Section header style (subtle as per requirements)
  sectionHeader: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textTertiary, // Subtle, non-prominent
    marginBottom: spacing.xs,
  },
  
  // Button styles
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: layout.borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...layout.elevation.sm,
    shadowColor: colors.shadow,
  },
  
  secondaryButton: {
    backgroundColor: colors.backgroundPrimary,
    borderRadius: layout.borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSecondary,
  },
  
  // Floating Action Button
  fab: {
    position: 'absolute',
    bottom: spacing['4xl'],
    right: spacing.lg,
    width: layout.fabSize,
    height: layout.fabSize,
    borderRadius: layout.fabSize / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...layout.elevation.lg,
    shadowColor: colors.shadow,
  },
  
  // Icon circle (for pending dues, etc.)
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimary,
  },
  
  // Avatar/Profile image placeholder
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Visitor avatars
  visitorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  
  // Badge/notification indicator
  badge: {
    backgroundColor: '#FF3B30', // Always red for notifications
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  
  // Input field styles
  input: {
    borderWidth: 1,
    borderColor: colors.borderSecondary,
    borderRadius: layout.borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundPrimary,
  },
  
  // Divider/separator
  divider: {
    height: 1,
    backgroundColor: colors.borderPrimary,
    marginVertical: spacing.md,
  },
});

// Linear gradient configurations
export const createGradients = (colors) => ({
  // Background gradient
  background: {
    colors: [colors.backgroundPrimary, colors.backgroundTertiary],
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
  },
  
  // Card gradient
  card: {
    colors: [colors.backgroundPrimary, colors.surface],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
  
  // Header gradient
  header: {
    colors: [colors.backgroundTertiary, colors.surface],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },
  
  // Top-right SVG gradient (as mentioned in requirements)
  topRightAccent: {
    colors: [colors.primaryUltraLight, colors.surface],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
});