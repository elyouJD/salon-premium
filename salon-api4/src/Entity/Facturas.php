<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['factura:read']],
    denormalizationContext: ['groups' => ['factura:write']]
)]
class Facturas
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['factura:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Clientes::class, inversedBy: 'facturas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['factura:read', 'factura:write'])]
    private ?Clientes $cliente = null;

    #[ORM\ManyToOne(targetEntity: Admin::class, inversedBy: 'facturas')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['factura:read', 'factura:write'])]
    private ?Admin $admin = null;

    #[ORM\Column(length: 255)]
    #[Groups(['factura:read', 'factura:write'])]
    private ?string $codigo_factura = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['factura:read', 'factura:write'])]
    private ?\DateTime $fecha_factura = null;

    #[ORM\OneToMany(mappedBy: 'factura', targetEntity: DetalleFactura::class)]
    #[Groups(['factura:read', 'factura:write'])]
    private Collection $detalle_facturas;

    public function __construct()
    {
        $this->detalle_facturas = new ArrayCollection();
    }

    // ---------- Getters & Setters ----------
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getCliente(): ?Clientes
    {
        return $this->cliente;
    }
    public function setCliente(?Clientes $cliente): static
    {
        $this->cliente = $cliente;
        return $this;
    }
    public function getAdmin(): ?Admin
    {
        return $this->admin;
    }
    public function setAdmin(?Admin $admin): static
    {
        $this->admin = $admin;
        return $this;
    }
    public function getCodigoFactura(): ?string
    {
        return $this->codigo_factura;
    }
    public function setCodigoFactura(string $codigo): static
    {
        $this->codigo_factura = $codigo;
        return $this;
    }
    public function getFechaFactura(): ?\DateTime
    {
        return $this->fecha_factura;
    }
    public function setFechaFactura(\DateTime $fecha): static
    {
        $this->fecha_factura = $fecha;
        return $this;
    }

    /** @return Collection|DetalleFactura[] */
    public function getDetalleFacturas(): Collection
    {
        return $this->detalle_facturas;
    }
    public function addDetalleFactura(DetalleFactura $detalle): static
    {
        if (!$this->detalle_facturas->contains($detalle)) {
            $this->detalle_facturas->add($detalle);
            $detalle->setFactura($this);
        }
        return $this;
    }
    public function removeDetalleFactura(DetalleFactura $detalle): static
    {
        if ($this->detalle_facturas->removeElement($detalle) && $detalle->getFactura() === $this) {
            $detalle->setFactura(null);
        }
        return $this;
    }
}
