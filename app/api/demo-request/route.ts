import { NextResponse } from "next/server"

import { cleanCampaign, type Campaign } from "@/lib/campaign"
import { verifyTurnstile } from "@/lib/turnstile"

// "Boka demo" form on the unlinked Swedish outreach page /sv/opti-assist.
// Same board and group as the other website forms, tagged with its own Type
// so the Swedish campaign leads can be filtered out in Monday. The board has
// no company or long-text column, so company, machine count, message and the
// campaign attribution go on as an update on the item.

const MONDAY_API_URL = "https://api.monday.com/v2"
const BOARD_ID = "5978901066"
const GROUP_ID = "group_mm13rdh1"
const TYPE_COLUMN_ID = "color_mm8gnxqq"
const TYPE_LABEL = "Opti Assist Sverige"

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 100
const MAX_COMPANY_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_PHONE_LENGTH = 40
const MAX_MESSAGE_LENGTH = 2000
const MACHINE_OPTIONS = ["1 till 5", "6 till 20", "Fler än 20", "Vet inte"]

type DemoPayload = {
  name?: unknown
  company?: unknown
  email?: unknown
  phone?: unknown
  machines?: unknown
  message?: unknown
  website?: unknown
  turnstileToken?: unknown
  campaign?: unknown
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as DemoPayload

    // Honeypot: real visitors never see the website field, bots fill it.
    if (getString(payload.website).trim()) {
      return NextResponse.json({ success: true })
    }

    if (!(await verifyTurnstile(payload.turnstileToken, request))) {
      return NextResponse.json({ error: "Bot check failed" }, { status: 403 })
    }

    const name = getString(payload.name).trim()
    const company = getString(payload.company).trim()
    const email = getString(payload.email).trim()
    const phone = getString(payload.phone).trim()
    const machinesRaw = getString(payload.machines).trim()
    const machines = MACHINE_OPTIONS.includes(machinesRaw) ? machinesRaw : ""
    const message = getString(payload.message).trim().slice(0, MAX_MESSAGE_LENGTH)
    const campaign = cleanCampaign(payload.campaign)

    if (!name || !company || !email || !phone) {
      return NextResponse.json(
        { error: "Name, company, email and phone are required" },
        { status: 400 }
      )
    }
    if (email.length > MAX_EMAIL_LENGTH || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "A valid email address is required" },
        { status: 400 }
      )
    }
    if (
      name.length > MAX_NAME_LENGTH ||
      company.length > MAX_COMPANY_LENGTH ||
      phone.length > MAX_PHONE_LENGTH
    ) {
      return NextResponse.json({ error: "Input is too long" }, { status: 400 })
    }

    const token = process.env.MONDAY_API_TOKEN
    if (!token) {
      return NextResponse.json(
        { error: "Server configuration error: no token" },
        { status: 500 }
      )
    }

    const columnValues = {
      text: name,
      phone,
      [TYPE_COLUMN_ID]: { label: TYPE_LABEL },
    }

    const created = await monday(
      `mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
        create_item (board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues, create_labels_if_missing: true) {
          id
        }
      }`,
      {
        boardId: BOARD_ID,
        groupId: GROUP_ID,
        itemName: email,
        columnValues: JSON.stringify(columnValues),
      },
      token
    )

    if (!created.ok) {
      return NextResponse.json(
        { error: "Monday.com error", details: created.error },
        { status: 502 }
      )
    }

    const itemId = created.data?.create_item?.id as string | undefined
    // Best-effort: a failed note must never cost us the lead itself.
    if (itemId) {
      const body = noteBody({ company, machines, message, campaign })
      const note = await monday(
        `mutation ($itemId: ID!, $body: String!) {
          create_update (item_id: $itemId, body: $body) { id }
        }`,
        { itemId, body },
        token
      )
      if (!note.ok) console.error("Demo request note failed:", note.error)
    }

    return NextResponse.json({ success: true, id: itemId })
  } catch (error) {
    console.error("Demo request API error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}

function getString(value: unknown) {
  return typeof value === "string" ? value : ""
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function noteBody({
  company,
  machines,
  message,
  campaign,
}: {
  company: string
  machines: string
  message: string
  campaign: Campaign
}) {
  const lines = [
    "<b>Boka demo: Opti Assist (Sverige)</b>",
    `Företag: ${escapeHtml(company)}`,
    `Antal maskiner: ${escapeHtml(machines || "ej angivet")}`,
    `Ref (r): ${escapeHtml(campaign.r ?? "ingen")}`,
    `utm_source: ${escapeHtml(campaign.utm_source ?? "")}`,
    `utm_medium: ${escapeHtml(campaign.utm_medium ?? "")}`,
    `utm_campaign: ${escapeHtml(campaign.utm_campaign ?? "")}`,
    `utm_content: ${escapeHtml(campaign.utm_content ?? "")}`,
  ]
  if (message) {
    lines.push("", "Meddelande:", escapeHtml(message).replace(/\r?\n/g, "<br>"))
  }
  return lines.join("<br>")
}

async function monday(
  query: string,
  variables: Record<string, unknown>,
  token: string
): Promise<{ ok: boolean; data?: Record<string, { id?: string }>; error?: unknown }> {
  const response = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": "2024-10",
    },
    body: JSON.stringify({ query, variables }),
  })
  const raw = await response.text()
  let data: { data?: Record<string, { id?: string }>; errors?: unknown; error_message?: unknown; error_code?: unknown }
  try {
    data = JSON.parse(raw)
  } catch {
    return { ok: false, error: "Invalid response from Monday.com" }
  }
  if (!response.ok || data.errors || data.error_message || data.error_code) {
    return { ok: false, error: data.errors ?? data.error_message ?? data }
  }
  return { ok: true, data: data.data }
}
