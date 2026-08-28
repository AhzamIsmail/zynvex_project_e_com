# Component APIs & Properties: Initial UI Structure

Since this module is a UI/structure-only layout foundation without an API backend, the "data model" is represented by the TypeScript interface specifications for our UI primitives and layout components.

## UI Primitives

### 1. Button
Represents a customizable action trigger.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

### 2. Card
A wrapper to group related visual items.

```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footerContent?: React.ReactNode;
}
```

### 3. Input
A labeled, validated form entry field.

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
```

### 4. Badge
A colored status marker.

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'info';
}
```

### 5. Modal
An overlay dialog display locking scroll.

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

## Layout Elements

### 1. PageContainer
Wraps viewport grids, setting standard widths and margin constraints.

```typescript
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}
```

### 2. Sidebar
Controls dashboard menu navigation links.

```typescript
interface SidebarProps {
  currentView?: string;
  onViewChange?: (view: string) => void;
}
```
