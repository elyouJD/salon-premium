<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['servicio:read']],
    denormalizationContext: ['groups' => ['servicio:write']]
)]
class Servicios
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['servicio:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Admin::class, inversedBy: 'servicios')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['servicio:read', 'servicio:write'])]
    private ?Admin $admin = null;

    #[ORM\Column(length: 255)]
    #[Groups(['servicio:read', 'servicio:write'])]
    private ?string $nombre_servicio = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['servicio:read', 'servicio:write'])]
    private ?string $descripcion = null;

    #[ORM\Column(type: 'float')]
    #[Groups(['servicio:read', 'servicio:write'])]
    private ?float $costo = null;

    #[ORM\Column]
    #[Groups(['servicio:read', 'servicio:write'])]
    private ?\DateTime $fecha_creacion = null;

    #[ORM\OneToMany(mappedBy: 'servicio', targetEntity: DetalleFactura::class)]
    #[Groups(['servicio:read'])]
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
    public function getAdmin(): ?Admin
    {
        return $this->admin;
    }
    public function setAdmin(?Admin $admin): static
    {
        $this->admin = $admin;
        return $this;
    }
    public function getNombreServicio(): ?string
    {
        return $this->nombre_servicio;
    }
    public function setNombreServicio(string $nombre): static
    {
        $this->nombre_servicio = $nombre;
        return $this;
    }
    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }
    public function setDescripcion(string $descripcion): static
    {
        $this->descripcion = $descripcion;
        return $this;
    }
    public function getCosto(): ?float
    {
        return $this->costo;
    }
    public function setCosto(float $costo): static
    {
        $this->costo = $costo;
        return $this;
    }
    public function getFechaCreacion(): ?\DateTime
    {
        return $this->fecha_creacion;
    }
    public function setFechaCreacion(\DateTime $fecha): static
    {
        $this->fecha_creacion = $fecha;
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
            $detalle->setServicio($this);
        }
        return $this;
    }
    public function removeDetalleFactura(DetalleFactura $detalle): static
    {
        if ($this->detalle_facturas->removeElement($detalle) && $detalle->getServicio() === $this) {
            $detalle->setServicio(null);
        }
        return $this;
    }
}
