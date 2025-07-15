import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  departments: defineTable({
    name: v.string(),
    code: v.string(),
  }).index("by_code", ["code"]),

  assets: defineTable({
    name: v.string(),
    model: v.string(),
    serialNumber: v.string(),
    value: v.number(),
    dateReceived: v.number(),
    status: v.string(),
    departmentId: v.optional(v.id("departments")),
    qrCode: v.string(),
  })
    .index("by_department", ["departmentId"])
    .index("by_status", ["status"]),

  requests: defineTable({
    departmentId: v.id("departments"),
    assetId: v.id("assets"),
    purpose: v.string(),
    status: v.string(),
    requestedBy: v.id("users"),
    approvedBy: v.optional(v.id("users")),
    approvedAt: v.optional(v.number()),
  })
    .index("by_department", ["departmentId"])
    .index("by_status", ["status"])
    .index("by_requester", ["requestedBy"]),

  assignments: defineTable({
    assetId: v.id("assets"),
    departmentId: v.id("departments"),
    assignedBy: v.id("users"),
    assignedAt: v.number(),
    acknowledged: v.boolean(),
    acknowledgedBy: v.optional(v.id("users")),
    acknowledgedAt: v.optional(v.number()),
  })
    .index("by_department", ["departmentId"])
    .index("by_asset", ["assetId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
