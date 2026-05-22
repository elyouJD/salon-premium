<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['detalle_factura:read']],
    denormalizationContext: ['groups' => ['detalle_factura:write']]
)]
class DetalleFactura
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['detalle_factura:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Facturas::class, inversedBy: 'detalle_facturas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['detalle_factura:read', 'detalle_factura:write'])]
    private ?Facturas $factura = null;

    #[ORM\ManyToOne(targetEntity: Servicios::class, inversedBy: 'detalle_facturas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['detalle_factura:read', 'detalle_factura:write'])]
    private ?Servicios $servicio = null;

    #[ORM\Column(type: 'integer')]
    #[Groups(['detalle_factura:read', 'detalle_factura:write'])]
    private ?int $cantidad = null;

    #[ORM\Column(type: 'float')]
    #[Groups(['detalle_factura:read', 'detalle_factura:write'])]
    private ?float $precio = null;

    // ---------- Getters & Setters ----------
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getFactura(): ?Facturas
    {
        return $this->factura;
    }
    public function setFactura(?Facturas $factura): static
    {
        $this->factura = $factura;
        return $this;
    }
    public function getServicio(): ?Servicios
    {
        return $this->servicio;
    }
    public function setServicio(?Servicios $servicio): static
    {
        $this->servicio = $servicio;
        return $this;
    }
    public function getCantidad(): ?int
    {
        return $this->cantidad;
    }
    public function setCantidad(int $cantidad): static
    {
        $this->cantidad = $cantidad;
        return $this;
    }
    public function getPrecio(): ?float
    {
        return $this->precio;
    }
    public function setPrecio(float $precio): static
    {
        $this->precio = $precio;
        return $this;
    }
}
