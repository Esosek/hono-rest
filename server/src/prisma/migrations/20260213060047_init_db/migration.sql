-- CreateTable
CREATE TABLE "Set" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "card_count" INTEGER NOT NULL,
    "mechanics" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "color" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "set_id" INTEGER NOT NULL,
    CONSTRAINT "Card_set_id_fkey" FOREIGN KEY ("set_id") REFERENCES "Set" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Set_name_key" ON "Set"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Set_code_key" ON "Set"("code");
