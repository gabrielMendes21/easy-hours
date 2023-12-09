/*
  Warnings:

  - You are about to drop the column `codTipoUsuario` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `tipousuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `role` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_codTipoUsuario_idx` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `codTipoUsuario`,
    ADD COLUMN `role` ENUM('STUDENT', 'ETEC_COORDINATOR', 'IBM_COORDINATOR', 'ADMIN') NOT NULL;

-- DropTable
DROP TABLE `tipousuario`;
