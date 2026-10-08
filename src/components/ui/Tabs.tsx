'use client';

import React, { createContext, useContext } from 'react';

interface TabsContextValue {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Tabs({ value, onValueChange, children, className = '' }: TabsProps) {
  return (
    <TabsContext.Provider value={{ activeTab: value, onTabChange: onValueChange }}>
      <div className={`space-y-6 ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabList({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 border-b border-[var(--color-border)] pb-2 ${className}`}>
      {children}
    </div>
  );
}

export interface TabTriggerProps {
  value: string;
  children: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
}

export function TabTrigger({ value, children, badge, className = '' }: TabTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabTrigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => context.onTabChange(value)}
      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-body uppercase tracking-[0.18em] transition-all cursor-pointer font-medium border-b-2 -mb-2 ${
        isActive
          ? 'border-[var(--color-accent)] text-[var(--color-highlight)] font-semibold'
          : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-highlight)]'
      } ${className}`}
    >
      <span>{children}</span>
      {badge && <span className="shrink-0">{badge}</span>}
    </button>
  );
}

export function TabContent({ value, children, className = '' }: { value: string; children: React.ReactNode; className?: string }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabContent must be used within Tabs');

  if (context.activeTab !== value) return null;

  return <div className={`animate-in fade-in duration-150 ${className}`}>{children}</div>;
}
