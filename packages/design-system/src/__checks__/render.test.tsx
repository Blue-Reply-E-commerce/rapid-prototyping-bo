import assert from "node:assert/strict";
import test from "node:test";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../index";

test("Button renders shared operational variants", () => {
  const markup = renderToStaticMarkup(
    <Button size="sm" variant="secondary">
      Filter orders
    </Button>
  );

  assert.match(markup, /data-slot="button"/);
  assert.match(markup, /border-line/);
  assert.match(markup, /Filter orders/);
});

test("Card renders shared structure slots", () => {
  const markup = renderToStaticMarkup(
    <Card>
      <CardHeader>
        <CardTitle>Preview guarantees</CardTitle>
        <CardDescription>Mock-only checks</CardDescription>
      </CardHeader>
      <CardContent>Deterministic local dashboard content.</CardContent>
    </Card>
  );

  assert.match(markup, /data-slot="card"/);
  assert.match(markup, /data-slot="card-header"/);
  assert.match(markup, /data-slot="card-content"/);
  assert.match(markup, /Preview guarantees/);
});
