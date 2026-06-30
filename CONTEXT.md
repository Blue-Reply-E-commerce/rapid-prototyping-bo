# Rapid Prototyping Context

This file defines domain language only. It is not an implementation guide.

## Glossary

### Rapid Prototyping BO

The backoffice application used as the target product for the proof of concept. It is the real frontend application that v0, and later the Rapid Prototyping Portal, will modify during prototyping while previews remain independent from real backend services.

### Rapid Prototyping Portal

The planned custom prototyping portal for requesting changes to connected applications such as the Rapid Prototyping BO. It is a future orchestration layer for v0-powered change requests, not the backoffice application itself.

### Backoffice

An internal operational interface for managing business workflows, entities, dashboards, and administrative tasks.

### Order

An operational record shown in the Rapid Prototyping BO to represent a business request or transaction in a deliberately generic domain. It has a single monetary total rather than line items and does not model customer identity.
_Avoid_: Purchase, transaction, prototype request, customer order

### Order History

The collection of orders available for review in the Rapid Prototyping BO. It is a business history view, not a queue of prototype work or delivery handoffs.
_Avoid_: Prototype queue, work queue

### Read-Only Order

An order that can be viewed in Order History but not changed from the Rapid Prototyping BO. Operational actions such as cancellation, retry, or completion are separate concepts.
_Avoid_: Editable order, order action

### Order Summary

A small set of aggregate counts shown above Order History to help operators understand the current order mix. It is intentionally lightweight and should not become a full analytics dashboard.
_Avoid_: Analytics dashboard, reporting suite

### Order Filter

A simple constraint applied to Order History. The current scope supports filtering by order status and searching by text; date ranges, pagination, and saved views are outside the initial scope.
_Avoid_: Advanced search, saved view

### Order Status

The lifecycle state of an order shown in Order History. Supported states are submitted, processing, completed, cancelled, and failed; draft orders are outside the Order History scope.
_Avoid_: Prototype status, delivery status

### Order Title

The primary human-readable label of an order in Order History. It names the order record without introducing product, customer, or line-item concepts.
_Avoid_: Order name, product name

### Order Total

The monetary total of an order, represented as an integer amount in minor currency units plus a currency code. It is the only monetary value on an order in the current scope.
_Avoid_: Price, floating-point amount

### Prototype Preview

A Vercel-hosted preview generated from a v0 branch. It must be navigable without backend access, VPN, production credentials, or real customer data.

### Handoff PR

A pull request opened from v0 output after a prototype preview is approved. It is an artifact for review and delivery planning, not an automatically mergeable production change.

### API Contract

The typed agreement between the backoffice frontend and backend services. It describes request and response shapes required by the UI.

### Contract Change

A proposed change to an API contract required by a prototype. A contract change implies backend delivery work unless the backend already exposes the required behavior.

### Mock Payload

A deterministic sample response used by prototype previews and local development when backend access is not available.

### Jira Delivery Story

The parent Jira issue created after prototype approval. It tracks the approved feature and contains frontend and backend sub-tasks when needed.

### Jira RAP Project

The canonical Jira delivery project for this PoC. It lives at
`https://bluereplyexp.atlassian.net/jira/software/projects/RAP/boards/2028`,
uses project key `RAP`, and becomes the delivery source of truth once local
drafts are published.

### Local Issue Draft

A markdown issue draft stored under `docs/issues/rapid-prototyping-bo/`. Local
drafts are planning artifacts until published to Jira. After publication, the
draft should reference the real `RAP-*` key and Jira should own issue status.
