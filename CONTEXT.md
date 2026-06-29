# Rapid Prototyping Context

This file defines domain language only. It is not an implementation guide.

## Glossary

### Rapid Prototyping BO

The backoffice application used for the proof of concept. It is the real frontend application that v0 will modify during prototyping, while previews remain independent from real backend services.

### Backoffice

An internal operational interface for managing business workflows, entities, dashboards, and administrative tasks.

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
