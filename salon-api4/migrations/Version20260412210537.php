<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260412210537 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admin (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, usuario VARCHAR(255) NOT NULL, telefono VARCHAR(20) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, fecha_registro DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE citas (id INT AUTO_INCREMENT NOT NULL, fecha_cita DATETIME NOT NULL, hora_cita TIME NOT NULL, estado VARCHAR(50) NOT NULL, comentario LONGTEXT DEFAULT NULL, fecha_solicitud DATETIME NOT NULL, cliente_id INT NOT NULL, admin_id INT NOT NULL, INDEX IDX_B88CF8E5DE734E51 (cliente_id), INDEX IDX_B88CF8E5642B8210 (admin_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE cita_servicio (citas_id INT NOT NULL, servicios_id INT NOT NULL, INDEX IDX_7A274B50F103737D (citas_id), INDEX IDX_7A274B50D96E005D (servicios_id), PRIMARY KEY (citas_id, servicios_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE clientes (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, telefono VARCHAR(20) NOT NULL, genero VARCHAR(10) NOT NULL, detalles LONGTEXT NOT NULL, fecha_creacion DATETIME NOT NULL, fecha_actualizacion DATETIME NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE detalle_factura (id INT AUTO_INCREMENT NOT NULL, cantidad INT NOT NULL, precio DOUBLE PRECISION NOT NULL, factura_id INT NOT NULL, servicio_id INT NOT NULL, INDEX IDX_B1354EA1F04F795F (factura_id), INDEX IDX_B1354EA171CAA3E7 (servicio_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE facturas (id INT AUTO_INCREMENT NOT NULL, codigo_factura VARCHAR(255) NOT NULL, fecha_factura DATETIME NOT NULL, cliente_id INT NOT NULL, admin_id INT NOT NULL, INDEX IDX_622B9C0FDE734E51 (cliente_id), INDEX IDX_622B9C0F642B8210 (admin_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE servicios (id INT AUTO_INCREMENT NOT NULL, nombre_servicio VARCHAR(255) NOT NULL, descripcion LONGTEXT NOT NULL, costo DOUBLE PRECISION NOT NULL, fecha_creacion DATETIME NOT NULL, admin_id INT NOT NULL, INDEX IDX_C07E802F642B8210 (admin_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE citas ADD CONSTRAINT FK_B88CF8E5DE734E51 FOREIGN KEY (cliente_id) REFERENCES clientes (id)');
        $this->addSql('ALTER TABLE citas ADD CONSTRAINT FK_B88CF8E5642B8210 FOREIGN KEY (admin_id) REFERENCES admin (id)');
        $this->addSql('ALTER TABLE cita_servicio ADD CONSTRAINT FK_7A274B50F103737D FOREIGN KEY (citas_id) REFERENCES citas (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE cita_servicio ADD CONSTRAINT FK_7A274B50D96E005D FOREIGN KEY (servicios_id) REFERENCES servicios (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE detalle_factura ADD CONSTRAINT FK_B1354EA1F04F795F FOREIGN KEY (factura_id) REFERENCES facturas (id)');
        $this->addSql('ALTER TABLE detalle_factura ADD CONSTRAINT FK_B1354EA171CAA3E7 FOREIGN KEY (servicio_id) REFERENCES servicios (id)');
        $this->addSql('ALTER TABLE facturas ADD CONSTRAINT FK_622B9C0FDE734E51 FOREIGN KEY (cliente_id) REFERENCES clientes (id)');
        $this->addSql('ALTER TABLE facturas ADD CONSTRAINT FK_622B9C0F642B8210 FOREIGN KEY (admin_id) REFERENCES admin (id)');
        $this->addSql('ALTER TABLE servicios ADD CONSTRAINT FK_C07E802F642B8210 FOREIGN KEY (admin_id) REFERENCES admin (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE citas DROP FOREIGN KEY FK_B88CF8E5DE734E51');
        $this->addSql('ALTER TABLE citas DROP FOREIGN KEY FK_B88CF8E5642B8210');
        $this->addSql('ALTER TABLE cita_servicio DROP FOREIGN KEY FK_7A274B50F103737D');
        $this->addSql('ALTER TABLE cita_servicio DROP FOREIGN KEY FK_7A274B50D96E005D');
        $this->addSql('ALTER TABLE detalle_factura DROP FOREIGN KEY FK_B1354EA1F04F795F');
        $this->addSql('ALTER TABLE detalle_factura DROP FOREIGN KEY FK_B1354EA171CAA3E7');
        $this->addSql('ALTER TABLE facturas DROP FOREIGN KEY FK_622B9C0FDE734E51');
        $this->addSql('ALTER TABLE facturas DROP FOREIGN KEY FK_622B9C0F642B8210');
        $this->addSql('ALTER TABLE servicios DROP FOREIGN KEY FK_C07E802F642B8210');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE citas');
        $this->addSql('DROP TABLE cita_servicio');
        $this->addSql('DROP TABLE clientes');
        $this->addSql('DROP TABLE detalle_factura');
        $this->addSql('DROP TABLE facturas');
        $this->addSql('DROP TABLE servicios');
    }
}
