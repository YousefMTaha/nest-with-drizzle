CREATE TABLE "inventory_branch" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"location" text NOT NULL,
	"contact_details" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sku" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"sku_code" text NOT NULL,
	"category" text NOT NULL,
	"subcategory" text NOT NULL,
	"brand_name" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"branch_id" serial NOT NULL,
	"barcode_data" text,
	"qr_code_data" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sku_sku_code_unique" UNIQUE("sku_code")
);
--> statement-breakpoint
ALTER TABLE "sku" ADD CONSTRAINT "sku_branch_id_inventory_branch_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."inventory_branch"("id") ON DELETE no action ON UPDATE no action;