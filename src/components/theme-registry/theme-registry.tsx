"use client";
import * as React from "react";
import NextAppDirEmotionCacheProvider from "./emotion-cache";
import ThemeProvider from "../../theme";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
