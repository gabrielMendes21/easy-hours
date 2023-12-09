/*
  Warnings:

  - You are about to drop the column `codAluno` on the `turma` table. All the data in the column will be lost.
  - Added the required column `codTurma` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Turma_codAluno_idx` ON `turma`;

-- AlterTable
ALTER TABLE `turma` DROP COLUMN `codAluno`;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `codTurma` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Usuario_codTurma_idx` ON `Usuario`(`codTurma`);
