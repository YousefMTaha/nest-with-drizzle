import {
    pgTable,
    uuid,
    text,
    timestamp,
    boolean,
    serial,
    jsonb,
  } from 'drizzle-orm/pg-core';
  import { relations } from 'drizzle-orm';
  

export const inventoryBranches = pgTable('inventory_branch', {
  id: serial().primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  contactDetails: jsonb('contact_details')
    .$type<{
      phone: string;
      email: string;
      address: string;
    }>()
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const inventoryBranchRelations = relations(
  inventoryBranches,
  ({ many }) => ({
    skus: many(skus),
  }),
);

  export const skus = pgTable('sku', {
    id: serial().primaryKey(),
    name: text().notNull(),
    skuCode: text('sku_code').unique().notNull(),
    category: text().notNull(),
    subcategory: text('').notNull(),
    brandName: text('brand_name').notNull(),
    isActive: boolean('is_active').default(true),
    branchId: serial('branch_id').references(() => inventoryBranches.id),
    barcodeData: text('barcode_data'),
    qrCodeData: text('qr_code_data'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  });
  
  export const skuRelations = relations(skus, ({ one }) => ({
    branch: one(inventoryBranches, {
      fields: [skus.branchId],
      references: [inventoryBranches.id],
    }),
  }));