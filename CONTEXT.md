# Rapid Prototyping Context

This file defines domain language only. It is not an implementation guide.

## Glossary

### Rapid Prototyping BO

The backoffice application used as the target product for the proof of concept. It is the real frontend application that v0, and later the Rapid Prototyping Portal, will modify during prototyping while previews remain independent from real backend services.

### Rapid Prototyping Portal

The planned custom prototyping portal for requesting changes to connected applications such as the Rapid Prototyping BO. It is the canonical system name for the future v0-powered orchestration experience, not the backoffice application itself or only its branded UI shell.

### Branded Wrapper

The brand-specific presentation shell of the Rapid Prototyping Portal. It contains the branded chat and preview experience for one or more connected applications, but it is not the full portal architecture, agent layer, connector layer, or delivery source of truth.
_Avoid_: Rapid Prototyping Portal, custom v0 clone, agent layer

### Portal Agent Role

A stable responsibility owned by the Rapid Prototyping Portal, such as design-system guidance, API contract review, branch and PR management, Jira handoff, or context documentation. A portal agent role is reusable across projects and becomes project-specific only when combined with a project context pack.
_Avoid_: Project-specific agent, skill, connector

### Project Context Pack

The project-specific set of source documents, rules, repository boundaries, and delivery mappings that tells reusable portal agent roles how to operate for a connected application. Its source documents normally live with the project repository, while the portal keeps pointers, enabled profiles, connector bindings, and operational permissions in the project registry.
_Avoid_: Global instruction, reusable skill, connector

### Project Registry

The Rapid Prototyping Portal registry of tracked projects, connected applications, repository bindings, active project agent profiles, connector bindings, and context-pack pointers. It is the portal-side operational map for routing project-scoped chats and onboarding projects.
_Avoid_: Project repository, connected application, context document

### Knowledge Source

A canonical source of project knowledge such as repository files, context documents, PRDs, Jira issues, Confluence pages, design artifacts, or API contracts. Knowledge sources remain the source of truth even when indexed for discovery.
_Avoid_: Search index, runtime memory

### Knowledge Ingestion Layer

The Rapid Prototyping Portal layer that indexes and normalizes project knowledge sources for discovery, retrieval, and broad contextual search. It supports runtime agents but does not replace canonical project files, delivery documents, or external sources of truth.
_Avoid_: Project context pack, source of truth, agent profile

### Artifact Layer

The Rapid Prototyping Portal layer that tracks durable outputs from project-scoped chats, such as chat sessions, builder sessions, branches, previews, handoff pull requests, Jira drafts or stories, and context updates. It records what was produced and how artifacts relate to a request without replacing source-control or delivery systems of record.
_Avoid_: Agent runtime orchestrator, connector gateway, source of truth

### Approval Gate

A lightweight human approval checkpoint in the Rapid Prototyping Portal prototype flow. The baseline gates are preview approval before preparing Jira delivery drafts and Jira draft approval before writing Jira issues and creating the Jira-keyed handoff pull request.
_Avoid_: Full policy engine, automatic production approval

### Project Agent Profile

The project-level, code- or admin-managed configuration that binds a portal agent role to a project context pack and project-specific rules. It defines which stable agent roles are enabled for a project and how they should behave there; portal chat users select a project and use active profiles implicitly rather than editing them directly.
_Avoid_: New agent implementation, hardcoded project bot

### Agent Profile Template

A future optional onboarding artifact for creating project agent profiles for common portal agent roles. It may provide the expected configuration shape, defaults, validation rules, and required project inputs, but it is not part of the current baseline portal architecture.
_Avoid_: Active project agent profile, runtime agent instance

### Agent Profile Proposal

A future optional draft project agent profile generated dynamically during project onboarding from project inputs such as repository structure, context documents, delivery rules, and connector bindings. It is a deferred capability, not part of the current project-scoped chat flow or baseline onboarding model.
_Avoid_: Active profile, generated runtime agent, user-edited chat setting

### Agent Runtime Orchestrator

The Rapid Prototyping Portal component that combines selected portal agent roles, project agent profiles, project context, connector bindings, and the current user request into a runtime agent team. It does not own project rules itself; it resolves and applies them for a project-scoped chat session.
_Avoid_: Static agent catalog, project registry, connector gateway

### AI Builder Adapter

The Rapid Prototyping Portal integration layer that talks to an external AI builder such as v0. It is the only portal layer that calls the external builder directly, translating project-scoped chat intent, instructions, repository bindings, branch context, and artifact expectations into the builder's API or workflow without owning agent orchestration itself.
_Avoid_: Agent runtime orchestrator, project registry, connector gateway

### v0 Compatibility Adapter

The first AI builder adapter for integrating the Rapid Prototyping Portal with v0. It owns v0-specific session, instruction, branch, preview, and artifact compatibility concerns; portal agents submit structured builder requests to this adapter rather than calling v0 directly.
_Avoid_: Agent layer, branded wrapper, project context pack

### AI Builder Request

A structured request emitted by a runtime agent or orchestrator for work that must be delegated to an external AI builder. It describes the intended builder action and required project context without exposing v0-specific API details to the agent role.
_Avoid_: Direct v0 call, connector request, user chat message

### Project-Scoped Chat

A chat session in the Rapid Prototyping Portal that is explicitly bound to a selected project before agent work begins. The selected project determines the available applications, context pack, agent profiles, connectors, repository bindings, preview targets, and delivery rules.
_Avoid_: Global chat, unbound chat, generic v0 chat

### Connected Application

An application target registered under a project that the Rapid Prototyping Portal can inspect, modify, and preview, such as the Rapid Prototyping BO. It is not an external delivery or source-control tool such as Jira, GitHub, Bitbucket, or Vercel.
_Avoid_: Connector, Jira project, repository provider

### Repository Binding

The project configuration that links a connected application to its source repository, default branch, branch policy, and pull request target. Repository bindings are assumed to exist for deployed connected applications and are used by branch, preview, and handoff workflows.
_Avoid_: Connected application, Jira binding, generic connector

### Connector Binding

The project-level configuration that grants portal agents controlled access to an external system such as Jira, GitHub, Bitbucket, Vercel, Confluence, or a design tool. Connector bindings define what a project can read or write through an external integration.
_Avoid_: Connected application, project context pack, agent profile

### Connector Gateway

The Rapid Prototyping Portal integration layer that receives structured connector requests from runtime agents or the orchestrator and executes them through configured connector bindings. It centralizes provider-specific APIs, permissions, audit, and approval boundaries for tools such as Jira, GitHub, Bitbucket, Vercel, Confluence, and design platforms.
_Avoid_: Connected application, project registry, direct agent integration

### Connector Request

A structured request emitted by a runtime agent or orchestrator for work that must be delegated to an external tool. It describes the intended tool action and required project context without exposing provider-specific API details to the agent role.
_Avoid_: Direct Jira call, direct GitHub call, AI builder request

### Jira Project Binding

A connector binding that maps a portal project to a Jira site, project key, board, issue types, field rules, and approval boundaries. It is configured at project level by default, with optional connected-application overrides when different application targets use different Jira projects or delivery rules.
_Avoid_: Connected application, repository binding

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

A simple constraint applied to Order History. The baseline dashboard supports filtering by order status and searching by text; richer filters such as date ranges, pagination, and saved views are future BO capabilities that require explicit contract and UX definition.
_Avoid_: Advanced search, saved view

### Order Status

The lifecycle state of an order shown in Order History. Supported states are submitted, processing, completed, cancelled, and failed; draft orders are outside the Order History scope.
_Avoid_: Prototype status, delivery status

### Order Title

The primary human-readable label of an order in Order History. It names the order record without introducing product, customer, or line-item concepts.
_Avoid_: Order name, product name

### Order Total

The monetary total of an order, represented as an integer amount in minor currency units plus a currency code. It is the only monetary value on the baseline Order History row; richer order views must define any additional monetary fields explicitly.
_Avoid_: Price, floating-point amount

### Prototype Preview

A Vercel-hosted preview generated from a v0 branch. It must be navigable without backend access, VPN, production credentials, or real customer data.

### Handoff PR

A pull request opened from validated prototype output after the Jira delivery draft has been approved and Jira issue keys are available for branch and commit naming. It is an artifact for review and delivery planning, not an automatically mergeable production change.

### Jira-Keyed Branch Strategy

A branch and commit naming strategy that uses Jira issue keys created from an approved Jira draft before the handoff pull request is opened. It keeps prototype handoff work traceable to the Jira delivery story and related tasks.
_Avoid_: Generic prototype branch, unticketed handoff branch

### API Contract

The typed agreement between the backoffice frontend and backend services. It describes request and response shapes required by the UI.

### Contract Change

A proposed change to an API contract required by a prototype. A contract change implies backend delivery work unless the backend already exposes the required behavior.

### Mock Payload

A deterministic sample response used by prototype previews and local development when backend access is not available.

### Jira Delivery Story

The parent Jira issue created after the Jira delivery draft has been approved. It tracks the approved feature and provides the Jira key used by the handoff branch and related delivery tasks.

### Jira RAP Project

The canonical Jira delivery project for this PoC. It lives at
`https://bluereplyexp.atlassian.net/jira/software/projects/RAP/boards/2028`,
uses project key `RAP`, and becomes the delivery source of truth once local
drafts are published.

### Local Issue Draft

A markdown issue draft stored under `docs/issues/rapid-prototyping-bo/`. Local
drafts are planning artifacts until published to Jira. After publication, the
draft should reference the real `RAP-*` key and Jira should own issue status.
