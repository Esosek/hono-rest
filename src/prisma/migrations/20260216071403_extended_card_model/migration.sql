/*
  Warnings:

  - You are about to drop the column `set_id` on the `Card` table. All the data in the column will be lost.
  - Added the required column `name` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `set_code` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "rarity" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "power" INTEGER,
    "toughness" INTEGER,
    "set_code" TEXT NOT NULL,
    CONSTRAINT "Card_set_code_fkey" FOREIGN KEY ("set_code") REFERENCES "Set" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("color", "id", "rarity", "type") SELECT "color", "id", "rarity", "type" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_name_key" ON "Card"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
