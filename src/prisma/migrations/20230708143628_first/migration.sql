-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intention" (
    "id" TEXT NOT NULL,
    "zipcode_start" TEXT NOT NULL,
    "zipcode_end" TEXT NOT NULL,
    "lead_id" TEXT NOT NULL,

    CONSTRAINT "Intention_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Intention" ADD CONSTRAINT "Intention_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
