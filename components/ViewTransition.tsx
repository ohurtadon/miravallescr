import * as React from "react";

type ViewTransitionClassPerType = Record<"default" | (string & {}), "none" | "auto" | (string & {})>;
type ViewTransitionClass = ViewTransitionClassPerType | ViewTransitionClassPerType[string];

type ViewTransitionProps = {
  children?: React.ReactNode;
  name?: string;
  className?: ViewTransitionClass;
  default?: ViewTransitionClass;
  enter?: ViewTransitionClass;
  exit?: ViewTransitionClass;
  share?: ViewTransitionClass;
  update?: ViewTransitionClass;
};

/**
 * The Next.js version pinned here bundles an experimental React channel that still
 * exports this as `unstable_ViewTransition` (not yet the stable `react/canary` name),
 * so this file is the single place that reaches into the untyped runtime export.
 */
export const ViewTransition = (
  React as unknown as { unstable_ViewTransition: React.ComponentType<ViewTransitionProps> }
).unstable_ViewTransition;
