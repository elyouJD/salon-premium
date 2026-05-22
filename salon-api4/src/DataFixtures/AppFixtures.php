<?php
// src/DataFixtures/AppFixtures.php
namespace App\DataFixtures;

use App\Entity\Admin;
use App\Entity\Clientes;
use App\Entity\Servicios;
use App\Entity\Citas;
use App\Entity\Facturas;
use App\Entity\DetalleFactura;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // --- Admin ---
        $admin = new Admin();
        $admin->setNombre('Super Admin')
            ->setUsuario('admin')
            ->setTelefono('0600000000')
            ->setEmail('admin@test.com')
            ->setPassword('password')
            ->setFechaRegistro(new \DateTime());
        $manager->persist($admin);

        // --- Clientes ---
        $cliente = new Clientes();
        $cliente->setNombre('Cliente Prueba')
            ->setEmail('cliente@test.com')
            ->setTelefono('0611111111')
            ->setGenero('M')
            ->setDetalles('Detalles de prueba')
            ->setFechaCreacion(new \DateTime())
            ->setFechaActualizacion(new \DateTime());
        $manager->persist($cliente);

        // --- Servicios ---
        $servicio = new Servicios();
        $servicio->setAdmin($admin)
            ->setNombreServicio('Corte de Cabello')
            ->setDescripcion('Servicio de corte básico')
            ->setCosto(20.0)
            ->setFechaCreacion(new \DateTime());
        $manager->persist($servicio);

        // --- Citas ---
        $cita = new Citas();
        $cita->setCliente($cliente)
            ->setAdmin($admin)
            ->setFechaCita(new \DateTime('+1 day'))
            ->setHoraCita(new \DateTime('10:00'))
            ->setEstado('Pendiente')
            ->setComentario('Primera cita de prueba')
            ->setFechaSolicitud(new \DateTime());
        $cita->addServicio($servicio);
        $manager->persist($cita);

        // --- Facturas ---
        $factura = new Facturas();
        $factura->setCliente($cliente)
            ->setAdmin($admin)
            ->setCodigoFactura('F001')
            ->setFechaFactura(new \DateTime());
        $manager->persist($factura);

        // --- DetalleFactura ---
        $detalle = new DetalleFactura();
        $detalle->setFactura($factura)
            ->setServicio($servicio)
            ->setCantidad(1)
            ->setPrecio(20.0);
        $manager->persist($detalle);

        $manager->flush();
    }
}
