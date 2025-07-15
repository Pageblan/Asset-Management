import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {
    departmentId: v.optional(v.id("departments")),
  },
  handler: async (ctx, args) => {
    const query = args.departmentId
      ? ctx.db
          .query("assets")
          .withIndex("by_department", (q) => q.eq("departmentId", args.departmentId))
      : ctx.db.query("assets");
    return await query.collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    model: v.string(),
    serialNumber: v.string(),
    value: v.number(),
  },
  handler: async (ctx, args) => {
    const qrCode = `DKUT-${args.serialNumber}`;
    return await ctx.db.insert("assets", {
      ...args,
      dateReceived: Date.now(),
      status: "available",
      qrCode,
    });
  },
});
