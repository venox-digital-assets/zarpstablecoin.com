---
title: How PumpPay Uses ZARP to Power Real-Time Fuel Settlement
description: >-
  A case study in rand-denominated stablecoin settlement running inside a live
  commercial payments network — how PumpPay uses ZARP to settle fuel
  transactions on a delivery-versus-payment basis across South Africa.
pubDate: 2026-09-11T12:44:13Z
author: ZARP Stablecoin
heroImage: /img/news/how-pumppay-uses-zarp-to-power-real-time-fuel-settlement.jpeg
heroImageAlt: >-
  The PumpPay app showing fuel stations near Johannesburg, alongside a dashboard
  listing pre-authorised and settled fuel transactions in a ZARP account
tags:
  - Case Study
  - Payments
  - Adoption
---

**A rand-denominated stablecoin settlement layer operating inside a live commercial payments network in South Africa's fuel industry.**

Fuel payments are high-volume and low-margin. Each transaction depends on authorisation, risk management, settlement and reconciliation. A weakness in any of those steps appears immediately at the pump.

[PumpPay](https://www.pumppay.co.za/) was the result of rethinking fuel payments. ZARP Stablecoin is pegged to the South African rand and operates as PumpPay's in-platform settlement layer. Once a pre-authorised on-chain transaction has cleared PumpPay's risk and authorisation controls, ZARP ensures settlement between participants in real time.

Fleet owners and merchants purchase fuel, account for it, and settle in rand.

> We see ZARP as enabling immediate settlement. In our world, that means delivery versus payment in real time.
>
> — Andrew Turpin, PumpPay

### The Challenge

A fleet fuel transaction records the vehicle details (such as odometer, tank size and preferred fuel grade), the driver details, the geolocation and the fuel information (such as fuel grade, price per litre and applicable discounts or rebates). It also requires that the purchase conforms with the fleet owner's own risk controls. Settlement and reconciliation is then required by the fleet owner and the merchant.

PumpPay's founders concluded that the card-based payment model did not provide the control, information and settlement speed the business needed.

> We knew we needed immutable transactions, immediate settlement, a different risk model for merchants, and being able to provide real-time information through APIs.
>
> — Andrew Turpin, PumpPay

Those requirements directed the company toward stablecoin infrastructure.

### Why ZARP Stablecoin

PumpPay needed rand-denominated transactions together with the settlement characteristics of blockchain infrastructure. ZARP Stablecoin supplies that settlement layer.

PumpPay provides the platform, the transaction logic, authorisation, risk controls, APIs, reporting and reconciliation. ZARP Stablecoin moves and settles the rand-denominated value inside that system.

Once PumpPay's risk checks clear, settlement happens alongside the fuel transaction. The network settles on a delivery-versus-payment basis in live operations. Transaction risk visibility and management resides with the fleet owner.

> In our model, the risk of the transaction falls to the fleet owner, not the merchant. We give the fleet owner tools to manage their risks. If there is any doubt, we settle the merchant and solve the rare discrepancy afterwards.
>
> — Andrew Turpin, PumpPay

ZARP transactions produce an immutable on-chain record. PumpPay uses that record as a fixed reference point when it reconciles payment, settlement and transaction data, including the very rare occurrence of a dispute.

### How a PumpPay Transaction Works

1. **Initiation** — A fleet user starts a fuel transaction through PumpPay.
2. **Risk decisioning** — PumpPay applies its risk controls, drawing on inputs such as geolocation, vehicle registration, odometer data, fuel requirements and vehicle telemetry.
3. **Pre-authorisation** — The estimated value is pre-authorised on-chain before the final fuel amount is known.
4. **Refuelling** — The vehicle is refuelled. The actual amount can differ from the pre-authorised estimate.
5. **Settlement** — The final value is settled. Any difference between the pre-authorised amount and the actual amount is returned through the settlement process.
6. **Reconciliation and reporting** — PumpPay provides APIs, reconciliation data and reporting to every participant in the transaction.

ZARP Stablecoin is integral to the pre-authorisation and the settlement steps.

### Customer Experience

PumpPay initially considered a non-custodial model, but interactions with fleet owners and merchants changed this thinking. Customers wanted the operational benefit without wallet management or direct interaction with crypto infrastructure.

> Our customers don't care about the blockchain. They just want the solution to work.
>
> — Andrew Turpin, PumpPay

PumpPay designed the product around that requirement. Card rails and ZARP Stablecoin settlement both operate inside PumpPay's network. Some card transactions run with ZARP settlement behind them. Other sites operate on ZARP Stablecoin alone. PumpPay selects the appropriate settlement mechanism for each site.

### Network Figures

Metrics PumpPay has approved for publication:

<div class="stat-grid">
  <div>
    <p class="stat-value">31</p>
    <p class="stat-label">very active sites operating entirely on ZARP, within a network accepted at all forecourts in South Africa</p>
  </div>
  <div>
    <p class="stat-value">0.018%</p>
    <p class="stat-label">current transaction failure rate</p>
  </div>
  <div>
    <p class="stat-value">54%</p>
    <p class="stat-label">of current merchant activity is linked to vehicle rental</p>
  </div>
</div>

Vehicle rental refuelling is a common PumpPay use case. It integrates vehicle-level data such as GPS tracking telemetry, fleet controls, ERP integration, pump controller integration, and depot and on-road refuelling options. Together with transaction visibility, it provides the settlement and reconciliation information that fleet owners find indispensable.

### Fuel Payment Economics

Fuel is a low-margin business. Transaction cost, reconciliation overhead and manual exception handling all affect the commercial result. PumpPay treats pre-authorisation, settlement, reconciliation and data exchange as one connected system.

ZARP Stablecoin moves value, keeps an immutable record and reduces operational friction between the fleet owner, the merchant, fuel agents and PumpPay.

### Stablecoin Use in This Deployment

PumpPay identified problems in transaction cost, settlement speed, reconciliation and risk allocation in traditional fuel payments. It adopted ZARP Stablecoin as an engineering best option to provide the settlement component inside its payments platform.

### Current Work

PumpPay is working on deeper integration with forecourt point-of-sale systems. The work covers further automation of transaction confirmation and a reduction in manual steps. The relationship between PumpPay and ZARP Stablecoin is also expected to become more API-driven over time, particularly around liquidity.

> Our focus was never stablecoin for its own sake. We set out to remove payment friction of all kinds and eliminate inefficient settlement from fuel transactions. ZARP gave us a rand-denominated digital settlement layer that lets us move and settle value most efficiently, while keeping the customer experience simple and familiar.
>
> — Andrew Turpin, PumpPay

*Learn more about PumpPay at [pumppay.co.za](https://www.pumppay.co.za/), and about ZARP at [zarpstablecoin.com](https://www.zarpstablecoin.com/).*
