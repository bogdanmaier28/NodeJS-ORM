-- CreateIndex
CREATE FULLTEXT INDEX `Todo_title_description_idx` ON `Todo`(`title`, `description`);
