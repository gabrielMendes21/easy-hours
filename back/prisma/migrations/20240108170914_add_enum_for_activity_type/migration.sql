/*
  Warnings:

  - You are about to drop the column `codTipoAtividade` on the `atividade` table. All the data in the column will be lost.
  - You are about to drop the `tipoatividade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tipoAtividade` to the `Atividade` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Atividade_codTipoAtividade_idx` ON `atividade`;

-- AlterTable
ALTER TABLE `atividade` DROP COLUMN `codTipoAtividade`,
    ADD COLUMN `tipoAtividade` ENUM('SESSAO', 'HORAS_FLEXIVEIS', 'PALESTRA') NOT NULL;

-- DropTable
DROP TABLE `tipoatividade`;
