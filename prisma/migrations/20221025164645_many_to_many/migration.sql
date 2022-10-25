/*
  Warnings:

  - You are about to drop the `Topic_Todo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Topic_Todo` DROP FOREIGN KEY `Topic_Todo_todo_id_fkey`;

-- DropForeignKey
ALTER TABLE `Topic_Todo` DROP FOREIGN KEY `Topic_Todo_topic_id_fkey`;

-- DropTable
DROP TABLE `Topic_Todo`;

-- CreateTable
CREATE TABLE `_TodoToTopic` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TodoToTopic_AB_unique`(`A`, `B`),
    INDEX `_TodoToTopic_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_TodoToTopic` ADD CONSTRAINT `_TodoToTopic_A_fkey` FOREIGN KEY (`A`) REFERENCES `Todo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TodoToTopic` ADD CONSTRAINT `_TodoToTopic_B_fkey` FOREIGN KEY (`B`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
