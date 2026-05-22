<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity]
#[ApiResource(
    normalizationContext: ['groups' => ['clientes:read']],
    denormalizationContext: ['groups' => ['clientes:write']]
)]
class Clientes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['clientes:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 20)]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?string $telefono = null;

    #[ORM\Column(length: 10)]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?string $genero = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?string $detalles = null;

    #[ORM\Column]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?\DateTime $fecha_creacion = null;

    #[ORM\Column]
    #[Groups(['clientes:read', 'clientes:write'])]
    private ?\DateTime $fecha_actualizacion = null;

    // ---------- Relations ----------
    #[ORM\OneToMany(mappedBy: 'cliente', targetEntity: Citas::class)]
    #[Groups(['clientes:read'])]
    private Collection $citas;

    #[ORM\OneToMany(mappedBy: 'cliente', targetEntity: Facturas::class)]
    #[Groups(['clientes:read'])]
    private Collection $facturas;

    public function __construct()
    {
        $this->citas = new ArrayCollection();
        $this->facturas = new ArrayCollection();
    }

    // ---------- Getters & Setters ----------
    public function getId(): ?int
    {
        return $this->id;
    }
    public function getNombre(): ?string
    {
        return $this->nombre;
    }
    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;
        return $this;
    }
    public function getEmail(): ?string
    {
        return $this->email;
    }
    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }
    public function getTelefono(): ?string
    {
        return $this->telefono;
    }
    public function setTelefono(string $telefono): static
    {
        $this->telefono = $telefono;
        return $this;
    }
    public function getGenero(): ?string
    {
        return $this->genero;
    }
    public function setGenero(string $genero): static
    {
        $this->genero = $genero;
        return $this;
    }
    public function getDetalles(): ?string
    {
        return $this->detalles;
    }
    public function setDetalles(string $detalles): static
    {
        $this->detalles = $detalles;
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
    public function getFechaActualizacion(): ?\DateTime
    {
        return $this->fecha_actualizacion;
    }
    public function setFechaActualizacion(\DateTime $fecha): static
    {
        $this->fecha_actualizacion = $fecha;
        return $this;
    }

    // ---------- Collections ----------
    /** @return Collection|Citas[] */
    public function getCitas(): Collection
    {
        return $this->citas;
    }
    public function addCita(Citas $cita): static
    {
        if (!$this->citas->contains($cita)) {
            $this->citas->add($cita);
            $cita->setCliente($this);
        }
        return $this;
    }
    public function removeCita(Citas $cita): static
    {
        if ($this->citas->removeElement($cita) && $cita->getCliente() === $this) {
            $cita->setCliente(null);
        }
        return $this;
    }

    /** @return Collection|Facturas[] */
    public function getFacturas(): Collection
    {
        return $this->facturas;
    }
    public function addFactura(Facturas $factura): static
    {
        if (!$this->facturas->contains($factura)) {
            $this->facturas->add($factura);
            $factura->setCliente($this);
        }
        return $this;
    }
    public function removeFactura(Facturas $factura): static
    {
        if ($this->facturas->removeElement($factura) && $factura->getCliente() === $this) {
            $factura->setCliente(null);
        }
        return $this;
    }
}
