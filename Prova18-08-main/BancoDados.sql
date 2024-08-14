-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS gerenciamento_eventos;

-- Seleciona o banco de dados
USE gerenciamento_eventos;

-- Tabela para armazenar informações dos palestrantes
CREATE TABLE IF NOT EXISTS palestrantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela para armazenar informações dos participantes
CREATE TABLE IF NOT EXISTS participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela para armazenar informações dos eventos
CREATE TABLE IF NOT EXISTS eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data DATE NOT NULL
);

-- Tabela para relacionar eventos e palestrantes
CREATE TABLE IF NOT EXISTS eventos_palestrantes (
    evento_id INT,
    palestrante_id INT,
    PRIMARY KEY (evento_id, palestrante_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (palestrante_id) REFERENCES palestrantes(id) ON DELETE CASCADE
);

-- Tabela para relacionar eventos e participantes
CREATE TABLE IF NOT EXISTS eventos_participantes (
    evento_id INT,
    participante_id INT,
    PRIMARY KEY (evento_id, participante_id),
    FOREIGN KEY (evento_id) REFERENCES eventos(id) ON DELETE CASCADE,
    FOREIGN KEY (participante_id) REFERENCES participantes(id) ON DELETE CASCADE
);
