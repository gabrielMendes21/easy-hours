-- CreateTable
CREATE TABLE `Escola` (
    `codEscola` INTEGER NOT NULL AUTO_INCREMENT,
    `nomeEscola` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codEscola`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turma` (
    `codTurma` INTEGER NOT NULL AUTO_INCREMENT,
    `ano` INTEGER NOT NULL,
    `nomeTurma` VARCHAR(191) NOT NULL,
    `codEscola` INTEGER NOT NULL,
    `codAluno` INTEGER NOT NULL,

    INDEX `Turma_codEscola_idx`(`codEscola`),
    INDEX `Turma_codAluno_idx`(`codAluno`),
    PRIMARY KEY (`codTurma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `codUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `rm` INTEGER NULL,
    `codEscola` INTEGER NULL,
    `codTipoUsuario` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_rm_key`(`rm`),
    INDEX `Usuario_codEscola_idx`(`codEscola`),
    INDEX `Usuario_codTipoUsuario_idx`(`codTipoUsuario`),
    PRIMARY KEY (`codUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoUsuario` (
    `codTipoUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoUsuario` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codTipoUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Atividade` (
    `codAtividade` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `anexos` VARCHAR(191) NULL,
    `horasAtividade` INTEGER NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `prazoEntrega` DATETIME(3) NOT NULL,
    `codTipoAtividade` INTEGER NOT NULL,

    INDEX `Atividade_codTipoAtividade_idx`(`codTipoAtividade`),
    PRIMARY KEY (`codAtividade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoAtividade` (
    `codTipoAtividade` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoAtividade` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codTipoAtividade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrega` (
    `codEntrega` INTEGER NOT NULL AUTO_INCREMENT,
    `dataEntrega` DATETIME(3) NULL,
    `conteudo` JSON NULL,
    `entregue` BOOLEAN NOT NULL DEFAULT false,
    `codAluno` INTEGER NOT NULL,
    `codAtividade` INTEGER NOT NULL,

    INDEX `Entrega_codAluno_idx`(`codAluno`),
    INDEX `Entrega_codAtividade_idx`(`codAtividade`),
    PRIMARY KEY (`codEntrega`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SolicitacaoSuporte` (
    `codSolicitacao` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `conteudo` VARCHAR(191) NOT NULL,
    `dataCriacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `codAluno` INTEGER NOT NULL,

    INDEX `SolicitacaoSuporte_codAluno_idx`(`codAluno`),
    PRIMARY KEY (`codSolicitacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resposta` (
    `codResposta` INTEGER NOT NULL AUTO_INCREMENT,
    `dataResposta` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resposta` VARCHAR(191) NOT NULL,
    `codCoordenador` INTEGER NOT NULL,
    `codSolicitacao` INTEGER NOT NULL,

    UNIQUE INDEX `Resposta_codSolicitacao_key`(`codSolicitacao`),
    INDEX `Resposta_codCoordenador_idx`(`codCoordenador`),
    INDEX `Resposta_codSolicitacao_idx`(`codSolicitacao`),
    PRIMARY KEY (`codResposta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Correcao` (
    `codCorrecao` INTEGER NOT NULL AUTO_INCREMENT,
    `dataCorrecao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `conteudo` VARCHAR(191) NOT NULL,
    `entregaAprovada` BOOLEAN NOT NULL,
    `codCoordenador` INTEGER NOT NULL,
    `codEntrega` INTEGER NOT NULL,

    UNIQUE INDEX `Correcao_codEntrega_key`(`codEntrega`),
    INDEX `Correcao_codEntrega_idx`(`codEntrega`),
    INDEX `Correcao_codCoordenador_idx`(`codCoordenador`),
    PRIMARY KEY (`codCorrecao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horas` (
    `codHoras` INTEGER NOT NULL AUTO_INCREMENT,
    `horasAnuais` INTEGER NOT NULL,
    `horasConcluidas` INTEGER NOT NULL,
    `ano` INTEGER NOT NULL,
    `codAluno` INTEGER NOT NULL,

    INDEX `Horas_codAluno_idx`(`codAluno`),
    PRIMARY KEY (`codHoras`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
