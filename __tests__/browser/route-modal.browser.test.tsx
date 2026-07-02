import {
  AppRouterContext,
  type AppRouterInstance
} from "next/dist/shared/lib/app-router-context.shared-runtime";

import { expect, test, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";

import { Dialog, DialogContent, DialogHeader } from "@/components/dialog";

import ConnectDialog from "@/app/@modal/_components/connect-dialog";
import ConnectDrawer from "@/app/@modal/_components/connect-drawer";
import { useRouteModal } from "@/hooks/use-route-modal";

import "@/app/global.css";

function createStubRouter(overrides: Partial<AppRouterInstance> = {}): AppRouterInstance {
  return {
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    bfcacheId: "test",
    ...overrides
  };
}

// Standalone-page shape (project-experience.tsx non-intercepted path): no entry
// flip, onClosed overrides router.back.
function HardMountFixture({ onClosed }: { onClosed: () => void }) {
  const { open, onOpenChange, onOpenChangeComplete } = useRouteModal({
    animateIn: false,
    onClosed
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
      <DialogContent>
        <DialogHeader>Standalone</DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function trackTransitions() {
  const runs: string[] = [];
  const listener = (event: Event) => {
    runs.push((event as TransitionEvent).propertyName);
  };
  document.addEventListener("transitionrun", listener, { capture: true });

  return {
    runs,
    stop: () => document.removeEventListener("transitionrun", listener, { capture: true })
  };
}

test("connect dialog mounts closed and runs an entry transition", async () => {
  const router = createStubRouter();
  const transitions = trackTransitions();

  render(
    <AppRouterContext.Provider value={router}>
      <ConnectDialog />
    </AppRouterContext.Provider>
  );

  // mounted closed: popup is not in the DOM on first paint
  expect(document.querySelector("[role=dialog]")).toBeNull();

  await expect.poll(() => document.querySelector("[role=dialog]")).not.toBeNull();
  await expect.poll(() => transitions.runs.length).toBeGreaterThan(0);

  transitions.stop();
});

test("connect dialog defers router.back until the exit transition completes", async () => {
  const router = createStubRouter();

  render(
    <AppRouterContext.Provider value={router}>
      <ConnectDialog />
    </AppRouterContext.Provider>
  );

  await expect.poll(() => document.querySelector("[role=dialog]")).not.toBeNull();

  await userEvent.keyboard("{Escape}");

  // close initiated: exit transition running, navigation must not have happened yet
  expect(document.querySelector("[role=dialog]")?.hasAttribute("data-ending-style")).toBe(true);
  expect(router.back).not.toHaveBeenCalled();

  await expect.poll(() => (router.back as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
  expect(document.querySelector("[role=dialog]")).toBeNull();
});

test("connect drawer mounts closed, animates in, and defers router.back on close", async () => {
  const router = createStubRouter();
  const transitions = trackTransitions();

  render(
    <AppRouterContext.Provider value={router}>
      <ConnectDrawer />
    </AppRouterContext.Provider>
  );

  expect(document.querySelector("[role=dialog]")).toBeNull();

  await expect.poll(() => document.querySelector("[role=dialog]")).not.toBeNull();
  // Tailwind v4 translate-y-full animates the CSS `translate` property
  await expect.poll(() => transitions.runs).toContain("translate");
  transitions.stop();

  await userEvent.keyboard("{Escape}");

  expect(router.back).not.toHaveBeenCalled();
  await expect.poll(() => (router.back as ReturnType<typeof vi.fn>).mock.calls.length).toBe(1);
});

test("animateIn: false hard mounts (no entry transition) and onClosed overrides router.back", async () => {
  const router = createStubRouter();
  const onClosed = vi.fn();
  const transitions = trackTransitions();

  render(
    <AppRouterContext.Provider value={router}>
      <HardMountFixture onClosed={onClosed} />
    </AppRouterContext.Provider>
  );

  await expect.poll(() => document.querySelector("[role=dialog]")).not.toBeNull();

  // no entry flip: popup mounted already open, so no entry transition ran
  expect(transitions.runs).toHaveLength(0);
  transitions.stop();

  await userEvent.keyboard("{Escape}");

  await expect.poll(() => onClosed.mock.calls.length).toBe(1);
  expect(router.back).not.toHaveBeenCalled();
});
